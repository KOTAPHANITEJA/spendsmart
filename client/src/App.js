import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpenseProvider from './context/ExpenseContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <ExpenseProvider>
      <Router>
        <div>

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ExpenseProvider>
  );
};

export default App;