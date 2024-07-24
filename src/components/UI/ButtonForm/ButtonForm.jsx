import React from 'react';

import cl from './ButtonForm.module.scss';

function ButtonForm({ children }) {
  return (
    <button className={cl.btn} type="submit">
      {children}
    </button>
  );
}

export default ButtonForm;
