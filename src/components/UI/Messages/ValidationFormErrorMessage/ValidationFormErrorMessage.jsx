/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ErrorMessage } from '@hookform/error-message';

import cl from './ValidationFormErrorMessage.module.scss';

function ValidationFormErrorMessage({ errors, name }) {
  return (
    <ErrorMessage errors={errors} name={name} render={({ message }) => <div className={cl.message}>{message}</div>} />
  );
}

export default ValidationFormErrorMessage;
