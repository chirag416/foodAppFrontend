import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleSendCode = () => {
    if (mobileNumber.length === 10 && /^\d+$/.test(mobileNumber)) {
      navigate('/otp-verification', { state: { mobileNumber } });
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold mt-20 mb-2">Enter Your Mobile Number</h1>
      <p className="text-gray-500 mb-10">We will send you the 4 digit verification code</p>
      
      <div className="flex flex-col space-y-4">
        <input
          type="tel"
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-lg"
          maxLength="10"
        />

        <button
          onClick={handleSendCode}
          className="w-full py-4 text-white font-semibold rounded-xl bg-red-500 hover:bg-red-600 transition duration-150 shadow-lg mt-8"
        >
          Send Code
        </button>
      </div>
    </div>
  );
};

export default Login;