import React, { useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Input from '@/components/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Email, Key } from '@/components/icons';
import Button from '@/components/Button';
import { authActions } from '@/redux/auth/authSlice';
import Router from 'next/router';

export default function ChangeEmail({ user }) {
  const changeEmailSchema = new yup.ObjectSchema({
    newEmail: yup.string().required('Email is required').email('Please enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.changeEmailError);
  const loading = useSelector((state) => state.auth.changeEmailLoading);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(changeEmailSchema)
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('current password')) {
          setError('password', {
            type: 'manuel',
            message: err.message
          });
        }
        if (err.message?.includes('email')) {
          setError('newEmail', {
            type: 'manuel',
            message: err.message
          });
        }
      });
    }
    if (!error) {
      reset();
    }
  }, [error, setError]);

  const formSubmit = (form) => {
    dispatch(
      authActions.changeEmailRequest({
        password: form.password,
        email: form.newEmail,
        onSuccess: () =>
          Router.push(`/mail-verification-message?operation=change&email=${form.newEmail}`)
      })
    );
  };
  useEffect(
    () => () => {
      dispatch(authActions.resetErrorsRequest());
    },
    []
  );

  return (
    <>
      <div className="pb-6 lg:pb-4 mb-6 lg:mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Change Email"
          sectionDescription="Please enter your current password and new email to change your email."
        />
      </div>
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
        <Input
          label="Current Email"
          type="email"
          name="email"
          id="email"
          value={user?.email}
          icon={<Email className="w-5 h-5 text-gray-500 dark:text-aa-100 purple:text-pt-100" />}
          disabled
        />
        <Input
          label="New Email"
          type="email"
          name="newEmail"
          id="newEmail"
          register={register('newEmail')}
          error={errors.newEmail}
          placeholder="Enter your new email"
          icon={<Email className="w-5 h-5 text-gray-500" />}
        />
        <Input
          label="Current Password"
          type="password"
          name="password"
          id="password"
          register={register('password')}
          error={errors.password}
          icon={<Key className="w-5 h-5 text-gray-500" />}
          placeholder="Enter your current password"
        />
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" loading={loading} text="Change Email" variant="indigo" />
        </div>
      </form>
    </>
  );
}
