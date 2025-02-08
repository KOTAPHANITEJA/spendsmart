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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={handleSubmit} className="dashboard-button">submit</button>
      </div>
      <div className="dashboard-content">
        <div>
          <ExpenseForm />
        </div>
        <div>
          <ExpenseList />
        </div>
        <div>
          <MonthlyReport />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;