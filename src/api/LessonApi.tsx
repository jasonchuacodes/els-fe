import instance from './instance';

const LessonApi = {
  fetchQuizzes: (token: string | undefined) => {
    const config = {
      method: 'GET',
      url: `/quiz/all`,
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
  fetchQuizlog: (quizlog_id: number, token: string | undefined) => {
    const config = {
      method: 'GET',
      url: `quizlog`,
      params: {
        quizlog_id,
        token,
      },
      headers: { Authorization: `Bearer ${token}` },
    };
    return instance.request(config);
  },
  fetchQuestionsWithChoices: (
    quiz_id: string | number | undefined,
    token: string | undefined,
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
  postAnswer: (
    question_id: number,
    quizlog_id: string | number | undefined,
    choice_id: number,
    token: string | undefined
  ) => {
    const config = {
      method: 'POST',
      url: `question/answer`,
      params: {
        question_id,
        quizlog_id,
        choice_id,
      },
      headers: { Authorization: `Bearer ${token}` },
    };
    return instance.request(config);
  },
};
export default LessonApi;
