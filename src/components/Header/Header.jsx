import React from 'react';
import { Link } from 'react-router-dom';

import Auth from './AuthHeader/Auth/Auth';
import cl from './Header.module.scss';

function Header() {
  return (
    <header className={cl.header}>
      <div className={cl.header__container}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className={cl.header__heading}>RealWorld Blog</h1>
        </Link>
        <Auth />
      </div>
    </header>
  );
}

export default Header;
