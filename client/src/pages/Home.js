import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExpenseContext } from '../context/ExpenseContext';

const Home = () => {
  const { expenses, getRemainingAmount, income, setIncome } = useContext(ExpenseContext);
  const [inputIncome, setInputIncome] = useState(income);

  const handleIncomeChange = (e) => {
    setInputIncome(e.target.value);
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    setIncome(parseFloat(inputIncome));
  };

  const categories = [
    'Food', 'Transport', 'Books', 'Clothing', 'Electronics', 'Health', 'Beauty', 'Sports', 'Education', 'Others'
  ];

  const overLimitCategories = categories.filter(category => getRemainingAmount(category) < 0);

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
          <button type="submit" className="small-button">Set Income</button>
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
      </div>
    </div>
  );
};

export default Home;