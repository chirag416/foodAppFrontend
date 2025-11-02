import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobileNumber = location.state?.mobileNumber || 'your mobile number';
  
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  const correctOTP = '123456';

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP === correctOTP) {
      navigate('/home');
    } else {
      alert('Verification failed.');
    }
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-white">
      <div className="flex items-center mb-16">
        <button onClick={() => navigate(-1)} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-2">OTP Verification</h1>
      <p className="text-gray-500 mb-10">Enter the verification code we just sent on your Mobile Number.</p>
      
      <div className="flex justify-between space-x-2 mb-12">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={e => handleChange(e.target, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            ref={el => inputRefs.current[index] = el}
            className="w-1/6 h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        className="w-full py-4 text-white font-semibold rounded-xl bg-red-500 hover:bg-red-600 transition duration-150 shadow-lg"
      >
        Verify
      </button>

      <p className="text-center mt-6 text-sm">
        Didn't receive code? <button onClick={() => alert('Resending code... (OTP is 123456)')} className="text-red-500 font-semibold">Resend</button>
      </p>
    </div>
  );
};

export default OTPVerification;