import { Fragment, useState, useEffect } from 'react';
import cn from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { ROLE } from 'constants';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import realtimeService from '@/utils/realtime';
import Button from './Button';
import DeleteModal from './DeleteModal';
import { Danger, Trash, CircleUser, ChevronDown } from './icons';
import Avatar from './Avatar';

export default function TeamRole({ avatar, name, email, status, role, isRegistered, id, userId }) {
  const [isDelete, setIsDelete] = useState(false);
  const [selected, setSelected] = useState();
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleDelete = () => {
    setIsDelete(!isDelete);
    if (isRegistered) {
      dispatch(companyActions.deleteCompanyMember({ userId, email, companyId: company._id }));

      realtimeService.sendMessage(userId, 'user-message', {
        type: 'delete-member',
        companyId: company._id,
        userId
      });
      realtimeService.sendMessage(company._id, 'company-message', {
        type: 'delete-member',
        companyId: company._id,
        userId
      });
    } else {
      dispatch(companyActions.deleteUnregisteredMember({ id, email: name }));
    }
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
    realtimeService.sendMessage(userId, 'user-message', {
      type: 'update-role',
      role,
      id,
      companyId: company._id
    });
    realtimeService.sendMessage(company._id, 'company-message', {
      type: 'update-member',
      role,
      id,
      companyId: company._id
    });
  };
  useEffect(() => {
    if (role) {
      setSelected(role);
    }
  }, [role]);

  return (
    <>
      <div className="group flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 transition hover:bg-slate-50">
        <div className="flex items-center gap-3">
          {isRegistered ? (
            <Avatar className="w-[50px] h-[50px] rounded-full" src={avatar} alt={name} />
          ) : (
            <CircleUser className="w-[50px] h-[50px] rounded-full text-slate-400" />
          )}
          <div className={cn(email ? 'space-y-1' : null)}>
            <h6 className="text-slate-700 text-base font-medium tracking-sm whitespace-nowrap">
              {name}
            </h6>
            {email && (
              <p className="text-slate-400 text-sm tracking-sm whitespace-nowrap">{email}</p>
            )}
          </div>
        </div>
        {status && (
          <div className="text-slate-400 text-sm tracking-sm lg:text-center">{status}</div>
        )}
        <div className="flex items-center gap-4">
          <Listbox
            value={selected}
            onChange={(selected) => handleRoleChange(selected.name)}
            disabled={company?.role !== 'Owner' && role === company?.role}>
            <div className="relative w-full">
              <Listbox.Button className="relative inline-flex items-center justify-between w-full lg:w-[150px] bg-white py-3.5 px-[14px] border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                <span className="block text-slate-500 text-sm tracking-sm truncate">
                  {selected}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options className="absolute mt-1 max-h-60 w-full lg:w-[150px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                  {ROLE.map((item) => (
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
          {(email !== user?.email && role !== company?.role) || company?.role === 'Owner' ? (
            <Button
              type="button"
              icon={<Trash className="w-5 h-5 text-slate-500 transition hover:text-red-500" />}
              variant="icon"
              onClick={() => setIsDelete(!isDelete)}
            />
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
