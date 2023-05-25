import { notificationActions } from '@/redux/notification/notificationSlice';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Indicator from '@/components/Indicator';
import InfiniteScroll from '@/components/InfiniteScroll';
import { Notification, Settings, Email } from '@/components/icons';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import InfoModal from '@/components/InfoModal';
import NotificationItem from './NotificationItem';

export default function Notifications() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const selectedCompany = useSelector((state) => state.company.company);
  const isGuest = useSelector((state) => state.company.isGuest);
  const notifications = useSelector((state) => state.notification.notifications);
  const countInfo = useSelector((state) => state.notification.countInfo);
  const ideas = useSelector((state) => state.idea.ideas);
  const feedBackDetailModal = useSelector((state) => state.general.feedbackDetailModal);
  const unreadNotificationCount = useSelector(
    (state) => state.notification.unreadNotificationCount
  );
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const showFeedbackDetail = (feedbackId) => {
    const ideaDetail = ideas.find((i) => i._id === feedbackId);
    console.log('ideaDetail', ideaDetail);
    if (ideaDetail) {
      dispatch(ideaActions.setSelectedIdea(ideaDetail));
      dispatch(toggleFeedBackDetailModal());
    } else {
      dispatch(
        ideaActions.getIdeaById({
          filter: [
            `this._id == '${feedbackId}' &&  this.isMerged == false`,
            isGuest &&
              'this.isApproved == true && this.isArchived == false && this.isPrivate == false && this.isCompleted == false && this.isDeleted == false '
          ]
            .filter(Boolean)
            .join(' && '),
          onSuccess: () => {
            if (!feedBackDetailModal) dispatch(toggleFeedBackDetailModal());
          },
          onError: () => {
            setOpenInfoModal(true);
          }
        })
      );
    }
  };
  return (
    <Menu as="div" className="relative">
      {({ open: internalOpen }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(
          () => () => {
            if (internalOpen && notifications.length > 0) {
              dispatch(
                notificationActions.markNotificationAsRead({
                  userId: user._id,
                  companyId: selectedCompany._id
                })
              );
            }
          },
          [internalOpen]
        );

        return (
          <>
            <Menu.Button className="relative inline-flex items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none">
              <Notification className="w-5 h-5 icon-slate" />
              {!!unreadNotificationCount && (
                <Indicator
                  count={unreadNotificationCount}
                  className="absolute top-[1px] right-[1px]"
                />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="origin-top-right fixed lg:absolute top-20 lg:top-12 right-0 w-full lg:w-[400px] rounded-lg shadow-xl bg-white dark:bg-aa-700 purple:bg-pt-900 focus:outline-none z-50">
                <div>
                  <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
                    <h6 className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-base font-semibold tracking-md">
                      Notification
                    </h6>
                    <button
                      type="button"
                      onClick={() => router.push('/settings?tab=notifications')}>
                      <Settings className="w-6 h-6 icon" />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-200 dark:divide-aa-600 purple:divide-pt-600 overflow-auto max-h-[500px]">
                    <InfiniteScroll
                      items={notifications}
                      countInfo={countInfo}
                      endOfList={() =>
                        notificationActions.getNotifications({
                          userId: user?._id,
                          companyId: selectedCompany?._id,
                          limit: 50,
                          page: countInfo.currentPage + 1,
                          isMember: selectedCompany.role && selectedCompany?.role !== 'Guest'
                        })
                      }>
                      {notifications?.length ? (
                        notifications?.map((notification) => (
                          <NotificationItem
                            key={notification._id}
                            notification={notification}
                            dropdown
                            onClick={() => {
                              console.log(notification);
                              if (notification.ideaId) showFeedbackDetail(notification.ideaId);
                              else router.push(notification.url);
                            }}
                          />
                        ))
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm tracking-md">
                            You have no notifications yet.
                          </p>
                        </div>
                      )}
                    </InfiniteScroll>
                  </div>
                  {!!notifications.length && (
                    <div className="p-4 flex items-center justify-center border-t border-slate-200 dark:border-aa-600 purple:border-pt-800">
                      <Link href="/settings?tab=notifications&section=list">
                        <a className="flex items-center text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm tracking-md hover:underline">
                          See all notifications
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </Menu.Items>
            </Transition>
            <InfoModal
              show={openInfoModal}
              cancelOnClick={() => {
                setOpenInfoModal(false);
              }}
              onClose={() => setOpenInfoModal(false)}
              icon={<Email className="w-6 h-6 icon-indigo" />}
              title="The idea you are trying to access is private or does not exist"
              onConfirm={() => {
                setOpenInfoModal(false);
              }}
              confirmColor="indigo"
              confirmText="OK"
            />
          </>
        );
      }}
    </Menu>
  );
}
