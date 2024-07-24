import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../UI/Button/Button';

function NotAuthorized() {
  return (
    <>
      <Link to="sign-in">
        <Button>Sign In</Button>
      </Link>
      <Link to="sign-up">
        <Button color="green">Sign Up</Button>
      </Link>
    </>
  );
}

export default NotAuthorized;
