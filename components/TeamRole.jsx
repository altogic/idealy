import { Fragment, useState, useEffect } from 'react';
import cn from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { ROLE } from 'constants';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { realtime } from '@/utils/altogic';
import { notificationActions } from '@/redux/notification/notificationSlice';
import Button from './Button';
import DeleteModal from './DeleteModal';
import { Danger, Trash, CircleUser, ChevronDown } from './icons';
import Avatar from './Avatar';

export default function TeamRole({ avatar, name, email, status, role, isRegistered, id, userId }) {
  const [isDelete, setIsDelete] = useState(false);
  const [selected, setSelected] = useState(role);
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleDelete = () => {
    setIsDelete(!isDelete);
    if (isRegistered) {
      dispatch(companyActions.deleteCompanyMember({ userId, email, companyId: company._id }));
      if (status !== 'Declined') {
        realtime.send(userId, 'delete-membership', {
          companyId: company._id,
          userId,
          companyName: company.name,
          name,
          id,
          isRegistered
        });
        dispatch(
          notificationActions.sendNotification({
            user: userId,
            companyId: company._id,
            message: `You have been removed from <b>${company?.name}</b>`
          })
        );
      }
    } else {
      dispatch(
        companyActions.deleteUnregisteredMember({ id, email: name, companyId: company._id })
      );
    }
    realtime.send(company._id, 'delete-member', {
      companyId: company._id,
      userId,
      isRegistered,
      id,
      name
    });
    realtime.send(company._id, 'update-member', {
      type: 'update-member',
      role,
      id,
      companyId: company._id,
      isRegistered,
      userId,
      companyName: company.name
    });
  };
  const handleRoleChange = (role) => {
    setSelected(role);
    if (isRegistered) {
      dispatch(
        companyActions.updateCompanyMemberRole({
          id,
          email,
          role,
          isRegistered,
          companyId: company._id
        })
      );
      realtime.send(userId, 'update-role', {
        type: 'update-role',
        role,
        id,
        companyId: company._id
      });
    } else {
      dispatch(
        companyActions.updateCompanyMemberRole({
          id,
          role,
          email: name,
          isRegistered,
          companyId: company._id
        })
      );
    }

    realtime.send(company._id, 'update-member', {
      type: 'update-member',
      role,
      id,
      companyId: company._id,
      isRegistered,
      userId,
      companyName: company.name
    });
    dispatch(
      notificationActions.sendNotification({
        user: userId,
        companyId: company._id,
        message: `Your role has been changed to <b>${role}</b> in <b>${company?.name}</b>`
      })
    );
    realtime.send(userId, 'notification', {
      userId,
      companyId: company._id,
      message: `Your role has been changed to <b>${role}</b> in <b>${company?.name}</b>`
    });
  };
  useEffect(() => {
    if (role) {
      setSelected(role);
    }
  }, [role]);

  return (
    <>
      <div className="group flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-aa-900 purple:bg-pt-1000 p-4 transition hover:bg-slate-50 dark:hover:bg-aa-700 purple:hover:bg-pt-800">
        <div className="flex items-center gap-3 max-w-[250px] w-full">
          {isRegistered ? (
            <Avatar
              className="flex-shrink-0 w-[50px] h-[50px] rounded-full"
              src={avatar}
              alt={name}
            />
          ) : (
            <CircleUser className="flex-shrink-0 w-[50px] h-[50px] rounded-full text-slate-400" />
          )}
          <div className={cn(email ? 'space-y-1' : null)}>
            <h6
              className="max-w-[188px] text-slate-700 dark:text-aa-100 purple:text-pt-100 text-base font-medium tracking-sm truncate"
              title={name}>
              {name}
            </h6>
            {email && (
              <p
                className="max-w-[188px] text-slate-400 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm truncate"
                title={email}>
                {email}
              </p>
            )}
          </div>
        </div>
        {status && (
          <div className="text-slate-400 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm lg:text-center">
            {status}
          </div>
        )}
        <div className="flex items-center gap-4">
          <Listbox
            value={selected}
            onChange={(selected) => handleRoleChange(selected.name)}
            disabled={company?.role !== 'Owner' && role === company?.role}>
            <div className="relative w-full">
              <Listbox.Button className="relative inline-flex items-center justify-between w-full lg:w-[150px] bg-white dark:bg-aa-800 purple:bg-pt-800 py-3.5 px-[14px] border border-slate-300 dark:border-aa-600 purple:border-pt-800 rounded-lg cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                <span className="block text-gray-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate">
                  {selected}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-aa-200 purple:text-pt-200" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options className="absolute mt-1 max-h-60 w-full lg:w-[150px] overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg focus:outline-none sm:text-sm z-50">
                  {ROLE.map((item) => (
                    <Listbox.Option
                      key={item}
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
          {(email !== user?.email && role !== company?.role) || company?.role === 'Owner' ? (
            <div className="flex items-center justify-center">
              <Button
                type="button"
                icon={
                  <Trash className="w-5 h-5 text-slate-500 dark:text-aa-400 purple:text-pt-400 transition hover:text-red-500 dark:hover:text-red-500 purple:hover:text-red-500" />
                }
                variant="icon"
                onClick={() => setIsDelete(!isDelete)}
              />
              {status !== 'Active' && (
                <Button
                  type="button"
                  variant="blank"
                  text="Resend"
                  className="text-sm text-slate-500 dark:text-aa-400 purple:text-pt-400 transition hover:text-indigo-500 dark:hover:text-indigo-500 purple:hover:text-indigo-500"
                  onClick={() =>
                    dispatch(companyActions.resendInvite({ email, companyId: company._id }))
                  }
                />
              )}
            </div>
          ) : (
            <span className="w-5 h-5 py-2.5 px-4" />
          )}
        </div>
      </div>
      {/* Delete Modal */}
      <DeleteModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        deleteOnClick={handleDelete}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete team member"
        description="Are you sure you want to delete this team member? This action cannot be undone."
      />
    </>
  );
}
