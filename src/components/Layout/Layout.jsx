/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Outlet } from 'react-router-dom';

import cl from './Layout.module.scss';

function Layout() {
  return (
    <>
      <header>Здесь будет ХЕДЕР</header>
      <main className={cl.layout}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
