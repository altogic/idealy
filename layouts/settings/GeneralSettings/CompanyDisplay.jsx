import { Fragment, useState } from 'react';
import { DISPLAY_COMPANY_ASSETS } from 'constants';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { Listbox, Transition } from '@headlessui/react';
import SectionTitle from '@/components/SectionTitle';
import Label from '@/components/Label';
import { Check } from '@/components/icons';

export default function CompanyFavicon() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const [displaySelected, setDisplaySelected] = useState(
    DISPLAY_COMPANY_ASSETS[company.showCompanyName ? 0 : 1]
  );

  const updateCompanyDisplay = (fieldName, value) => {
    dispatch(
      companyActions.updateCompany({
        company: { _id: company._id, [fieldName]: value },
        role: company.role
      })
    );
  };

  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Company Display"
          sectionDescription="Update your company display assets."
        />
      </div>
      <div>
        <Label label="Display" />
        <Listbox
          value={displaySelected}
          onChange={(selected) => {
            setDisplaySelected(selected);
            updateCompanyDisplay('showCompanyName', selected === 'Show logo & company name');
          }}>
          <div className="relative">
            <Listbox.Button className="relative w-full inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block text-gray-500 text-sm tracking-sm truncate">
                {displaySelected}
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                {DISPLAY_COMPANY_ASSETS.map((item) => (
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
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {item}
                        </span>
                        {selected ? (
                          <span className="flex items-center pl-3 text-indigo-700">
                            <Check className="w-5 h-5" />
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
    </>
  );
}
