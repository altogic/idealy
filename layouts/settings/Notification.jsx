import EmptyState from '@/components/EmptyState';
import InfiniteScroll from '@/components/InfiniteScroll';
import NotificationItem from '@/components/NotificationItem';
import SectionTitle from '@/components/SectionTitle';
import { notificationActions } from '@/redux/notification/notificationSlice';
import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationSettings from './NotificationSettings';

export default function Notification() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState();
  const [page, setPage] = useState(1);
  const [countInfo, setCountInfo] = useState({});
  const [notifications, setNotifications] = useState([]);
  const userNotifications = useSelector((state) => state.notification.userNotifications);
  const companyNotifications = useSelector((state) => state.notification.companyNotifications);
  const userCountInfo = useSelector((state) => state.notification.userCountInfo);
  const companyCountInfo = useSelector((state) => state.notification.companyCountInfo);
  const selectedCompany = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const handleTabChange = (tabName) => {
    router.push(`/settings?tab=notifications&section=${tabName}`, undefined, { shallow: true });
  };
  useEffect(() => {
    if (router.query?.section) {
      const index = router.query.section === 'list' ? 0 : 1;
      setTabIndex(index);
    }
  }, [router]);

  useEffect(() => {
    setTabIndex(0);
    router.push('/settings?tab=notifications&section=list', undefined, { shallow: true });
  }, []);

  useEffect(() => {
    if (page) {
      if (user) {
        dispatch(
          notificationActions.getAllUserNotifications({
            userId: user?._id,
            companyId: selectedCompany?._id,
            limit: 10,
            page
          })
        );
      }
      if (selectedCompany && selectedCompany?.role !== 'Guest') {
        dispatch(
          notificationActions.getAllCompanyNotifications({
            companyId: selectedCompany._id,
            limit: 10,
            page
          })
        );
      }
    }
  }, [user, selectedCompany, page]);

  useEffect(() => {
    setNotifications([...userNotifications, ...companyNotifications]);
  }, [userNotifications, companyNotifications]);

  useEffect(() => {
    if (userCountInfo?.pageSize || companyCountInfo?.pageSize) {
      setCountInfo({
        count:
          userCountInfo?.count >= companyCountInfo?.count
            ? userCountInfo?.count
            : companyCountInfo?.count,
        currentPage:
          userCountInfo?.currentPage >= companyCountInfo?.currentPage
            ? userCountInfo?.currentPage
            : companyCountInfo?.currentPage,
        pageSize:
          userCountInfo?.pageSize >= companyCountInfo?.pageSize
            ? userCountInfo?.pageSize
            : companyCountInfo?.pageSize,
        totalPages:
          userCountInfo?.totalPages >= companyCountInfo?.totalPages
            ? userCountInfo?.totalPages
            : companyCountInfo?.totalPages
      });
    }
  }, [userCountInfo, companyCountInfo]);

  useEffect(() => {
    console.log('countInfo', countInfo);
  }, [countInfo]);

  return (
    <>
      {selectedCompany?.name && (
        <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <SectionTitle
            sectionTitle={`${selectedCompany?.name} Notifications`}
            sectionDescription="Keep your inbox under control."
            big
          />
        </div>
      )}
      <Tab.Group selectedIndex={tabIndex}>
        <Tab.List className="lg:flex gap-1 fixed lg:static w-full lg:w-auto pb-10 transform px-2 lg:px-6">
          <Tab
            className={({ selected }) =>
              cn(
                'px-4 py-3 text-sm font-medium tracking-sm border-2 rounded-md text-left focus:outline-none w-1/2 hover:bg-slate-50 dark:hover:bg-aa-600 purple:hover:bg-pt-600 hover:border-indigo-400 dark:hover:border-aa-500 purple:hover:border-pt-500',
                selected
                  ? 'bg-slate-50 dark:bg-aa-600 purple:bg-pt-600 text-slate-700 dark:text-aa-100 purple:text-pt-100 border-indigo-700 dark:border-aa-600 purple:border-pt-800'
                  : 'text-slate-500 dark:text-aa-200 purple:text-pt-200 border-transparent'
              )
            }
            onClick={() => {
              handleTabChange('list');
            }}>
            Notifications
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                'px-4 py-3 text-sm font-medium tracking-sm border-2 rounded-md text-left focus:outline-none w-1/2 hover:bg-slate-50 dark:hover:bg-aa-600 purple:hover:bg-pt-600 hover:border-indigo-400 dark:hover:border-aa-500 purple:hover:border-pt-500',
                selected
                  ? 'bg-slate-50 dark:bg-aa-600 purple:bg-pt-600 text-slate-700 dark:text-aa-100 purple:text-pt-100 border-indigo-700 dark:border-aa-600 purple:border-pt-800'
                  : 'text-slate-500 dark:text-aa-200 purple:text-pt-200 border-transparent'
              )
            }
            onClick={() => {
              handleTabChange('settings');
            }}>
            Settings
          </Tab>
        </Tab.List>
        <Tab.Panels className="pt-5 pb-14 lg:p-5 xl:px-10 xl:py-8">
          <Tab.Panel>
            <InfiniteScroll
              countInfo={countInfo}
              items={notifications}
              endOfList={() => {
                setPage(page + 1);
                console.log('load more');
              }}>
              {notifications?.length > 0 ? (
                notifications?.map((notification) => (
                  <NotificationItem
                    key={notification._id}
                    notification={notification}
                    showCompany
                  />
                ))
              ) : (
                <EmptyState
                  title="No notifications"
                  description="You don't have any notifications yet."
                />
              )}
            </InfiniteScroll>
          </Tab.Panel>
          <Tab.Panel>
            <NotificationSettings />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
