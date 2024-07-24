import React from 'react';

import cl from './Button.module.scss';

function Button({ children, size, color, onClick }) {
  return (
    <button
      className={`${cl.button} ${color ? cl[color] : null} ${size ? cl[size] : cl.button__large}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
