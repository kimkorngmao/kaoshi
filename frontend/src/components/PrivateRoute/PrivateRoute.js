import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    setToken(localStorage.getItem('token'));
  }, [])

  if (!token){
    navigate('/login') 
    return
  } 
  return children;
};
