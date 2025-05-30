import React from 'react';  // Note 'React' is capitalized
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router> {/* The Router component was missing in the original code */}
      <Routes>
        <Route path="/" element={<Register />} /> {/* Default route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/Sidebar" element={<Sidebar/>} /> 
      </Routes>
    </Router>
  );
}

export default App;