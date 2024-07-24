/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { message } from 'antd';

import CustomInput from '../../UI/CustomInput/CustomInput';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';
import getOptions from '../Validation';
import { useLoginUserMutation } from '../../../services/authService';
import { login } from '../../../services/authData';

import cl from './SignIn.module.scss';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [api, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loginUser, { error, isSuccess, data }] = useLoginUserMutation();

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
      navigate(-1);
    }
  }, [isSuccess, data, dispatch, navigate]);

  const isFetchBaseQueryError = (errorFetch) =>
    typeof errorFetch === 'object' && errorFetch !== null && 'status' in errorFetch;

  useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      const serverMessages = JSON.parse(JSON.stringify(error.data));
      // eslint-disable-next-line no-restricted-syntax
      for (const key in serverMessages.errors) {
        if (key === 'email' || key === 'password') {
          setError(key, { message: serverMessages.errors[key] });
        }
      }
      api.open({ type: 'error', content: `Email or Password ${serverMessages.errors['email or password']}` });
      clearErrors();
    }
  }, [error, clearErrors, setError, api]);

  const onSubmit = async (formData) => {
    await loginUser({ user: { email: formData.email, password: formData.password } });
  };

  return (
    <div className={cl.wrapper}>
      {contextHolder}
      <div className={cl.signin}>
        <h2 className={cl.signin__heading}>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.signin__form}>
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
          <div className={`${cl.signin__footer} ${cl.footer}`}>
            <ButtonForm>Login</ButtonForm>
            <p className={cl.footer__text}>
              Don’t have an account?
              <span className={cl.footer__link}>
                <Link to="/sign-up">Sign Up.</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
