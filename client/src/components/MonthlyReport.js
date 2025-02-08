import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const MonthlyReport = () => {
  const { expenses } = useContext(ExpenseContext);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const generateReport = () => {
    const filtered = expenses.filter((expense) => {
      const date = new Date(expense.date);
      return (
        date.getMonth() + 1 === parseInt(month) &&
        date.getFullYear() === parseInt(year)
      );
    });
    setFilteredExpenses(filtered);
  };

  return (
    <div>
      <h2>Monthly Report</h2>
      <input
        type="number"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
        className="medium-input"
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
        className="medium-input"
      />
      <button onClick={generateReport} className="medium-button">Generate Report</button>
      <ul>
        {filteredExpenses.map((expense, index) => (
          <li key={index}>
            {expense.description}: ${expense.amount} - {expense.category} on {new Date(expense.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyReport;