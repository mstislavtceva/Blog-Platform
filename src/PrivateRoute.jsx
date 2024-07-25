import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute() {
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  let isAuth = localStorage.getItem('token');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isAuth = localStorage.getItem('token');
  }, [token]);

  return isAuth ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
