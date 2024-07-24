/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import CustomInput from '../../UI/CustomInput/CustomInput';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';
import getOptions from '../Validation';
import { useEditUserMutation } from '../../../services/authService';
import { login } from '../../../services/authData';

import cl from './Profile.module.scss';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [api, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      image: '',
    },
  });

  const [editUser, { error, isSuccess, data }] = useEditUserMutation();

  useEffect(() => {
    reset({
      username: user.username,
      image: user.image,
      email: user.email,
    });
  }, [user, reset]);

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
      api.open({ type: 'success', content: 'Your data has been successfully updated' });
    }
  }, [isSuccess, data, dispatch, api, navigate]);

  const isFetchBaseQueryError = (errorFetch) =>
    typeof errorFetch === 'object' && errorFetch !== null && 'status' in errorFetch;

  useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      const serverMessages = JSON.parse(JSON.stringify(error.data));
      // eslint-disable-next-line guard-for-in
      for (const key in serverMessages.errors) {
        setError(key, { message: serverMessages.errors[key] });
      }
      api.open({ type: 'error', content: `${serverMessages.errors.message}` });
      clearErrors();
    }
  }, [error, clearErrors, setError, api]);

  const onSubmit = async (formData) => {
    await editUser({
      user: {
        email: formData.email,
        image: formData.image,
        username: formData.username,
        password: formData.password,
        token: user.token,
      },
    });
  };

  return (
    <div className={cl.wrapper}>
      {contextHolder}
      {/* {contextHolder} */}
      <div className={cl.profile}>
        <h1 className={cl.profile__heading}>Edit Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.profile__form}>
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
            label="New Password"
            register={register}
            errors={errors}
            options={getOptions().password}
            placeholder="New Password"
            name="password"
            type="password"
          />
          <CustomInput
            label="Avatar image (url)"
            register={register}
            errors={errors}
            options={getOptions().image}
            placeholder="Avatar image"
            name="image"
            type="text"
          />
          <div className={cl.footer}>
            <ButtonForm>Save</ButtonForm>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
