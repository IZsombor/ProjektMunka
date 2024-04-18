import React, { useState, useEffect, useRef } from 'react';
import './CSS/Login.css';
import axios from 'axios';

import email_icon from '../forrasok/email.png';
import password_icon from '../forrasok/password.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");
  
  const [token, setToken] = useState('');
  

  const [isVisible, setIsVisible] = useState(true);
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  const handleLogin = async() => {
    if (!emailRegex.test(email)) {
      setEmailError("Az e-mail cím nem megfelelő karaktereket tartalmaz!");
    } else {
      setEmailError("");
    }
    try {
      const response = await axios.post('', { email, jelszo }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setToken(response.data.token);
     
      if (localStorage.getItem('user') === email && localStorage.getItem('pwd') === jelszo) {
        alert('Sikeres bejelentkezés!');
      }
    } catch (error) {
      console.error('Bejelentkezési hiba:', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`login-signup-centered1 `} ref={ref}>
      <div className='container1'>
        <button className="close-button1" onClick={() => setIsVisible(false)}>X</button>
        <div className='header1'>
          <div className='text1'>Bejelentkezés</div>
          <div className='underline1'></div>
        </div>
        <div className='inputs1'>
          <div className='input-container'>
            <div className='input1'>
              <img src={email_icon} alt='' />
              <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            {emailError && <div className="error-popup">{emailError}</div>}
          </div>
          <br></br>
          <div className='input-container'>
            <div className='input1'>
              <img src={password_icon} alt='' />
              <input type='password' placeholder='Jelszo' value={jelszo} onChange={(e) => setJelszo(e.target.value)}/>
            </div>
          </div>
          <div className='elfelejtett-jelszo1'>Elfelejtett jelszó? <span>Kattints ide!</span> </div>
          <div className='submit-container1'>
            <div className='submit1' onClick={handleLogin}>Bejelentkezés </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
