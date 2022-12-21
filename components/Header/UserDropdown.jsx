import { CircleCheck, Logout, People, Plus, Settings, Switch } from '@/components/icons';
import { authActions } from '@/redux/auth/authSlice';
import { generateUrl } from '@/utils/index';
import { Menu, Transition } from '@headlessui/react';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar';
import CompanyAvatar from '../CompanyAvatar';

export default function UserDropdown({ companies }) {
  const dispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState();
  const handleLogout = () => {
    dispatch(
      authActions.logout({
        onSuccess: () => {
          deleteCookie('invitation-token');
          Router.push(generateUrl('login'));
        }
      })
    );
  };
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (companies?.length) {
      setSelectedCompany(companies[0]);
    }
  }, [companies]);

  return (
    <Menu as="div" className="relative inline-block w-11 h-11 text-left">
      <Menu.Button className="inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <Avatar src={user?.profilePicture} alt={user?.name} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="flex flex-col absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-100 focus:outline-none z-50">
          <Menu.Item>
            <div className="flex items-center w-full px-4 border-b border-gray-200">
              <span className="inline-block">
                <Avatar src={user?.profilePicture} alt={user?.name} />
              </span>
              <div className="inline-flex flex-col items-start px-4 py-3">
                <span className="text-slate-400 text-xs tracking-sm">Signed in as</span>
                <span className="text-slate-700 text-sm font-medium tracking-sm ">
                  {user?.name}
                </span>
                <span className="text-slate-400 text-xs tracking-sm">
                  {selectedCompany?.role ? `${selectedCompany?.role}` : 'Owner'}
                </span>
              </div>
            </div>
          </Menu.Item>
          <div className="flex flex-col divide-y divide-gray-200">
            {selectedCompany?.role !== 'Moderator' && (
              <Menu.Button onClick={() => Router.push('/settings?tab=general%20settings')}>
                <span className="inline-flex items-start gap-3 text-slate-500 p-4 text-sm w-full hover:bg-slate-50">
                  <Settings className="w-4 h-4" />
                  Settings
                </span>
              </Menu.Button>
            )}
            <Menu.Button onClick={() => Router.push('/settings?tab=profile')}>
              <span className="inline-flex items-start gap-3 text-slate-500 p-4 text-sm w-full hover:bg-slate-50">
                <People className="w-4 h-4" />
                Profile
              </span>
            </Menu.Button>
            <div className="flex flex-col items-start">
              {companies?.slice(0, 3).map((company) => (
                <Menu.Button
                  className="w-full text-left"
                  key={company._id}
                  onClick={() => {
                    Router.push(generateUrl('dashboard', company.subdomain));
                  }}>
                  <span
                    className="flex items-center justify-between gap-3 text-slate-500 p-4 text-sm
                      hover:bg-slate-50">
                    <div className="inline-flex items-center gap-3">
                      <CompanyAvatar
                        logoUrl={company.logoUrl}
                        name={company.name}
                        className="text-xs"
                        size="w-6 h-6"
                      />
                      {company.name}
                    </div>
                    {company._id === selectedCompany?._id && (
                      <CircleCheck className="w-5 h-5 text-green-700" />
                    )}
                  </span>
                </Menu.Button>
              ))}

              {companies?.length > 3 && (
                <Menu.Item>
                  <Link href={generateUrl('select-company')}>
                    <a className="inline-flex items-center gap-3 w-full text-slate-500 px-4 py-2.5 text-sm hover:bg-slate-50">
                      <Switch className="w-4 h-4" />
                      Select Company
                    </a>
                  </Link>
                </Menu.Item>
              )}
              {user?.canCreateCompany && (
                <Menu.Item>
                  <Link href={generateUrl('create-new-company')}>
                    <a className="inline-flex items-center gap-3 w-full text-slate-500 px-4 py-2.5 text-sm hover:bg-slate-50">
                      <Plus className="w-4 h-4" />
                      Create a company
                    </a>
                  </Link>
                </Menu.Item>
              )}
            </div>
            <Menu.Item>
              <button
                type="button"
                className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-slate-50"
                onClick={handleLogout}>
                <Logout className="w-4 h-4" />
                Log out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
