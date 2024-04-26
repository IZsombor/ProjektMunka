import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    navigate('/fooldal');
  }, [navigate]);

  return (
    <div>Kijelentkezés...</div>
  );
};

export default Logout;
