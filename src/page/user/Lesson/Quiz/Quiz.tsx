/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import LessonApi from '../../../../api/LessonApi';
import ReactPaginate from 'react-paginate';

const Quiz = () => {
  const token = Cookies.get('access_token');
  const quiz_id = JSON.parse(Cookies.get('quiz_id') || '{}');
  const quizlog_id = JSON.parse(Cookies.get('quizlog_id') || '{}');

  const [questions, setQuestions] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);

  useEffect(() => {
    LessonApi.fetchQuestionsWithChoices(quiz_id, token).then((res) => {
      setQuestions(res.data);
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
      setAnswers( (
        current: {
          choice_id: number;
          quizlog_id: number;
          question_id: number;
        }[]
        ) => [...current])
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
  }

  useEffect(() => {
    console.table(answers);
    
    Cookies.set('answers', JSON.stringify(answers))
  }, [answers])
 
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mb-5">
          {currentItems?.map((question: any) => {
            return (
              <div className="" key={question.id}>
                <div>{question.question}</div>
                <div>
                  {question.choices.map((choice: any) => {
                    return (
                      <div key={choice.id}>
                        <button
                          onClick={() => handleSetChoice(choice)}
                          className={`border-2 rounded mx-2 my-2`}
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
          className="flex w-1/3 justify-between"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
        />
      </div>
    </>
  );
};

export default Quiz;
