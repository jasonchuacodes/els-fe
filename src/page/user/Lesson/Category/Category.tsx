import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LessonApi from '../../../../api/LessonApi';
import { useNavigate } from 'react-router-dom';
import { LessonContext, LessonContextType } from '../../../../context/LessonContext';

const Category = () => {
  const navigate = useNavigate();
  const token = Cookies.get('access_token');
  const [lessons, setLessons] = useState<any>();

  const { attemptQuiz } = React.useContext(LessonContext) as LessonContextType;

  useEffect(() => {
    LessonApi.fetchQuizzes(token).then((res) => {
      setLessons(res.data);
    });
  }, []);

  const handleClick = (quiz_id:number) => {
    attemptQuiz(quiz_id, token)
    navigate('/quiz')
  };

  return (
    <>
      {lessons?.map((lesson: { id: number; title: string }) => {
        return (
          <div className="w-1/2" key={lesson.id}>
            <div className="flex w-full justify-between items-center mb-2">
              <div className="">{lesson.title}</div>
              <button
                onClick={() => handleClick(lesson.id)}
                className="border-2 rounded px-2 py-1"
              >
                Start Quiz
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Category;
