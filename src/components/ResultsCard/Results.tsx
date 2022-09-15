import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonApi from '../../api/LessonApi';

export interface IResults {
  choice: {
    id: number;
    question_id: number;
    choice: string;
    is_correct: boolean;
  };
  choice_id: number;
  id: number;
  question: { id: number; quiz_id: number; question: string };
  question_id: number;
  quizlog_id: number;
}

const Results = () => {
  const navigate = useNavigate();
  const quizlog_id =
    Cookies.get('quizlog_id') && JSON.parse(Cookies.get('quizlog_id') || '{}');
  const quiz_id =
    Cookies.get('quiz_id') && JSON.parse(Cookies.get('quiz_id') || '{}');
  const token = Cookies.get('access_token');
  const [results, setResults] = useState<IResults[]>();
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quiz, setQuiz] = useState<{
    id: number;
    questions: [];
    title: string;
  }>();

  useEffect(() => {
    LessonApi.fetchQuizResults(quizlog_id, token).then((res) => {
      setCorrectAnswersCount(res.data.correct_answers);
      setResults(res.data.answers);
    });
    LessonApi.fetchQuiz(quiz_id, token).then((res) => {
      setQuiz(res.data);
    });
  }, []);

  const handleClick = () => {
    Cookies.remove('quizlog_id');
    Cookies.remove('quiz_id');
    Cookies.remove('answers');
    navigate('/');
  };

  return (
    <div>
      <div className="flex justify-between mx-5">
        <div className="text-lg font-bold mb-5">LESSON - {quiz?.title}</div>
        <div>
          <div className="text-xl font-bold mb-10">
            Results:{' '}
            <span className="font-normal text-lg">
              {correctAnswersCount} of {quiz?.questions.length}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-5">
        <div className="mx-10">
          <div className="font-bold">Result</div>
          {results?.map((result: IResults) => {
            return (
              <div className="flex justify-center" key={result.id}>
                {result.choice.is_correct ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        <div className="mx-10">
          <div className="font-bold">Question</div>
          {results?.map((result: IResults) => {
            return <div key={result.id}>{result.question.question}</div>;
          })}
        </div>
        <div>
          <div className="font-bold">Answer</div>
          {results?.map((result: IResults) => {
            return <div key={result.id}>{result.choice.choice}</div>;
          })}
        </div>
      </div>
      <button
        className="border-2 rounded mt-10 px-4 py-2"
        onClick={handleClick}
      >
        Go Home
      </button>
    </div>
  );
};

export default Results;
