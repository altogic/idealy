import { useState, useEffect, Fragment } from 'react';
import * as yup from 'yup';
import { Listbox, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import SectionTitle from '@/components/SectionTitle';
import Input from '@/components/Input';
import Button from '@/components/Button';
import SortableCompanyActions from '@/components/SortableCompanyActions';
import EmptyState from '@/components/EmptyState';

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
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-400 purple:border-pt-400">
        <SectionTitle
          sectionTitle="Statuses"
          sectionDescription="Use Statuses to track Ideas on your Roadmap."
          big
        />
      </div>
      <div className="max-w-2xl">
        <div className="pb-4 mb-6 lg:mb-11 border-b border-slate-200">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,135px] gap-4">
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
        <hr className="border-slate-200" />
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
            <span className="text-slate-800 dark:text-aa-100 purple:text-pt-100 text-sm">
              Which Status is your &quot;<strong>Completed</strong>&quot; Status?{' '}
            </span>
            <Listbox value={status} onChange={(selected) => changeCompletedStatus(selected)}>
              <div className="relative mt-1 flex-[0.6]">
                <Listbox.Button className="relative w-full inline-flex bg-white dark:bg-aa-800 purple:bg-pt-800 py-3.5 px-[14px] border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <div className="inline-flex items-center gap-2">
                    {status.color && (
                      <svg className="h-2.5 w-2.5" fill={status.color} viewBox="0 0 8 8">
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                    )}
                    <span className="block text-gray-500 dark:text-aa-200 purple:text-pt-200 truncate">
                      {status.name}
                    </span>
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-aa-200 purple:text-pt-200"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options className="absolute bottom-16 lg:bottom-[initial] mt-1 w-full overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[60]">
                    {statuses?.map((item) => (
                      <Listbox.Option
                        key={item._id}
                        className={({ active }) =>
                          `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 transition hover:text-slate-900 dark:hover:text-aa-100 purple:hover:text-pt-100 ${
                            active
                              ? 'bg-slate-100 dark:bg-aa-700 purple:bg-pt-700'
                              : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                          }`
                        }
                        value={item}>
                        {({ selected }) => (
                          <>
                            <div className="inline-flex items-center gap-2">
                              <svg className="h-2.5 w-2.5" fill={item.color} viewBox="0 0 8 8">
                                <circle cx={4} cy={4} r={3} />
                              </svg>
                              <span
                                className={`block truncate ${
                                  selected
                                    ? 'text-slate-900 dark:text-aa-100 purple:text-pt-100'
                                    : 'font-normal'
                                }`}>
                                {item.name}
                              </span>
                            </div>

                            {selected ? (
                              <span className="flex items-center pl-3 text-indigo-700 dark:text-aa-200 purple:text-pt-200">
                                <svg
                                  className="w-5 h-5"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M16.6673 5L7.50065 14.1667L3.33398 10"
                                    stroke="currentColor"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </>
  );
}
