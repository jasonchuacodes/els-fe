import Cookies from 'js-cookie';
import React, { createContext, useState } from 'react'
import LessonApi from '../api/LessonApi';

export interface LessonContextType {
  quizlogId?: number;
  quizId?: number;
  attemptQuiz: (quizId: number, token?:string) => void;
};

export const LessonContext = createContext<LessonContextType | null>(null);

const LessonProvider = ({ children }: { children: React.ReactNode }) => {
  const [quizlogId, setQuizlogId] = useState(); 
  const [quizId, setQuizId] = useState(0);

  const attemptQuiz = (quiz_id:number , token?: string) => {
    LessonApi.attemptQuiz(quiz_id, token).then(res => {
      Cookies.set('quizlog_id', res.data.quizlog_id);
      setQuizlogId(res.data.quizlog_id);
    })
    Cookies.set('quiz_id', String(quiz_id));
    setQuizId(quiz_id);
  }

  return (
    <LessonContext.Provider
      value={{
        quizlogId,
        quizId,
        attemptQuiz,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};

export default LessonProvider;
