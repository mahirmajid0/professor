'use client';

import React from 'react';
import Navbar from '../Navbar';
import styles from "../page.module.css";  
import { useState } from 'react';
import { auth } from '../firebase/config.js'
import { sendPasswordResetEmail } from 'firebase/auth';

function forgotPassword() {
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const handleSubmit = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      setUserMessage("Password reset email successfully sent!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setUserMessage("This email is not associated to any account");
      // ..
    });
  }


  return <>
  
  <Navbar />
  
  <div style={{marginTop: '7vh', marginLeft: '35vw', width: '30vw', height: '70vh', backgroundColor: 'skyblue', 
    borderRadius: '13px', paddingTop: '4vh'}}>

    <h1 style={{textAlign: 'center', color: 'purple', fontFamily: 'Geneva'}}>Forgot Password</h1>
    <h3 style={{marginLeft: '2.5vw', marginTop: '8%'}}>Enter your Email Below to  
      Reset Password</h3>
    <input style={{marginLeft: '4.5vw', marginTop: '5%', width: '70%', height: '6%', borderRadius: '8px',
            paddingLeft: '8px', paddingTop: '20px', paddingBottom: '20px', fontSize: '20px', fontFamily: 'Courier'
    }} onChange={(event) => setEmail(event.target.value)}></input>
    <button className = {styles.authBtn} style={{fontSize: '20px', width: '30%', marginLeft: '35%',
            marginTop: '6%', height: '10%', borderRadius: '5px'
    }} onClick={handleSubmit}>Submit</button>
    <p style={{textAlign: 'center', marginTop: '4%', fontSize: '15px', color: '#8B0000'}}>{userMessage}</p>

  </div>

  </>
}

export default forgotPassword
