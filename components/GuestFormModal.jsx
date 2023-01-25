import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import Button from './Button';
import GuestForm from './GuestForm';
import Modal from './Modal';

export default function GuestFormModal({ title, onSubmit, open, onClose, showLoginLink }) {
  const schema = yup.object().shape({
    guestName: yup.string().required('Name is required'),
    guestEmail: yup.string().email('Email is invalid').required('Email is required')
  });
  const company = useSelector((state) => state.company.company);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const submit = (data) => {
    onSubmit(data);
    dispatch(
      companyActions.createCompanyUser({
        companyId: company._id,
        name: data.guestName,
        email: data.guestEmail
      })
    );
  };
  return (
    <Modal show={open} onClose={() => onClose()}>
      <h1 className="mb-8 text-lg md:text-xl lg:text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-aa-100 purple:text-pt-100 text-center">
        {title}
      </h1>

      <form onSubmit={handleSubmit(submit)} className="px-8">
        <GuestForm register={register} errors={errors} vertical />
        <div className="flex justify-end gap-2 my-8">
          <Button type="button" text="Cancel" variant="blank" onClick={() => onClose()} />
          <Button type="submit" variant="indigo" text="Submit" />
        </div>
        {showLoginLink && (
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login">
              <a className="text-indigo-700 ml-2">Login</a>
            </Link>
          </div>
        )}
      </form>
    </Modal>
  );
}
