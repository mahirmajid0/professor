'use client'
import React from 'react';
import Navbar from '../Navbar';
import styles from "../page.module.css";  
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../firebase/config.js'
import { signInWithEmailAndPassword } from "firebase/auth";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theErrorMessage, setErrorMessage] = useState("");
  const router = useRouter(); 

  const handleLogin = async() => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        router.push("/count");
    } catch(e){
        console.log('error', e);
    }
  }

  return <>

    <Navbar />

    <div style={{marginTop: '7vh'}}>
    </div>

    <div style={{marginTop: '3vh', marginLeft: '35vw', width: '30vw', height: '70vh', backgroundColor: 'skyblue', 
    borderRadius: '13px', paddingTop: '4vh'}}>

        <h1 style={{textAlign: 'center', fontFamily: 'Geneva', fontSize: '35px', color: 'purple'}}>Login</h1>
        <h2 style={{marginLeft: '4vw', marginTop: '5%', fontFamily: 'Courier New', fontSize: '30px'}}>Email</h2>
        <input style={{marginLeft: '4vw', marginTop: '3%', width: '70%', height: '6%', borderRadius: '8px',
            paddingLeft: '8px', paddingTop: '20px', paddingBottom: '20px', fontSize: '20px', fontFamily: 'Courier'
        }} onChange={(event) => setEmail(event.target.value)}></input>
        <h2 style={{marginLeft: '4vw', marginTop: '5%', fontFamily: 'Courier New', fontSize: '30px'}}>Password</h2>
        <input style={{marginLeft: '4vw', marginTop: '3%', width: '70%', height: '6%', borderRadius: '8px',
            paddingLeft: '8px', paddingTop: '20px', paddingBottom: '20px', fontSize: '20px', fontFamily: 'Courier'
        }} type="password" onChange={(event) => setPassword(event.target.value)}></input>
        <Link href="/forgot-password" passHref>
            <p className= {styles.forgotPwd} style={{marginLeft: '4vw', marginTop: '2%'}}>Forgot Password?</p>
        </Link>

        <button className = {styles.authBtn} style={{fontSize: '20px', width: '30%', marginLeft: '35%',
            marginTop: '3%', height: '10%', borderRadius: '5px'
        }} onClick={handleLogin}>Sign In</button>

        <p style={{textAlign: 'center', color: '#8B0000', fontSize: '20px', fontFamily: 'Lato', marginTop: '5%'
        }}>{theErrorMessage}</p>
    </div>
  
  
</>
}

export default login
