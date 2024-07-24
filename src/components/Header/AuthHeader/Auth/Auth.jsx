import React from 'react';
import { useSelector } from 'react-redux';

import Authorized from '../Authorized/Authorized';
import NotAuthorized from '../NotAuthorized/NotAuthorized';

import cl from './Auth.module.scss';

function Auth() {
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  return <div className={cl.auth}>{token.length !== 0 ? <Authorized /> : <NotAuthorized />}</div>;
}

export default Auth;
