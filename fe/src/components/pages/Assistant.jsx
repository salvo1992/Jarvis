// src/components/pages/Assistant.js

import React, { useState } from 'react';
import styles from './Assistant.module.css';

const Assistant = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Funzione per gestire l'invio del messaggio
  const handleSend = () => {
    if (!userInput.trim()) return;

    // Aggiunge il messaggio dell'utente
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);

    // Resetta il campo di input
    setUserInput('');

    // Simula la risposta dell'assistente
    setTimeout(() => {
      const assistantResponse = { sender: 'assistant', text: `Risposta all'input: "${userInput}"` };
      setMessages([...newMessages, assistantResponse]);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Assistant</h1>
      <div className={styles.chatContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user' ? styles.userMessage : styles.assistantMessage}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Scrivi un messaggio..."
          className={styles.input}
        />
        <button onClick={handleSend} className={styles.sendButton}>Invia</button>
      </div>
    </div>
  );
};

export default Assistant;
