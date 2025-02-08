import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const ExpenseList = () => {
  const { expenses, editExpense, deleteExpense } = useContext(ExpenseContext);

  return (
    <ul className="expense-list">
      {expenses.map((expense, index) => (
        <li key={index} className="expense-item">
          {expense.description}: ₹{expense.amount} - {expense.category}
          <button onClick={() => editExpense(index)} className="medium-button">Edit</button>
          <button onClick={() => deleteExpense(index)} className="medium-button">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;