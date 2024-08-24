'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../page.module.css";  
import Navbar from '../Navbar'
import axios from 'axios'


function page() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { text: userInput, sender: 'user' }];
      setMessages(newMessages);

      try {
        const res = await axios.post('http://localhost:3000/api/openai', { userInput });
        const aiMessage = res.data.message.join(' ');
        const aiResponse = { text: aiMessage, sender: 'ai' };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);

      } catch (error) {
        console.log(error);
        const aiResponse = { text: 'There was an error processing your message. Please Try Again.', sender: 'ai' };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }
    }
    setUserInput(''); // Clear input after sending
  };

  useEffect(() => {
    const aiFirstMessage = { text: "Welcome to AI Rate My Professor! Please Enter the Subject and University that you are interested in seeing top professors for!", sender: 'ai' };
    setMessages([aiFirstMessage]);
  }, [])

  return <>
  <Navbar />
  <div className={styles.chatbotWrapper}>
      <div className={styles.chatbotContainer}>
        <div className={styles.chatbotMessages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.chatbotMessage} ${
                message.sender === 'user' ? styles.user : styles.ai
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className={styles.chatbotInputContainer}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className={styles.chatbotInput}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage} className={styles.chatbotSendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  </>
}

export default page
