import React from 'react';

function Register() {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className="mt-20 w-1/2 m-auto">
      <div className="mb-3">WELCOME! Please Login to enter.</div>
      <form className="bg-gray-100 mb-4 p-2" action="" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="firstName"
          type="text"
          placeholder="First name"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="lastName"
          type="text"
          placeholder="Last Name"
        />
        <label htmlFor="email">Email</label>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="email"
          type="text"
          placeholder="Email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="password"
          type="text"
          placeholder="Password"
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="passwordConfirmation"
          type="text"
          placeholder="Confirm Password"
        />

        <button
          className="rounded-md border-2 bg-gray-600 text-white px-4 py-2"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
