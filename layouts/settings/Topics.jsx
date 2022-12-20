/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import SectionTitle from '@/components/SectionTitle';
import Input from '@/components/Input';
import Button from '@/components/Button';
import SortableCompanyActions from '@/components/SortableCompanyActions';
import EmptyState from '@/components/EmptyState';

export default function Topics() {
  const createTopicsName = new yup.ObjectSchema({
    topicsName: yup.string().required('Topics name is required')
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.company.companyTopicsError);
  const loading = useSelector((state) => state.company.isLoading);
  const company = useSelector((state) => state.company.company);
  const [updateTopicsLoading, setUpdateTopicsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createTopicsName)
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('topics')) {
          setError('topics', {
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
    setUpdateTopicsLoading(true);
    dispatch(
      companyActions.addItemToCompanySubLists({
        fieldName: 'topics',
        value: {
          name: form.topicsName,
          order: company.topics.length + 1
        }
      })
    );
    reset();
  };

  useEffect(() => {
    if (!loading) {
      setUpdateTopicsLoading(false);
    }
  }, [loading]);

  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Topics"
          sectionDescription="Add Topics so that users can tag them when creating Ideas."
          big
        />
      </div>
      <div className="max-w-2xl">
        <div className="pb-6 mb-11 border-b border-slate-200">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,135px] gap-4">
              <Input
                type="text"
                name="topicsName"
                id="topicsName"
                register={register('topicsName')}
                error={errors.topicsName}
                placeholder="Enter topic name"
              />
              <Button
                type="submit"
                loading={updateTopicsLoading}
                text="Add topic"
                variant="indigo"
                height="44"
              />
            </div>
          </form>
        </div>
        <div>
          {company?.topics.length > 0 ? (
            <SortableCompanyActions
              property="topics"
              modalTitle="Delete Topics"
              modalDescription="Are you sure you want to delete this topics? This action cannot be undone."
              onDelete={(topic) =>
                dispatch(
                  companyActions.deleteCompanySubListsItem({
                    id: topic._id,
                    fieldName: 'topics'
                  })
                )
              }
              topics
            />
          ) : (
            <EmptyState
              title="No data found"
              description="Your search did not match any data. Please retry or try a new word."
            />
          )}
        </div>
      </div>
    </>
  );
}
