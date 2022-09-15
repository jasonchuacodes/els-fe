import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LessonApi from '../../../../api/LessonApi';
import { useNavigate } from 'react-router-dom';
import {
  LessonContext,
  LessonContextType,
} from '../../../../context/LessonContext';

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

  const handleClick = (quiz_id: number) => {
    attemptQuiz(quiz_id, token);
    navigate('/quiz');
  };

  return (
    <>
      <div className="text-xl font-bold mb-10">Categories</div>
      <div className="flex ">
        {lessons?.map((lesson: { id: number; title: string }) => {
          return (
            <div key={lesson.id}>
              <div className="border-2 p-5 m-2 items-center mb-2 rounded">
                <div className="font-bold text-lg">{lesson.title}</div>
                <div className="mb-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus ut aspernatur quae adipisci nam impedit in
                  laboriosam, omnis earum magni.
                </div>
                <button
                  onClick={() => handleClick(lesson.id)}
                  className="border-2 rounded px-2 py-1"
                >
                  Start
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Category;
