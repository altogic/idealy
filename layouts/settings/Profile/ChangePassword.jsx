import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { authActions } from '@/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Key } from '@/components/icons';
import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import Input from '@/components/Input';

export default function ChangePassword() {
  const changePasswordSchema = new yup.ObjectSchema({
    currentPassword: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    newPassword: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match')
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.changePasswordError);
  const loading = useSelector((state) => state.auth.isLoading);

  const [upLoading, setUpLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(changePasswordSchema)
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('current password')) {
          setError('currentPassword', {
            type: 'manuel',
            message: 'Current password is wrong!'
          });
        } else if (err.message?.includes('at least')) {
          setError('newPassword', {
            type: 'manuel',
            message: err.message
          });
        }
      });
    }
  }, [error, setError]);
  const formSubmit = async (form) => {
    setUpLoading(true);
    dispatch(
      authActions.changePassword({
        newPassword: form.newPassword,
        currentPassword: form.currentPassword
      })
    );
    reset();
  };
  useEffect(
    () => () => {
      dispatch(authActions.resetErrorsRequest());
    },
    []
  );
  useEffect(() => {
    if (!loading) {
      setUpLoading(false);
    }
  }, [loading]);

  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Password"
          sectionDescription="Please enter your current password to change your password."
        />
      </div>
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
        <Input
          type="password"
          name="currentPassword"
          id="currentPassword"
          register={register('currentPassword')}
          error={errors.currentPassword}
          placeholder="Current Password"
          icon={<Key className="w-5 h-5 text-gray-500" />}
          autoComplete="off"
        />
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          register={register('newPassword')}
          error={errors.newPassword}
          placeholder="New Password"
          icon={<Key className="w-5 h-5 text-gray-500" />}
          autoComplete="off"
        />
        <Input
          type="password"
          name="confirmNewPassword"
          id="confirmNewPassword"
          register={register('confirmNewPassword')}
          error={errors.confirmNewPassword}
          placeholder="Confirm New Password"
          icon={<Key className="w-5 h-5 text-gray-500" />}
          autoComplete="off"
        />
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" loading={upLoading} text="Update password" variant="indigo" />
        </div>
      </form>
    </>
  );
}
