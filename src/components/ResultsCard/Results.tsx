import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonApi from '../../api/LessonApi';

const Results = () => {
  const navigate = useNavigate();
  const quizlog_id =
    Cookies.get('quizlog_id') && JSON.parse(Cookies.get('quizlog_id') || '{}');
  const quiz_id =
    Cookies.get('quiz_id') && JSON.parse(Cookies.get('quiz_id') || '{}');
  const token = Cookies.get('access_token');
  const [results, setResults] = useState(0);
  const [quiz, setQuiz] = useState<any>();


  useEffect(() => {
    LessonApi.fetchQuizResults(quizlog_id, token).then((res) => {
      setResults(res.data.correct_answers);
    });
    LessonApi.fetchQuiz(quiz_id, token).then((res) => {
      setQuiz(res.data);
    });
  }, []);

  const handleClick = () => {
    Cookies.remove('quizlog_id');
    Cookies.remove('quiz_id');
    Cookies.remove('answers');
    navigate('/')
  }

  return (
    
    <div className='flex justify-evenly'>
      <div className="text-lg font-bold mb-5">LESSON - {quiz?.title}</div>
      <div>
        <div className="text-xl font-bold mb-10">Results: {results}</div>
        <button className='border-2 rounded px-4 py-2' onClick={handleClick}>Go Home</button>
      </div>
    </div>
  );
};

export default Results;
