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

export default function UserSegments() {
  const createUserSegmentName = new yup.ObjectSchema({
    segmentName: yup.string().required('User segment name is required')
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.company.companyTopicsError);
  const loading = useSelector((state) => state.company.isLoading);
  const company = useSelector((state) => state.company.company);
  const [segmentLoading, setSegmentLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createUserSegmentName)
  });
  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('segments')) {
          setError('segmentName', {
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
    setSegmentLoading(true);
    dispatch(
      companyActions.addItemToCompanySubLists({
        fieldName: 'userSegments',
        value: {
          name: form.segmentName,
          order: company.userSegments.length + 1,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        }
      })
    );
    reset();
  };

  useEffect(() => {
    if (!loading) {
      setSegmentLoading(false);
    }
  }, [loading]);
  return (
    <>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="User Segments"
          sectionDescription="User segments are used to group users based on their actions. You can create as many user segments as you want. For example, you can create a user segment for users who have visited a specific page or users who have clicked on a specific button."
          big
        />
      </div>
      <div className="max-w-2xl">
        <div className="pb-6 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,135px] items-start gap-4">
              <Input
                type="text"
                name="segmentName"
                id="segmentName"
                register={register('segmentName')}
                error={errors.segmentName}
                placeholder="Enter user segment name"
              />
              <Button
                type="submit"
                loading={segmentLoading}
                text="Add User Segment"
                variant="indigo"
                height="44"
              />
            </div>
          </form>
        </div>
        <div>
          {company?.userSegments?.length > 0 ? (
            <SortableCompanyActions
              property="userSegments"
              modalTitle="Delete User Segment"
              modalDescription="Are you sure you want to delete this segment? This action cannot be undone."
              onDelete={(segment) =>
                dispatch(
                  companyActions.deleteCompanySubListsItem({
                    id: segment._id,
                    fieldName: 'userSegments'
                  })
                )
              }
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
