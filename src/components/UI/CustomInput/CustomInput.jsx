/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ValidationFormErrorMessage from '../Messages/ValidationFormErrorMessage/ValidationFormErrorMessage';

import cl from './CustomInput.module.scss';

// Вставить сюда options
function CustomInput({ label, register, errors, options, name, type, placeholder }) {
  return (
    <div className={cl.input}>
      {label ? (
        <label className={cl.input__label} htmlFor={name}>
          {label}
        </label>
      ) : null}
      {type === 'textarea' ? (
        <textarea
          className={`${cl.custom} ${cl.input__text} ${errors && errors[name] ? cl.warning : ''}`}
          id={name}
          {...register(name, options)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${cl.custom} ${errors && errors[name] ? cl.warning : ''}`}
          id={name}
          {...register(name, options)}
          placeholder={placeholder}
          type={type}
        />
      )}
      <ValidationFormErrorMessage errors={errors} name={name} />
    </div>
  );
}

export default CustomInput;
