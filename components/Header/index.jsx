import cn from 'classnames';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { generateUrl } from '../../utils';
import CompanyAvatar from '../CompanyAvatar';
import ThemeChanger from '../ThemeChanger';
import GuestDropdown from './GuestDropdown';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';
import Notifications from './Notifications';
import UserDropdown from './UserDropdown';

export default function Header() {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const companies = useSelector((state) => state.company.companies);
  const selectedCompany = useSelector((state) => state.company.company);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCompanies, setUserCompanies] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(isAuthenticated);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (companies?.length > 0 && selectedCompany) {
      if (!selectedCompany?.role) {
        setUserCompanies(companies);
      } else {
        setUserCompanies([
          selectedCompany,
          ...companies.filter((company) => company._id !== selectedCompany._id)
        ]);
      }
    }
  }, [companies, selectedCompany]);

  return (
    <header
      className={cn(
        `fixed top-0 left-0 flex items-center justify-between w-full bg-indigo-900 dark:bg-aa-900 purple:bg-pt-1000 border-b dark:border-aa-600 purple:border-pt-800 p-4 lg:py-6 lg:px-12 z-[51]`,
        router.asPath.includes('settings') ? 'pl-16' : null
      )}>
      <div className="flex items-center">
        <MobileMenu />
        {selectedCompany?.name && (
          <Link href="/">
            <a
              className="inline-flex items-center gap-4 flex-shrink-0 mr-6"
              title={selectedCompany?.name}>
              <CompanyAvatar
                logoUrl={selectedCompany?.logoUrl}
                name={selectedCompany?.name}
                className="w-11 h-11 text-xl"
              />
              {selectedCompany?.showCompanyName && (
                <span className="hidden md:block text-white font-medium tracking-sm truncate max-w-[100px]">
                  {selectedCompany?.name}
                </span>
              )}
            </a>
          </Link>
        )}

        <Navbar />
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden lg:block">
          {selectedCompany?.role &&
            selectedCompany?.role !== 'Guest' &&
            (router.asPath.includes('dashboard') || router.asPath.includes('public-view')) && (
              <div>
                {router.asPath.includes('dashboard') ? (
                  <div className="flex items-center justify-center rounded-md transition bg-indigo-700 dark:bg-aa-600 purple:bg-pt-900 hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900">
                    <Link href="/public-view">
                      <a className="inline-flex items-center justify-center text-white px-3 py-2.5 text-sm tracking-sm">
                        Public View
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-center rounded-md transition bg-indigo-700 dark:bg-aa-600 purple:bg-pt-900 hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900">
                    <Link href="/dashboard">
                      <a className="inline-flex items-center justify-center text-white px-3 py-2.5 text-sm tracking-sm">
                        Admin View
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            )}
        </div>
        {process.env.NODE_ENV === 'development' && <ThemeChanger />}
        {isLoggedIn ? (
          <>
            <Notifications />
            <UserDropdown companies={userCompanies} />
          </>
        ) : !_.isEmpty(guestInfo) ? (
          <GuestDropdown />
        ) : (
          <ul className="flex items-center gap-4">
            <li>
              <Link href={generateUrl('login')}>
                <a className="inline-flex text-indigo-50 text-sm tracking-sm">Login</a>
              </Link>
            </li>
            <li>
              <Link href={generateUrl('register')}>
                <a className="inline-flex text-indigo-400 text-sm tracking-sm">Signup</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
