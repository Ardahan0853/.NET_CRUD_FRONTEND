// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import BrandForm from './BrandForm';
import RegisterForm from './RegisterForm';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState()
  

 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<BrandForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
