import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExpenseContext } from '../context/ExpenseContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Home = () => {
  const { expenses, getRemainingAmount, income, setIncome, emi, setEmi } = useContext(ExpenseContext);
  const [inputIncome, setInputIncome] = useState(income);
  const [inputEmi, setInputEmi] = useState(emi);

  const handleIncomeChange = (e) => {
    setInputIncome(e.target.value);
  };

  const handleEmiChange = (e) => {
    setInputEmi(e.target.value);
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    setIncome(parseFloat(inputIncome));
    setEmi(parseFloat(inputEmi));
  };

  const categories = [
    'Food', 'Transport', 'Books', 'Clothing', 'Electronics', 'Health', 'Beauty', 'Sports', 'Education', 'Others'
  ];

  const overLimitCategories = categories.filter(category => getRemainingAmount(category) < 0);

  const expenseData = categories.map(category => {
    const totalSpent = expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
    return totalSpent;
  });

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: [
          'rgba(255, 98, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
      },
    },
  };

  return (
    <div>
      <header>
        <h1>Spend Smart</h1>
      </header>
      <div>
        <h2>Welcome to Spend Smart</h2>
        <p>Manage your expenses efficiently and effectively.</p>
        <p>Total expenses: {expenses.length}</p>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Add New Expense</Link>
            </li>
          </ul>
        </nav>
        <form onSubmit={handleIncomeSubmit}>
          <label>
            Enter your income:
            <input type="number" value={inputIncome} onChange={handleIncomeChange} required />
          </label>
          <label>
            Enter your EMI:
            <input type="number" value={inputEmi} onChange={handleEmiChange} required />
          </label>
          <button type="submit" className="small-button">Set Income and EMI</button>
        </form>
        <h3>Expenditure Table</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.description}</td>
                <td>₹{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Category Limits</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Remaining Amount</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category}</td>
                <td>₹{getRemainingAmount(category)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {overLimitCategories.length > 0 && (
          <div className="over-limit-message">
            <h4>Categories that have crossed their limits:</h4>
            <ul>
              {overLimitCategories.map((category, index) => (
                <li key={index}>{category} has exceeded its limit by ₹{Math.abs(getRemainingAmount(category))}</li>
              ))}
            </ul>
          </div>
        )}
        <h3>Expenses Visualization</h3>
        <div className="chart-container">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Home;