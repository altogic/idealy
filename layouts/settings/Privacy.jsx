import React, { Fragment, useState, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Listbox, Transition } from '@headlessui/react';
import Toggle from '@/components/Toggle';
import { COMPANY_VISIBILITY } from 'constants';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';

export default function Privacy() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const [companySelected, setCompanySelected] = useState(
    COMPANY_VISIBILITY[company.privacy.isPublic ? 0 : 1]
  );
  const [userApproval, setUserApproval] = useState(company.privacy.userApproval);
  const [ideaApproval, setIdeaApproval] = useState(company.privacy.ideaApproval);
  useEffect(() => {
    setCompanySelected(COMPANY_VISIBILITY[company.privacy.isPublic ? 0 : 1]);
    setUserApproval(company.privacy.userApproval);
    setIdeaApproval(company.privacy.ideaApproval);
  }, [company]);
  const updateCompanyPrivacy = (fieldName, value) => {
    dispatch(
      companyActions.updateCompany({
        _id: company._id,
        privacy: {
          [fieldName]: value
        }
      })
    );
  };
  return (
    <div>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-400 purple:border-pt-400">
        <SectionTitle
          sectionTitle="Privacy"
          sectionDescription="Fine tune who has access to your company."
          big
        />
      </div>
      <div className="max-w-2xl">
        <div className="divide-y divide-slate-200 dark:divide-aa-400 purple:divide-pt-400">
          <div className="pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <SectionTitle
                sectionTitle="Company visibility"
                sectionDescription="Select who sees your Ideas board, Roadmap and Announcements."
              />
              <Listbox
                value={companySelected}
                onChange={(selected) => {
                  setCompanySelected(selected);
                  updateCompanyPrivacy('isPublic', selected === 'Public');
                }}>
                <div className="relative">
                  <Listbox.Button className="relative w-full md:w-[150px] inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block text-gray-500 text-sm tracking-sm truncate">
                      {companySelected}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <svg
                        className="w-5 h-5 text-gray-500"
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
                    <Listbox.Options className="absolute mt-1 md:max-h-60 w-full md:w-[150px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                      {COMPANY_VISIBILITY.map((item) => (
                        <Listbox.Option
                          key={item}
                          className={({ active }) =>
                            `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                              active ? 'bg-slate-100' : 'text-slate-900'
                            }`
                          }
                          value={item}>
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}>
                                {item}
                              </span>
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
            </div>
          </div>
          <div className="py-6">
            <Toggle
              title="User approval"
              description
              descriptionText="Approve users before they gain access to your board."
              enabled={userApproval}
              onChange={() => {
                setUserApproval(!userApproval);
                updateCompanyPrivacy('userApproval', !userApproval);
              }}
            />
          </div>
          <div className="py-6">
            <Toggle
              title="Idea approval"
              description
              descriptionText="Stop Ideas from going live on your board until you approve them."
              enabled={ideaApproval}
              onChange={() => {
                setIdeaApproval(!ideaApproval);
                updateCompanyPrivacy('ideaApproval', !ideaApproval);
              }}
            />
          </div>
          {/* <div className="py-6">
            <Toggle
              title="Disable search engine indexing (Beta)"
              description
              descriptionText="Stop search engines indexing your content."
              value={companyPrivacy.disableSearchEngineIndexing}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
