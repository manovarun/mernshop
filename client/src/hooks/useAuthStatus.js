import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    if (user && user.isAdmin) {
      setIsAdminUser(true);
    } else {
      setIsAdminUser(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, isAdminUser, checkingStatus };
};
