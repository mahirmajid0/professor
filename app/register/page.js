'use client'
import React from 'react';
import Navbar from '../Navbar';
import styles from "../page.module.css";  
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { auth } from '../firebase/config.js'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

function register() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theErrorMessage, setErrorMessage] = useState("");
  const [verifyProcess, setVerifyProcess] = useState(false);
  const router = useRouter();

  const handleRegister = async() => {
    setErrorMessage("");
    if (password.length >= 6) {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          setEmail("");
          setPassword("");
          setVerifyProcess(true);
          sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email verification sent!
            // ...
          });
          
        } catch(e){
          console.log('error', e);
          setErrorMessage("This email is already in use");
      }
    } else {
        setErrorMessage("Password must be at least 6 characters");
    }
  }

  return <>

  <Navbar />

  <div style={{marginTop: '7vh'}}>
  </div>

  <div style={{marginTop: '3vh', marginLeft: '35vw', width: '30vw', height: '70vh', backgroundColor: 'skyblue', 
    borderRadius: '13px', paddingTop: '4vh'}}>

   {!verifyProcess && <> <h1 style={{textAlign: 'center', fontFamily: 'Geneva', fontSize: '35px', color: 'purple'}}>Register</h1>
    <h2 style={{marginLeft: '4vw', marginTop: '5%', fontFamily: 'Courier New', fontSize: '30px'}}>Email</h2>
    <input style={{marginLeft: '4vw', marginTop: '3%', width: '70%', height: '6%', borderRadius: '8px',
        paddingLeft: '8px', paddingTop: '20px', paddingBottom: '20px', fontSize: '20px', fontFamily: 'Courier'
    }} onChange={(event) => setEmail(event.target.value)}></input>
    <h2 style={{marginLeft: '4vw', marginTop: '5%', fontFamily: 'Courier New', fontSize: '30px'}}>Password</h2>
    <input style={{marginLeft: '4vw', marginTop: '3%', width: '70%', height: '6%', borderRadius: '8px',
        paddingLeft: '8px', paddingTop: '20px', paddingBottom: '20px', fontSize: '20px', fontFamily: 'Courier'
    }} type="password" onChange={(event) => setPassword(event.target.value)}></input>

    <br></br>
    <br></br>

    <button className = {styles.authBtn} style={{fontSize: '20px', width: '30%', marginLeft: '35%',
        marginTop: '5%', height: '10%', borderRadius: '5px'
    }} onClick={handleRegister}>Sign Up</button>

    <p style={{textAlign: 'center', color: '#8B0000', fontSize: '20px', fontFamily: 'Lato',
        marginTop: '5%'
    }}>{theErrorMessage}</p> </>}

    {verifyProcess && <>
    
    <h1 style={{textAlign: 'center', fontFamily: 'Geneva', fontSize: '35px', color: 'green'}}>Email Verification Sent!</h1>

    <div style={{marginLeft: '10%', marginTop: '5%', width: '80%', lineHeight: '7vh', height: '50%'}}>
      <h2 style={{textAlign: 'center',}}>
      We’ve sent a verification link to your email address.
      Please check your inbox along with your spam folder and click on the link to verify your account.

      Once verified, you’ll be all set to start using our services! </h2>
    </div>
    
    </>}
  </div>
  
  </>
}

export default register
