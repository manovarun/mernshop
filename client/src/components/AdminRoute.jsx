import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Loader from './Loader';

const AdminRoute = () => {
  const { loggedIn, isAdminUser, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Loader />;
  }

  return loggedIn && isAdminUser ? <Outlet /> : <Navigate to='/' />;
};

export default AdminRoute;
