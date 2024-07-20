/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Alert } from 'antd';

function ErrorMessage() {
  return (
    <Alert message="Error" description="Что-то не так:( Попробуйте перезагрузить страницу" type="error" showIcon />
  );
}

export default ErrorMessage;
