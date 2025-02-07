import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const ExpenseList = () => {
  const { expenses, editExpense, deleteExpense } = useContext(ExpenseContext);

  return (
    <ul>
      {expenses.map((expense, index) => (
        <li key={index}>
          {expense.description}: ${expense.amount} - {expense.category}
          <button onClick={() => editExpense(index)}>Edit</button>
          <button onClick={() => deleteExpense(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;