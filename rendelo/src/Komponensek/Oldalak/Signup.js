import React, { useState, useEffect, useRef } from 'react';
import './CSS/SignUp.css';
import axios from 'axios';

import user_icon from '../forrasok/person.png';
import email_icon from '../forrasok/email.png';
import password_icon from '../forrasok/password.png';

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
 
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState(0);
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

  const handleSignUp = async () => {
    try {
      const response = await axios.post('https://localhost:7256/auth/register', { userName, password, email, fullName, age });
      console.log(response.data);
      alert("Sikeres regisztráció!"); 

      
      localStorage.setItem('user', userName);
     
    
    } catch (error) {
   
      if (error.response) {
        console.error('Hiba válasz:', error.response);
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`login-signup-centered2 `} ref={ref}>
      <div className='container2'>
        <button className="close-button2" onClick={() => setIsVisible(false)}>X</button>
        <div className='header2'>
          <div className='text2'>Regisztráció</div>
          <div className='underline2'></div>
        </div>
        <div className='inputs2'>
          <div className='input-container'>
            <div className='input2'>
              <img src={user_icon} alt='' />
              <input type='text' placeholder='Felhasználónév' value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </div>
          </div>
          <br></br>
          <div className='input-container'>
            <div className='input2'>
              <img src={password_icon} alt='' />
              <input type='password' placeholder='Jelszó' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <br></br>
          <div className='input-container'>
            <div className='input2'>
              <img src={email_icon} alt='' />
              <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>
          <br></br>
          <div className='input-container'>
            <div className='input2'>
              <img src={user_icon} alt='' />
              <input type='text' placeholder='Teljes név' value={fullName} onChange={(e) => setFullName(e.target.value)}/>
            </div>
          </div>
          <br></br>
          <div className='input-container'>
            <div className='input2'>
              <img src={user_icon} alt='' />
              <input type='number' placeholder='Kor' value={age} onChange={(e) => setAge(parseInt(e.target.value))}/>
            </div>
          </div>

          <div className='submit-container2'>
            <div className='submit2' onClick={handleSignUp}>Regisztráció</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
