import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import Input from '@/components/Input';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';

export default function CompanyName() {
  const companyNameSchema = new yup.ObjectSchema({
    companyName: yup.string().required('Company name is required')
  });

  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const error = useSelector((state) => state.company.changeCompanyNameError);
  const loading = useSelector((state) => state.company.isLoading);
  const [changeCompanyNameLoading, setChangeCompanyNameLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(companyNameSchema)
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('companyName')) {
          setError('companyName', {
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
    setChangeCompanyNameLoading(true);
    dispatch(
      companyActions.updateCompany({
        _id: company._id,
        name: form.companyName
      })
    );
  };

  useEffect(() => {
    if (!loading) {
      setChangeCompanyNameLoading(false);
    }
  }, [loading]);
  useEffect(() => {
    if (company) {
      setValue('companyName', company.name);
    }
  }, [company.name, setValue]);
  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200 dark:border-aa-400 purple:border-aa-400">
        <SectionTitle sectionTitle="Company Name" sectionDescription="Update your company name." />
      </div>
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
        <Input
          label="Company name"
          type="text"
          name="companyName"
          id="companyName"
          register={register('companyName')}
          error={errors.companyName}
          placeholder="Company name"
        />
        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            loading={changeCompanyNameLoading}
            text="Save changes"
            variant="indigo"
          />
        </div>
      </form>
    </>
  );
}
