import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UpdateTeacher from './components/UpdateTeacher';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<UpdateTeacher />} />
      </Routes>
    </Router>
  );
};

export default App;
