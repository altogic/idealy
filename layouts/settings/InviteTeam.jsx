import React, { Fragment, useState, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import TeamRole from '@/components/TeamRole';
import { Email, TwoPeople, PlusPeople, Close } from '@/components/icons';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { Listbox, Transition, Dialog } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ROLE } from 'constants';
import EmptyState from '@/components/EmptyState';
import { realtime } from '@/utils/altogic';

export default function InviteTeam() {
  const dispatch = useDispatch();

  const [roleSelected, setRoleSelected] = useState(ROLE[0]);
  const [isInvite, setIsInvite] = useState(false);

  const company = useSelector((state) => state.company.company);
  const companyMembers = useSelector((state) => state.company.companyMembers);
  const loading = useSelector((state) => state.company.isLoading);
  const unregisteredCompanyMembers = useSelector(
    (state) => state.company.unregisteredCompanyMembers
  );
  const getCompanyMembersLoading = useSelector((state) => state.company.getCompanyMembersLoading);

  const inviteSchema = new yup.ObjectSchema({
    email: yup.string().email().required('Email is required')
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError
  } = useForm({
    resolver: yupResolver(inviteSchema),
    mode: 'onBlur'
  });
  async function formSubmit(data) {
    dispatch(
      companyActions.inviteTeamMember({
        ...data,
        role: roleSelected.name,
        companyId: company._id,
        companyName: company.name,
        canCreateCompany: company.whiteLabel.canCreateCompany,
        companySubdomain: company.subdomain,
        onSuccess: (userId) => {
          setIsInvite(false);
          setRoleSelected(ROLE[0]);
          if (userId) {
            realtime.send(userId, 'new-invitation', {
              role: roleSelected.name,
              userId,
              company
            });
          }
        },
        onError: (error) => {
          setError('email', { type: 'manuel', message: error.message });
        }
      })
    );
  }
  const handleCloseDialog = () => {
    setIsInvite(!isInvite);
    setRoleSelected(ROLE[0]);
  };
  useEffect(() => {
    if (company) {
      dispatch(companyActions.getCompanyMembers(company));
    }
  }, [company]);
  useEffect(() => {
    if (!isInvite) {
      reset();
    }
  }, [isInvite]);

  const setRoleDescription = (value) => {
    switch (value.name) {
      case 'Owner':
        return (
          <>Can do anything including delete company and change billing information, invoices.</>
        );
      case 'Admin':
        return (
          <>
            Can add new team members and update company information and moderate ideas, roadmap and
            announcements
          </>
        );
      case 'Moderator':
        return <>Can only moderate ideas, roadmap and announcements</>;
      default:
        return 'Users can sign up and sign in using their email address.';
    }
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:gap-4 pb-4 mb-10 lg:mb-11 lg:border-b lg:border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <div className="pb-4 mb-10 lg:pb-0 lg:mb-0 border-b border-slate-200 lg:border-0">
          <SectionTitle
            sectionTitle="Invite Team"
            sectionDescription="Add members to your company to help manage ideas."
            big
          />
        </div>
        <div>
          <div className="hidden lg:block">
            <Button
              type="button"
              text="Invite team"
              icon={<TwoPeople className="w-5 h-5" />}
              variant="indigo"
              size="base"
              onClick={() => setIsInvite(!isInvite)}
            />
          </div>
          <div className="lg:hidden">
            <Button
              type="button"
              text="Invite team"
              icon={<TwoPeople className="w-5 h-5" />}
              variant="indigo"
              size="base"
              fullWidth
              onClick={() => setIsInvite(!isInvite)}
            />
          </div>
          <Transition appear show={isInvite} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => handleCloseDialog()}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                    <Dialog.Panel className="w-full max-w-[620px] transform rounded-2xl bg-white dark:bg-aa-900 purple:bg-pt-1000 p-6 text-left align-middle shadow-xl transition-all">
                      <div>
                        <div className="absolute top-8 right-8">
                          <Button
                            variant="icon"
                            icon={
                              <Close className="w-6 h-6 text-slate-500 dark:text-aa-400 purple:text-pt-400" />
                            }
                            onClick={handleCloseDialog}
                          />
                        </div>
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-aa-300 purple:bg-pt-300 mb-8 ring-8 ring-indigo-50 dark:ring-aa-200 purple:ring-pt-200">
                          <PlusPeople className="w-7 h-7 text-indigo-600 dark:text-aa-600 purple:text-pt-600" />
                        </span>
                        <div className="mb-5">
                          <h2 className="text-slate-900 dark:text-aa-200 purple:text-pt-200 mb-2 text-lg font-medium tracking-sm">
                            Invite admins to {company.name}
                          </h2>
                          <p className="text-slate-500 dark:text-aa-400 purple:text-pt-400 text-sm tracking-sm">
                            Invite a new team member to your company
                          </p>
                        </div>
                        <form onSubmit={handleSubmit(formSubmit)}>
                          <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <div className="flex-1 md:max-h-[4.5rem]">
                              <Label label="Email address" />
                              <Input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="you@domain.com"
                                register={register('email')}
                                error={errors.email}
                                icon={
                                  <Email className="w-5 h-5 text-gray-500 dark:text-aa-100 purple:text-pt-100" />
                                }
                              />
                            </div>
                            <div>
                              <Label label="Role" />
                              <Listbox value={roleSelected} onChange={setRoleSelected}>
                                <div className="relative">
                                  <Listbox.Button className="flex items-center relative w-full md:w-[150px] h-11 bg-white dark:bg-aa-800 purple:bg-pt-800 py-3 px-[14px] border border-slate-300 dark:border-aa-600 purple:border-pt-800 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block text-gray-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate">
                                      {roleSelected.name}
                                    </span>
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
                                    <Listbox.Options className="absolute mt-1 w-full md:w-[150px] overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg focus:outline-none sm:text-sm z-[9999]">
                                      {ROLE.map((item) => (
                                        <Listbox.Option
                                          key={item.id}
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
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? 'text-slate-900 dark:text-aa-100 purple:text-pt-100'
                                                    : 'font-normal'
                                                }`}>
                                                {item.name}
                                              </span>
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
                          <div className="flex items-center min-h-[60px] bg-slate-100 dark:bg-aa-600 purple:bg-pt-800 text-slate-500 dark:text-aa-100 purple:text-pt-100 my-8 py-2 px-4 text-sm tracking-sm rounded-lg">
                            {setRoleDescription(roleSelected)}
                          </div>
                          {/* <div className="text-indigo-700">
                            <Button
                              type="button"
                              text="Add another"
                              variant="icon"
                              icon={<Plus className="w-5 h-5 text-indigo-700" />}
                            />
                          </div> */}
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              text="Cancel"
                              variant="blank"
                              height="44"
                              onClick={() => handleCloseDialog()}
                            />
                            <Button
                              type="submit"
                              text="Send Invite"
                              variant="indigo"
                              height="44"
                              loading={loading}
                            />
                          </div>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
      {getCompanyMembersLoading ? (
        <div role="status" className="w-full space-y-4 divide-y divide-gray-400 animate-pulse">
          <div className="flex justify-between items-center">
            <div>
              <div className="h-2.5 bg-gray-400 rounded-full w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-300 rounded-full" />
            </div>
            <div className="h-2.5 bg-gray-400 rounded-full w-12" />
          </div>
          <div className="flex justify-between items-center pt-4">
            <div>
              <div className="h-2.5 bg-gray-400 rounded-full w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-300 rounded-full" />
            </div>
            <div className="h-2.5 bg-gray-400 rounded-full w-12" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between pl-4 pr-[7rem] pb-4 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
            <span className="text-slate-800 dark:text-aa-100 purple:text-pt-100">Admins</span>
            <span className="hidden lg:inline-block text-slate-800 dark:text-aa-100 purple:text-pt-100">
              Role
            </span>
          </div>
          <div className="divide-y divide-slate-200">
            {companyMembers?.length > 0 || unregisteredCompanyMembers?.length > 0 ? (
              <div>
                {companyMembers.map((item) => (
                  <div key={item._id} className="py-4 first:pt-0">
                    <TeamRole
                      avatar={item.user.profilePicture}
                      name={item.user.name}
                      email={item.user.email}
                      status={item.status}
                      role={item.role}
                      id={item._id}
                      userId={item.user._id}
                      isRegistered
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No data found"
                description="You dot not have any team members yet. Click/tap on 'Invite team' to add a new member to your company."
              />
            )}
          </div>

          {unregisteredCompanyMembers?.map((item) => (
            <div key={item._id} className="py-4 first:pt-0">
              <TeamRole name={item.email} status="Pending" role={item.role} id={item._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
