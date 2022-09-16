import instance from './instance';

export type AnswersProps = {
  choice_id: number;
  quizlog_id: number;
  question_id: number;
};

const LessonApi = {
  fetchQuizzes: (token: string | undefined) => {
    const config = {
      method: 'GET',
      url: `/quiz/all`,
      headers: { Authorization: `Bearer ${token}` },
    };
    return instance.request(config);
  },
  fetchQuiz: (quiz_id: number, token: string | undefined) => {
    const config = {
      method: 'GET',
      url: `/quiz/${quiz_id}`,
      headers: { Authorization: `Bearer ${token}` },
    };
    return instance.request(config);
  },
  attemptQuiz: (quiz_id: number | string, token: string | undefined) => {
    const config = {
      method: 'POST',
      url: `/quiz/attempt`,
      params: {
        quiz_id,
        token,
      },
      headers: { Authorization: `Bearer ${token}` },
    };
    return instance.request(config);
  },
  fetchQuestionsWithChoices: (
    quiz_id: string | number | undefined,
    token: string | undefined
  ) => {
    const config = {
      method: 'GET',
      url: `/quiz/questions`,
      params: {
        quiz_id,
        token,
      },
      headers: { Authorization: `Bearer ${token}` },
    };
    return instance.request(config);
  },
  submitAnswers: (quiz_id: number, answers: AnswersProps[], token?: string) => {
    const config = {
      method: 'POST',
      url: `save-all-answers`,
      data: { quiz_id, answers },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return instance.request(config);
  },
  fetchQuizResults: (quizlog_id: number, token?: string) => {
    const config = {
      method: 'GET',
      url: `quiz-results`,
      params: {
        quizlog_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return instance.request(config);
  },
};
export default LessonApi;
