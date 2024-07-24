/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';

import cl from './Layout.module.scss';

function Layout() {
  return (
    <div className={cl.wrapper}>
      <Header />
      <main className={cl.layout}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
