import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import SectionTitle from '@/components/SectionTitle';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function PersonalInformation() {
  const nameSchema = new yup.ObjectSchema({
    name: yup.string().required('Name is required')
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.changeNameError);
  const loading = useSelector((state) => state.auth.isLoading);
  const [changeNameLoading, setChangeNameLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(nameSchema)
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('name')) {
          setError('name', {
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
    setChangeNameLoading(true);
    dispatch(
      authActions.changeName({
        name: form.name
      })
    );
  };

  useEffect(() => {
    if (!loading) {
      setChangeNameLoading(false);
    }
  }, [loading]);
  useEffect(() => {
    if (user) {
      setValue('name', user.name);
    }
  }, [user, setValue]);

  return (
    <>
      <div className="pb-6 lg:pb-4 mb-6 lg:mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Personal Information"
          sectionDescription="Update your name and email details here."
        />
      </div>
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
        <Input
          label="Name"
          type="text"
          name="name"
          id="name"
          register={register('name')}
          error={errors.name}
          placeholder="Name"
        />
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" loading={changeNameLoading} text="Save Name" variant="indigo" />
        </div>
      </form>
    </>
  );
}
