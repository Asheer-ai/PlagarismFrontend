import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Add your authentication logic here
    // If authentication is successful:
    navigate('/');
  };

  return (
    <div className="signin-container p-6 mx-auto max-w-md  bg-gray-400 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Sign In</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className="text-purple-600"
          >
            Sign In
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <a href="/forgot-password" className="text-sm text-purple-600 hover:underline">Forgot your password?</a>
      </div>
    </div>
  );
};

export default SignIn;
