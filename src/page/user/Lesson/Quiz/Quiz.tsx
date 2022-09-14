/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import LessonApi, { AnswersProps } from '../../../../api/LessonApi';
import ReactPaginate from 'react-paginate';
import SubmissionModal from '../../../../components/SubmissionModal/SubmissionModal';

const Quiz = () => {
  const token = Cookies.get('access_token');
  const quiz_id = JSON.parse(Cookies.get('quiz_id') || '{}');
  const quizlog_id = JSON.parse(Cookies.get('quizlog_id') || '{}');

  const [questions, setQuestions] = useState<any>([]);
  const [totalQuestions, setTotalQuestions] = useState<number>();
  const [quiz, setQuiz] = useState<any>();
  const [answers, setAnswers] = useState<AnswersProps>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  useEffect(() => {
    LessonApi.fetchQuestionsWithChoices(quiz_id, token).then((res) => {
      setQuestions(res.data);
      setTotalQuestions(res.data.length)
    });
    LessonApi.fetchQuiz(quiz_id, token).then((res) => {
      setQuiz(res.data);
    });
  }, [quiz_id]);

  // Start of Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(questions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(questions.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, questions]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % questions.length;
    setItemOffset(newOffset);
  };
  // End of Pagination

  const handleSetChoice = (choice: any) => {
    const condition =
      answers.filter((obj: any) => obj.question_id === choice.question_id)
        .length > 0;

    if (condition) {
      const index = answers.findIndex(
        (obj: any) => obj.question_id === choice.question_id
      );
      answers[index].choice_id = choice.id;
      setAnswers(
        (
          current: {
            choice_id: number;
            quizlog_id: number;
            question_id: number;
          }[]
        ) => [...current]
      );
    } else {
      setAnswers(
        (
          current: {
            choice_id: number;
            quizlog_id: number;
            question_id: number;
          }[]
        ) => [
          ...current,
          {
            choice_id: choice.id,
            quizlog_id: quizlog_id,
            question_id: choice.question_id,
          },
        ]
      );
    }
  };

  useEffect(() => {
    if(answers.length === totalQuestions) {
      setIsShowModal(true);
    }
    Cookies.set('answers', JSON.stringify(answers));
  }, [answers]);

  return (
    <>
      <SubmissionModal setIsShowModal={setIsShowModal} isShowModal={isShowModal} answers={answers} />

      <div>
        <div className="text-lg font-bold mb-5">LESSON - {quiz?.title}</div>
        <div className="mb-5">
          {currentItems?.map((question: any) => {
            return (
              <div className='mx-auto w-1/2 flex justify-evenly' key={question.id}>
                <div className='bg-gray-100 flex w-full items-center justify-center rounded'>{question.question}</div>
                <div className='p-5 rounded'>
                  {question.choices.map((choice: any) => {
                    return (
                      <div key={choice.id}>
                        <button
                          onClick={() => handleSetChoice(choice)}
                          className={`border-2 w-20 py-2 rounded mx-2 my-2 ${answers.find(obj => obj.choice_id === choice.id) && 'bg-green-200'}`}
                        >
                          {choice.choice}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <ReactPaginate
          className="flex w-1/2 mx-auto justify-around"
          breakLabel="..."
          nextLabel="NEXT"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="BACK"
        />
      </div>
    </>
  );
};

export default Quiz;
