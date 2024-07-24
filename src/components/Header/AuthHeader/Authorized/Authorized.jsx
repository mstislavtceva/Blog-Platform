import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../UI/Button/Button';
import { logout } from '../../../../services/authData';

import cl from './Authorized.module.scss';

function Authorized() {
  const dispatch = useDispatch();
  const {
    user: { username, image },
  } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Link to="new-article">
        <Button color="green" size="small">
          Create article
        </Button>
      </Link>
      <Link to="profile">
        <div className={cl.user}>
          <span className={cl.user__username}>{username}</span>
          <img
            className={cl.user__image}
            // eslint-disable-next-line no-unneeded-ternary
            src={image ? image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
            alt="Avatar."
          />
        </div>
      </Link>
      <Button color="black" onClick={() => handleLogout()}>
        Log Out
      </Button>
    </>
  );
}

export default Authorized;
