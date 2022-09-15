/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LessonApi, { AnswersProps } from '../../../../api/LessonApi';
import SubmissionModal from '../../../../components/SubmissionModal/SubmissionModal';

const Quiz = () => {
  const {pathname} = useLocation();
  const token = Cookies.get('access_token');
  const quiz_id = JSON.parse(Cookies.get('quiz_id') || '{}');
  const quizlog_id = JSON.parse(Cookies.get('quizlog_id') || '{}');

  const [questions, setQuestions] = useState<any>([]);
  const [quiz, setQuiz] = useState<any>();
  const [answers, setAnswers] = useState<AnswersProps>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  
  useEffect(() => {
    LessonApi.fetchQuestionsWithChoices(quiz_id, token).then((res) => {
      setQuestions(res.data);
    });
    LessonApi.fetchQuiz(quiz_id, token).then((res) => {
      setQuiz(res.data);
    });
    Cookies.get('answers') &&
      setAnswers(JSON.parse(Cookies.get('answers') || '{}'));
  }, [quiz_id]);

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

  const handleNext = () => {
    Cookies.set('answers', JSON.stringify(answers), {path: ''});

    if(questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    }
    else (
      setIsShowModal(true)
    )
  }

  const handleBack = () => {
    if(questionIndex > 0) {
      setQuestionIndex(questionIndex - 1)
    }
  }

  return (
    <>
      <SubmissionModal
        quizlogId={quizlog_id}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        answers={answers}
      />

      <div>
        <div className="text-lg font-bold mb-5">LESSON - {quiz?.title}</div>
        <div className="mb-5">
          <div
            className="mx-auto w-1/2 flex justify-evenly"
            key={questions[questionIndex]?.id}
          >
            <button onClick={handleBack} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <div className="mx-5 bg-gray-100 flex w-full items-center justify-center rounded">
              {questions[questionIndex]?.question}
            </div>
            <div className="rounded">
              {questions[questionIndex]?.choices.map((choice: any) => {
                return (
                  <div key={choice.id}>
                    <button
                      onClick={() => handleSetChoice(choice)}
                      className={`m-2 border-2 w-20 py-2 rounded ${
                        answers.find((obj) => obj.choice_id === choice.id) &&
                        'bg-green-200'
                      }`}
                    >
                      {choice.choice}
                    </button>
                  </div>
                );
              })}
            </div>
            <button onClick={handleNext} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
