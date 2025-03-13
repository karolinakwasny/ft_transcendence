import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {

    console.log('handleLogout function called');
    setIsLoggedIn(false); // Update state for logged-out status
		localStorage.clear();
    //localStorage.removeItem('access_token');
    //localStorage.removeItem('refresh_token');
    
  };

  return { handleLogout };
};

