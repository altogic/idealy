import React, { useState, Fragment, useEffect } from 'react';
import { Email } from '@/components/icons';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { Listbox, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ROLE } from 'constants';

export default function InviteMemberForm() {
  const [roleSelected, setRoleSelected] = useState(ROLE[0]);
  const inviteSchema = new yup.ObjectSchema({
    email: yup.string().email().required('Email is required'),
    role: yup.string().required('Role is required')
  });
  const {
    register,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(inviteSchema),
    defaultValues: {
      role: roleSelected.name
    },
    mode: 'onBlur'
  });

  useEffect(() => {
    setValue('role', roleSelected.name);
  }, [roleSelected, setValue]);

  return (
    <form className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Label label="Email address" htmlFor="emailAddress" />
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="you@domain.com"
            register={register('email')}
            error={errors.email}
            icon={<Email className="w-5 h-5 text-slate-500" />}
          />
          <Input
            type="text"
            name="role"
            id="role"
            placeholder="you@domain.com"
            register={register('role')}
            error={errors.role}
            className="hidden"
          />
        </div>
        <div>
          <Label label="Role" />
          <Listbox value={roleSelected} onChange={setRoleSelected}>
            <div className="relative">
              <Listbox.Button className="relative w-[150px] inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block text-gray-500 text-sm tracking-sm truncate">
                  {roleSelected.name}
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
                <Listbox.Options className="absolute mt-1 w-[150px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[9999]">
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
      </div>
    </form>
  );
}
