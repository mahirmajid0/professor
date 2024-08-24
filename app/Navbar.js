'use client'

import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/config'

function Navbar() {
  const [theUserAuth, setUserAuth] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified == true) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          setUserAuth(true);
          // ...  
        } else {
          // User is signed out
          // ...
          setUserAuth(false);
        }
      });
  }, [auth])

  const logOut = () => {
    signOut(auth);
  }

  return <>
  
  <div style={{display: 'flex', flexDirection: 'row', fontFamily: 'cursive', fontSize: '20px',
    backgroundColor: 'beige', width: '100vw', height: '14vh', paddingTop: '3.5vh'}}>
    <Link href="/" passHref>
        <h2 style={{marginLeft: '5vw'}}>
            Home
        </h2>
    </Link>

    {!theUserAuth && <Link href="/register" passHref>
        <h2 style={{marginLeft: '66.5vw'}}>
            Register
        </h2>
    </Link>}

    {!theUserAuth && <Link href="/login" passHref>
        <h2 style={{marginLeft: '5vw'}}>
            Login
        </h2>
    </Link>}

    {theUserAuth && <Link href="/" passHref>
        <h2 style={{marginLeft: '78vw'}} onClick={logOut}>
            Logout
        </h2>
    </Link>}

  </div>
  
  </>
}

export default Navbar
