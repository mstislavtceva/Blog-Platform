import React from 'react';

import ErrorMessage from '../ErrorMessage';

import cl from './NotFoundPage.module.scss';

function NotFoundPage() {
  return (
    <div className={cl.page}>
      <ErrorMessage />
    </div>
  );
}

export default NotFoundPage;
