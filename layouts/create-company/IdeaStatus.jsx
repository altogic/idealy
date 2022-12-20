import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import TopicBadges from '@/components/TopicBadges';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import _ from 'lodash';
import StatusButton from '@/components/StatusButton';

export default function FourthWizard() {
  const companyTopics = useSelector((state) => state.company.companyTopics);
  const idea = useSelector((state) => state.company.idea);
  const ideaDescription = useSelector((state) => state.company.ideaDescription);
  const statuses = useSelector((state) => state.topic.statuses);
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(companyActions.setIdeaStatus(status));
  }, [status]);
  useEffect(() => {
    if (!_.isNil(statuses)) {
      setStatus(statuses[0]);
    }
  }, [statuses]);

  return (
    <>
      <div className="max-w-[444px] mx-auto mb-8 md:mb-16 text-center">
        <h2 className="text-slate-700 mb-4 text-3xl font-semibold tracking-md">
          Every idea has a status
        </h2>
        <p className="text-slate-500 text-lg tracking-sm">
          Statuses let customers know what stage the idea is at.
        </p>
      </div>
      <div className="space-y-6">
        <Listbox value={status} onChange={setStatus}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <div className="inline-flex items-center gap-2">
                <svg className="h-2.5 w-2.5" fill={status?.color} viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <span className="block text-slate-800 truncate">{status?.name}</span>
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                <svg
                  className="w-5 h-5 text-slate-500"
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {statuses.map((item) => (
                  <Listbox.Option
                    key={item._id}
                    className={({ active }) =>
                      `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                        active ? 'bg-slate-100' : 'text-slate-900'
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
                              selected ? 'font-medium' : 'font-normal'
                            }`}>
                            {item.name}
                          </span>
                        </div>
                        {selected ? (
                          <span className="flex items-center pl-3 text-indigo-700">
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
        <div className="bg-white py-8 px-6 border border-slate-200 rounded-lg">
          <h2 className="text-slate-800 mb-2 text-base font-semibold tracking-sm">{idea}</h2>
          <p className="text-slate-500 mb-5 text-sm tracking-sm">{ideaDescription}</p>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {companyTopics.map((topic) => (
                <TopicBadges key={topic._id} badgeName={topic.name} />
              ))}
            </div>
            {status && <StatusButton name={status?.name} color={status?.color} />}
          </div>
        </div>
      </div>
    </>
  );
}
