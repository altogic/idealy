import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ROLE } from 'constants';
import InfoModal from './InfoModal';
import Button from './Button';
import { Danger } from './icons';

function InfoCard({ title, description }) {
  return (
    <div className="text-sm font-medium tracking-sm">
      <h6 className="text-slate-400 mb-1">{title}</h6>
      <p className="text-slate-800">{description}</p>
    </div>
  );
}

export default function UserDetail() {
  const [selected, setSelected] = useState(ROLE[0]);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <div>
        <div className="space-y-4">
          <h2 className="text-slate-800 text-base font-semibold tracking-sm">User Detail</h2>
          <div>
            <span className="inline-block text-slate-900 mb-1.5">Role</span>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative">
                <Listbox.Button className="relative w-full inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block text-gray-500 text-sm tracking-sm truncate">
                    {selected.name}
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
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {ROLE.map((item) => (
                      <Listbox.Option
                        key={item.id}
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
                              {item.name}
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
          <InfoCard title="Account Created" description="Unknown" />
          <InfoCard title="Email" description="sayhi@hithemes.io" />
          <InfoCard title="Post" description="12345" />
          <InfoCard title="Comments" description="1234567" />
          <InfoCard title="Votes" description="234132423" />
          <InfoCard title="User ID" description="1" />
          <InfoCard title="Last Activity" description="A week ago" />
          <InfoCard title="Browser" description="Chrome" />
          <InfoCard title="OS" description="OS X 10.15.4 65-bit" />
          <hr className="border-slate-200" />
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              text="Delete & Ban User"
              variant="blank"
              size="sm"
              onClick={() => setIsDelete(!isDelete)}
            />
            <Button
              type="button"
              text="Delete User"
              variant="indigo"
              size="sm"
              onClick={() => setIsDelete(!isDelete)}
            />
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      <InfoModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        onConfirm={() => setIsDelete(!isDelete)}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        confirmColor="red"
        canCancel
      />
    </>
  );
}
