import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import OTPVerification from './components/OTPVerification';
import Home from './components/Home';
import RestaurantDetail from './components/RestaurantDetail';

function App() {
  return (
    <Router>
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;