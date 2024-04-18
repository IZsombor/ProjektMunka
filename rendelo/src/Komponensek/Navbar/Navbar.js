
import React, { useState  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons'; 
import {faTruck} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';


const Navbar = () => {
  const [menu, setMenu] = useState("");
  
 
 
  const navigate = useNavigate();

  const handleMenuClick = (menuName, path) => {
    setMenu(menuName);
    navigate(path);
  };

   return (
    <div className="navbar" style={{position: 'fixed', width: '100%'}}>
      <button className="logo-button" onClick={() =>  {handleMenuClick('Főoldal', '/fooldal'); window.location.reload();}}>
      <FontAwesomeIcon icon={faBurger} size="2x" color='#260de3' /> 
        <h1 className='logo'>FoodRapid</h1>
      </button>
      <ul className='nav-menu'>
        <li onMouseOver={() => setMenu("Főoldal")} onMouseOut={() => setMenu("")} onClick={() => handleMenuClick("Főoldal", '/fooldal')}>
          <Link style={{textDecoration: 'none', color: 'black'}} to='/fooldal'>Főoldal</Link>
          {menu === "Főoldal" && <hr />}
        </li>
        <li onMouseOver={() => setMenu("Étlap")} onMouseOut={() => setMenu("")} onClick={() => handleMenuClick("Étlap", '/shop')}>
          <Link style={{textDecoration: 'none' , color: 'black' }} to='/shop'>Étlap</Link>
          {menu === "Étlap" && <hr />}
        </li>
       
        <li onMouseOver={() => setMenu("Kapcsolat")} onMouseOut={() => setMenu("")} onClick={() => handleMenuClick("Kapcsolat", '/kapcsolat')}>
          <Link style={{textDecoration: 'none' , color: 'black'}} to='/kapcsolat'>Kapcsolat</Link>
          {menu === "Kapcsolat" && <hr />}
        </li>
      </ul>
      <div  className='nav-signup'>
        <button onClick={() => handleMenuClick("Regisztráció", '/signup')}>
        Regisztráció
        </button> 
      </div>
      <div className='nav-login'>
      <button onClick={() => handleMenuClick("Bejelentkezés", '/login')}>
        Bejelentkezés
        </button> 
     
        <div className='Cart' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }} to='/cart'><b>Rendelés</b> <FontAwesomeIcon icon={faTruck} size="1x" color='#260de3' /></Link>
</div>
      </div>
    </div>
  );
};

export default Navbar;