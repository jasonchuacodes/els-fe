import React from 'react';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  return (
    <div>
      <div>We have sent you a verification link to you email. </div>
      <div>Please verify in order to use the app.</div>
      <div className="mt-3">
        Already verified? Click here to{' '}
        <Link
          className="bg-gray-600 text-white px-3 py-2 rounded-md border-2"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
