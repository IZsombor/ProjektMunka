import React, { useState, useEffect, useRef } from 'react';
import './CSS/Login.css';
import axios from 'axios';

import user_icon from '../forrasok/person.png';
import password_icon from '../forrasok/password.png';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const [token, setToken] = useState('');
  

  const [isVisible, setIsVisible] = useState(true);
 

  

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
    try {
      const response = await axios.post('https://localhost:7256/auth/login', { userName, password }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setToken(response.data.token);
     
      if (localStorage.getItem('user') === userName && localStorage.getItem('pwd') === password) {
        alert('Sikeres bejelentkezés!');
      } else {
        alert('Először regisztrálnod kell!');
      }
    } catch (error) {
      console.error('Bejelentkezési hiba:', error);
      if (error.response) {
        console.error('Hiba válasz:', error.response);
      }
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
              <img src={user_icon} alt='' />
              <input type='text' placeholder='Nev' value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </div>
           
          </div>
          <br></br>
          <div className='input-container'>
            <div className='input1'>
              <img src={password_icon} alt='' />
              <input type='password' placeholder='Jelszo' value={password} onChange={(e) => setPassword(e.target.value)}/>
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

