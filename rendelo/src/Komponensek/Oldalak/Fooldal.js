
import './CSS/Fooldal.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook importálása

const Fooldal = () => {
  const navigate = useNavigate(); // useNavigate hook inicializálása

  // handleClick függvény létrehozása, amely navigál az adott útvonalra
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className='Fooldal'>
      
      <h1 className='Elso'>
        
        Ételrendelés Gyorsan és Egyszerűen
        
        </h1>
     
      <p className='Masodik'>
        Találd meg kedvenc ételeidet és rendeld meg pár kattintással!
        <hr/>
        </p>
      
      <h2 className='Harmadik'>
        Rólunk
      </h2>
      
      <p className='Negyedik'>
        Üdvözlünk a FoodRapid-on, ahol az ország legfinomabb ételeit kínáljuk házhozszállítással.
        <hr/>
        </p>
     <button className='gomb1' onClick={() => handleClick('/shop')}>
      <p className='Otodik'>
        Étlap
        </p> 
        </button>
      <p className='Hatodik'>
        Böngéssz ételkínálatunkban, és válaszd ki a neked tetsző fogásokat. Minden ételünk frissen, a legjobb alapanyagokból készül.
       <hr/>
        </p>
      <button className='gomb2' onClick={() => handleClick('/kapcsolat')}>
      <p className='Hetedik'>
        Kapcsolat
        </p> 
        </button>
      <p className='Nyolcadik'>
        Ha kérdésed van, vagy segítségre van szükséged a rendelésben, vedd fel velünk a kapcsolatot az alábbi elérhetőségeken.
        <hr/>
        </p>
    
    
    </div>
  );
};

export default Fooldal;
