import React, { useState, useEffect, useRef } from 'react';
import './CSS/SignUp.css';
import axios from 'axios';

import user_icon from '../forrasok/person.png';
import email_icon from '../forrasok/email.png';
import password_icon from '../forrasok/password.png';

const Signup = () => {
  const [nev, setNev] = useState("");
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [nevError, setNevError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [jelszoError, setJelszoError] = useState("");
  
  const [token, setToken] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //Email cím: zsombor@gmail.com
  const nevRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  //Nev: zsombor
  const jelszoRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  //Jelszo: A1!rK8-2

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
    let isValid = true;
  
    if (!nevRegex.test(nev)) {
      setNevError("A név nem megfelelő karaktereket tartalmaz!");
      isValid = false;
    } else {
      setNevError("");
    }
  
    if (!emailRegex.test(email)) {
      setEmailError("Az email-cím nem megfelelő karaktereket tartalmaz!");
      isValid = false;
    } else {
      setEmailError("");
    }
  
    if (!jelszoRegex.test(jelszo)) {
      setJelszoError("A jelszó nem megfelelő karaktereket tartalmaz!");
      isValid = false;
    } else {
      setJelszoError("");
    }
  
    if (isValid) {
      try {
        const response = await axios.post('', { nev, email, jelszo }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setToken(response.data.token);
       
        console.log(response.data);
      
        localStorage.setItem('user', nev);
        localStorage.setItem('email', email);
        localStorage.setItem('pwd', jelszo);
      } catch (error) {
        console.error('Regisztrációs hiba:', error);
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
              <input type='text' placeholder='Nev' value={nev} onChange={(e) => setNev(e.target.value)}/>
            </div>
            {nevError && <div className="error-popup">{nevError}</div>}
          </div>
          <br></br>
          <div className='input-container'>
            <div className='input2'>
              <img src={email_icon} alt='' />
              <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            {emailError && <div className="error-popup">{emailError}</div>}
          </div>
          <br></br>
          <div className='input-container'>
            <div className='input2'>
              <img src={password_icon} alt='' />
              <input type='password' placeholder='Jelszo' value={jelszo} onChange={(e) => setJelszo(e.target.value)}/>
            </div>
            {jelszoError && <div className="error-popup">{jelszoError}</div>}
          </div>
          <div className='elfelejtett-jelszo2'>Elfelejtett jelszó? <span>Kattints ide!</span> </div>
          <div className='submit-container2'>
            <div className='submit2' onClick={handleSignUp}>Regisztráció</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
