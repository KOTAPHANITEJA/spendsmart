import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import MonthlyReport from '../components/MonthlyReport';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <div>
      <ExpenseForm />
      <ExpenseList />
      <MonthlyReport />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Dashboard;