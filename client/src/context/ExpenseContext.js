import React, { createContext, useState } from 'react';

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);

  const calculateCategoryLimits = (income) => {
    return {
      Food: income * 0.1,
      Transport: income * 0.05,
      Books: income * 0.05,
      Clothing: income * 0.1,
      Electronics: income * 0.2,
      Health: income * 0.05,
      Beauty: income * 0.05,
      Sports: income * 0.05,
      Education: income * 0.1,
      Others: income * 0.05,
    };
  };

  const categoryLimits = calculateCategoryLimits(income);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, date: new Date() }]);
  };

  const editExpense = (index) => {
    const updatedExpenses = [...expenses];
    const description = prompt("Enter new description", updatedExpenses[index].description);
    const amount = parseFloat(prompt("Enter new amount", updatedExpenses[index].amount));
    const category = prompt("Enter new category", updatedExpenses[index].category);
    updatedExpenses[index] = { ...updatedExpenses[index], description, amount, category };
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const getRemainingAmount = (category) => {
    const totalSpent = expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
    return categoryLimits[category] - totalSpent;
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, editExpense, deleteExpense, getRemainingAmount, income, setIncome }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;