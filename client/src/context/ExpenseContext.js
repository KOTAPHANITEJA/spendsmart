import React, { createContext, useState } from 'react';

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [emi, setEmi] = useState(0);

  const calculateCategoryLimits = (income, emi) => {
    const remainingIncome = income - emi;
    return {
      Food: remainingIncome * 0.1,
      Transport: remainingIncome * 0.05,
      Books: remainingIncome * 0.05,
      Clothing: remainingIncome * 0.1,
      Electronics: remainingIncome * 0.2,
      Health: remainingIncome * 0.05,
      Beauty: remainingIncome * 0.05,
      Sports: remainingIncome * 0.05,
      Education: remainingIncome * 0.1,
      Others: remainingIncome * 0.05,
    };
  };

  const categoryLimits = calculateCategoryLimits(income, emi);

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
    <ExpenseContext.Provider value={{ expenses, addExpense, editExpense, deleteExpense, getRemainingAmount, income, setIncome, emi, setEmi }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;