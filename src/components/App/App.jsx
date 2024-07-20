/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../Layout/Layout';
import ArticleList from '../ArticleList/ArticleList';
import ArticleCard from '../ArticleCard/ArticleCard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="articles" />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/:param" element={<ArticleCard />} />
      </Route>
    </Routes>
  );
}

export default App;
