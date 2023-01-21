import BaseListBox from '@/components/BaseListBox';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import EmptyState from '@/components/EmptyState';
import Input from '@/components/Input';
import SectionTitle from '@/components/SectionTitle';
import SortableCompanyActions from '@/components/SortableCompanyActions';
import { companyActions } from '@/redux/company/companySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

export default function Statuses() {
  const createStatusName = new yup.ObjectSchema({
    statusesName: yup.string().required('Status name is required')
  });

  const dispatch = useDispatch();
  const error = useSelector((state) => state.company.companyStatusesError);
  const loading = useSelector((state) => state.company.isLoading);
  const company = useSelector((state) => state.company.company);
  const [status, setStatus] = useState({ _id: 0, name: 'Select Status' });
  const [statuses, setStatuses] = useState();
  const [updateStatusesLoading, setUpdateStatusesLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createStatusName)
  });
  useEffect(() => {
    const status = company.statuses.find((s) => s.isCompletedStatus);
    setStatus(status || { _id: 0, name: 'Select Status' });
  }, [company]);

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('statuses')) {
          setError('statuses', {
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
    setUpdateStatusesLoading(true);
    dispatch(
      companyActions.addItemToCompanySubLists({
        fieldName: 'statuses',
        value: {
          name: form.statusesName,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          order: company.statuses.length + 1
        }
      })
    );
    reset();
  };

  useEffect(() => {
    if (!loading) {
      setUpdateStatusesLoading(false);
    }
  }, [loading]);

  const changeCompletedStatus = (status) => {
    setStatus(status);
    dispatch(
      companyActions.updateCompletedStatus({
        id: status._id,
        companyId: company._id,
        role: company.role
      })
    );
  };
  useEffect(() => {
    const temp = [...company.statuses];
    setStatuses(temp.sort((a, b) => a.order - b.order));
  }, [company]);

  return (
    <>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Statuses"
          sectionDescription="Use Statuses to track Ideas on your Roadmap."
          big
        />
      </div>
      <div className="max-w-2xl">
        <div className="pb-6 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,135px] items-start gap-4">
              <Input
                type="text"
                name="statusesName"
                id="statusesName"
                register={register('statusesName')}
                error={errors.statusesName}
                placeholder="Enter status name"
              />

              <Button
                type="submit"
                loading={updateStatusesLoading}
                text="Add Status"
                variant="indigo"
                height="44"
              />
            </div>
          </form>
        </div>
        <div className="mb-6 lg:mb-11">
          {company?.statuses.length > 0 ? (
            <SortableCompanyActions
              setStatus={setStatus}
              property="statuses"
              modalTitle="Delete Status"
              modalDescription="Are you sure you want to delete this status? This action cannot be undone."
              onDelete={(item) => {
                dispatch(
                  companyActions.deleteCompanySubListsItem({
                    id: item._id,
                    fieldName: 'statuses'
                  })
                );
                if (item.isCompletedStatus) {
                  setStatus({ _id: 0, name: 'Select Status' });
                }
              }}
            />
          ) : (
            <EmptyState
              title="No data found"
              description="Your search did not match any data. Please retry or try a new word."
            />
          )}
        </div>
        <Divider />
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
            <span className="text-slate-800 dark:text-aa-100 purple:text-pt-100 text-sm">
              Which Status is your &quot;<strong>Completed</strong>&quot; Status?{' '}
            </span>
            <BaseListBox
              value={status}
              onChange={changeCompletedStatus}
              label={status.name}
              options={statuses}
              field="name"
              size="lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
