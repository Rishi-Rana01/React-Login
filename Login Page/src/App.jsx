import React from 'react'
import Login from './Component/Login';
import Signup from './Component/signup';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
