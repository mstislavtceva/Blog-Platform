/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Layout from '../Layout/Layout';
import ArticleList from '../ArticleList/ArticleList';
import ArticleCard from '../ArticleCard/ArticleCard';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';
import Profile from '../Auth/Profile/Profile';
import { login } from '../../services/authData';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      dispatch(login(user.user));
    }
    console.log('no LOCAL STORAGE');
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="articles" />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/:param" element={<ArticleCard />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
