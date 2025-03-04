import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    const aiResponse = generateAIResponse(input);
    setMessages([...messages, userMessage, aiResponse]);

    setInput('');
  };

  const generateAIResponse = (input) => {
    // Simple AI response logic (replace with actual AI integration)
    let responseText = 'I am here to help you with your spending and saving.';

    if (input.toLowerCase().includes('save')) {
      responseText = 'Consider saving at least 20% of your income.';
    } else if (input.toLowerCase().includes('spend','expense')) {
      responseText = 'Make sure to track your expenses and stick to your budget.';
    } else if (input.toLowerCase().includes('invest',)) {
      responseText = 'Investing in a diversified portfolio can help grow your wealth.';
    } else if (input.toLowerCase().includes('budget')) {
      responseText = 'Creating a budget can help you manage your finances better.';
    } else {
      responseText = "How can I assist you further?`";
    }

    return { text: responseText, sender: 'ai' };
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {input && (
          <div className="chatbot-message user typing">
            {input}
          </div>
        )}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button onClick={handleSend} className="medium-button">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;