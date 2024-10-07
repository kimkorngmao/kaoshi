import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChangeStatus, setIsChangeStatus] = useState(true)
  const navigate = useNavigate();

  // Check if token exists in localStorage on first load and fetch user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:3000/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setCurrentUser(response.data); // Set the current user
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setCurrentUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isChangeStatus]);

  // Function to log in the user
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      setIsChangeStatus(!isChangeStatus)
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsChangeStatus(!isChangeStatus)
    navigate('/login');
  };

  // Check if the user is authenticated
  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
