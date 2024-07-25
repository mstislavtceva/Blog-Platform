/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import CustomInput from '../../UI/CustomInput/CustomInput';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';
import ValidationFormErrorMessage from '../../UI/Messages/ValidationFormErrorMessage/ValidationFormErrorMessage';
import getOptions from '../Validation';
import { useRegisterUserMutation } from '../../../services/authService';
import { login } from '../../../services/authData';

import cl from './SignUp.module.scss';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreement: false,
    },
  });

  const [registerUser, { error, isSuccess, data }] = useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        login({
          username: data.user.username,
          email: data.user.email,
          token: data.user.token,
          image: data.user.image,
        })
      );
      navigate('/articles');
      clearErrors();
    }
  }, [isSuccess, data, dispatch, navigate, clearErrors]);

  const isFetchBaseQueryError = (errorFetch) =>
    typeof errorFetch === 'object' && errorFetch !== null && 'status' in errorFetch;

  useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      const serverMessages = JSON.parse(JSON.stringify(error.data));
      // eslint-disable-next-line no-restricted-syntax
      for (const key in serverMessages.errors) {
        if (key === 'username' || key === 'email' || key === 'password' || key === 'confirmPassword') {
          setError(key, { message: serverMessages.errors[key] });
        }
      }
    }
  }, [error, setError]);

  const onSubmit = async (formData) => {
    await registerUser({ user: { username: formData.username, email: formData.email, password: formData.password } });
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl.signup}>
        <h1 className={cl.signup__title}>Create new account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.signup__form}>
          <CustomInput
            label="Username"
            register={register}
            errors={errors}
            options={getOptions().username}
            name="username"
            placeholder="Username"
            type="text"
          />
          <CustomInput
            label="Email address"
            register={register}
            errors={errors}
            options={getOptions().email}
            name="email"
            placeholder="Email address"
            type="email"
          />
          <CustomInput
            label="Password"
            register={register}
            errors={errors}
            options={getOptions().password}
            placeholder="Password"
            name="password"
            type="password"
          />
          <CustomInput
            label="Repeat Password"
            register={register}
            errors={errors}
            options={getOptions(watch('password')).repeatPassword}
            placeholder="Password"
            name="repeatPassword"
            type="password"
          />
          {/* eslint-disable-next-line react/self-closing-comp */}
          <div className={cl.signup__line}></div>
          <div>
            <label className={cl.signup__label} htmlFor="agreement">
              <input
                className={`visually-hidden ${cl.signup__input}`}
                id="agreement"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('agreement', getOptions().checkbox)}
                type="checkbox"
              />
              I agree to the processing of my personal information
            </label>
            <ValidationFormErrorMessage errors={errors} name="agreement" />
          </div>
          <div className={cl.footer}>
            <ButtonForm>Create</ButtonForm>
            <p className={cl.footer__text}>
              Already have an account?
              <span className={cl.footer__link}>
                <Link to="/sign-in">Sign In.</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
