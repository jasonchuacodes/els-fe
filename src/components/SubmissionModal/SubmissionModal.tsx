import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LessonApi, { AnswersProps } from '../../api/LessonApi';

const SubmissionModal = ({
  setIsShowModal,
  isShowModal,
  answers,
}: {
  setIsShowModal: (value: boolean) => void;
  isShowModal: boolean;
  answers: AnswersProps;
}) => {
  const navigate = useNavigate();
  const token = Cookies.get('access_token');

  const handleSubmit = () => {
    Cookies.remove('answers');
    Cookies.remove('quizlog_id');
    Cookies.remove('quiz_id');

    LessonApi.submitAnswers(answers, token);
    navigate('/');
  };
  const handleCancel = () => {
    setIsShowModal(false);
  }

  return (
    <>
      {isShowModal && (
        <div className="flex justify-center top-0 left-0 bottom-0 right-0 fixed z-30">
          <div className="flex bg-gray-400 opacity-50 top-0 left-0 bottom-0 right-0 fixed w-full h-full"></div>
          <div
            className={`relative self-center pt-2 pb-4 bg-white text-center p-5 rounded`}
          >
            <div>
              <div className="mb-5">Ready to submit your answers?</div>
              <button
                className="border-2 mx-2 rounded px-4 py-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="border-2 rounded px-4 py-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmissionModal;
