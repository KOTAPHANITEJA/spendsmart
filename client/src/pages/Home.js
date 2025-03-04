import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExpenseContext } from '../context/ExpenseContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import Chatbot from '../components/chatbot';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Home = () => {
  const { expenses, getRemainingAmount, income, setIncome, emi, setEmi } = useContext(ExpenseContext);
  const [inputIncome, setInputIncome] = useState(income);
  const [inputEmi, setInputEmi] = useState(emi);
  const [rewards, setRewards] = useState(0);
  const [failedChallengeMessage, setFailedChallengeMessage] = useState('');

  const categories = [
    'Food', 'Transport', 'Books', 'Clothing', 'Electronics', 'Health', 'Beauty', 'Sports', 'Education', 'Others'
  ];

  const [challenges, setChallenges] = useState([
    { id: 1, text: 'Spend less on eating out for a week', category: 'Food', completed: false },
    { id: 2, text: 'Save an extra ₹500 this week on transport', category: 'Transport', completed: false },
    { id: 3, text: 'Track all book expenses for a month', category: 'Books', completed: false },
    { id: 4, text: 'Spend less on clothing for a month', category: 'Clothing', completed: false },
    { id: 5, text: 'Limit electronics purchases this month', category: 'Electronics', completed: false },
    { id: 6, text: 'Spend less on health-related expenses', category: 'Health', completed: false },
    { id: 7, text: 'Reduce beauty expenses for a month', category: 'Beauty', completed: false },
    { id: 8, text: 'Spend less on sports activities', category: 'Sports', completed: false },
    { id: 9, text: 'Save more on education expenses', category: 'Education', completed: false },
    { id: 10, text: 'Reduce miscellaneous expenses', category: 'Others', completed: false },
  ]);

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

  const handleChallengeCompletion = (id) => {
    const challenge = challenges.find(challenge => challenge.id === id);
    const remainingAmount = getRemainingAmount(challenge.category);

    if (remainingAmount < 0) {
      setFailedChallengeMessage(`Your challenge "${challenge.text}" has failed because you have exceeded the limit for ${challenge.category}.`);
      setTimeout(() => {
        setFailedChallengeMessage('');
      }, 5000); // Hide the message after 5 seconds
    } else {
      setChallenges(challenges.map(challenge => 
        challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
      ));
    }
  };

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
          'rgba(244, 5, 57, 0.97)',
          'rgb(0, 153, 255)',
          'rgb(255, 183, 0)',
          'rgb(0, 255, 255)',
          'rgb(85, 0, 255)',
          'rgb(254, 127, 0)',
          'rgb(255, 255, 255)',
          'rgb(0, 30, 255)',
          'rgb(232, 106, 133)',
          'rgb(25, 73, 105)'
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

  // Calculate rewards based on spending
  useEffect(() => {
    const calculateRewards = () => {
      let totalRewards = 0;
      categories.forEach(category => {
        const remainingAmount = getRemainingAmount(category);
        if (remainingAmount > 0) {
          totalRewards += remainingAmount * 0.1; // Reward 10% of the remaining amount
        }
      });
      setRewards(totalRewards);
    };

    calculateRewards();
  }, [expenses, income, emi, categories, getRemainingAmount]);

  return (
    <div>
      <header>
        <h1>Spend Smart</h1>
      </header>
      <div>
        <h2>Welcome to Spend Smart</h2>
        <p>Manage your expenses efficiently and effectively.</p>
        <p>Total expenses: {expenses.length}</p>
        <p>Total rewards: ₹{rewards.toFixed(2)}</p>
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
        <h3>Daily/Weekly Challenges</h3>
        <ul>
          {challenges.map(challenge => (
            <li key={challenge.id}>
              {challenge.text}
              <button
                onClick={() => handleChallengeCompletion(challenge.id)}
                className="medium-button"
              >
                {challenge.completed ? 'Completed' : 'Mark as Complete'}
              </button>
            </li>
          ))}
        </ul>
        {failedChallengeMessage && (
          <div className="failed-challenge-message">
            {failedChallengeMessage}
          </div>
        )}
        <h3>Chat with AI</h3>
        <Chatbot />
      </div>
    </div>
  );
};

export default Home;