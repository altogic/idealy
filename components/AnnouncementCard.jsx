import SanitizeHtml from '@/components/SanitizeHtml';
import StatusBadge from '@/components/StatusBadge';
import { ChevronLeft, Danger, Pen, Trash } from '@/components/icons';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isGreaterThan } from '../utils';
import AnnouncementReaction from './AnnouncementReaction';
import IdeaActionButton from './Idea/admin/IdeaActionButton';
import InfoModal from './InfoModal';

export default function AnnouncementCard({ announcement, onPage }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const canReact = useRegisteredUserValidation('announcementReaction');
  const { company, isGuest } = useSelector((state) => state.company);
  const loading = useSelector((state) => state.announcement?.isLoading);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <>
      <div className="w-full first:px-8 first:pb-8 [&:not(:first-child)]:p-8 odd:bg-white dark:odd:bg-aa-900 odd:purple:bg-pt-1000 even:bg-slate-100 dark:even:bg-aa-800 purple:even:bg-pt-900 group">
        <div className="mx-auto w-8/12 flex gap-8">
          {onPage && (
            <div>
              <Link href="/announcements">
                <a className="flex items-center  mt-4 text-slate-800 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-md text-left">
                  <ChevronLeft className="w-4 h-4" />
                  Back to Announcements
                </a>
              </Link>
            </div>
          )}
          <div className="grow flex flex-col">
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-4">
                <Link href={`/announcements/${announcement?.slug}`}>
                  <a>
                    <h2 className="flex-1 text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold tracking-md text-left lg:truncate">
                      {announcement?.title || 'Untitled'}
                    </h2>
                  </a>
                </Link>
                <h6 className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm font-normal tracking-md text-left">
                  {!announcement?.isPublished && '(Draft)'}
                </h6>
                <h6 className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm font-normal tracking-md text-left">
                  {announcement?.publishDate &&
                    isGreaterThan(announcement?.publishDate, Date.now()) && (
                      <span>
                        Will be published on{' '}
                        {DateTime.fromISO(announcement?.publishDate)
                          .setLocale('en')
                          .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
                      </span>
                    )}
                </h6>
              </div>
            </div>
            <p className="mt-2 mb-8 text-slate-800 dark:text-aa-200 purple:text-pt-200 text-sm font-normal tracking-md text-left">
              {DateTime.fromISO(announcement?.createdAt)
                .setLocale('en')
                .toLocaleString(DateTime.DATE_MED)}
            </p>
            <div className="prose prose-p:text-slate-800 dark:prose-p:text-aa-200 purple:prose-p:text-pt-200 prose-a:text-slate-800 dark:prose-a:text-aa-400 purple:prose-a:text-pt-400 prose-strong:text-slate-900 dark:prose-strong:text-aa-500 purple:prose-strong:text-pt-600 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full mb-4">
              <SanitizeHtml id="idea-detail" html={announcement?.content} />
            </div>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div className="flex">
              {!!announcement?.categories?.length && (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-2 ml-auto max-w-md">
                    {company.categories
                      .filter((category) => announcement?.categories.includes(category._id))
                      .map((cat) => (
                        <StatusBadge key={cat._id} name={cat?.name} color={cat?.color} />
                      ))}
                  </div>
                  <svg
                    className="h-1.5 w-1.5 text-slate-500 dark:text-aa-400 purple:text-pt-400 invisible group-hover:visible"
                    fill="currentColor"
                    viewBox="0 0 8 8">
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                </>
              )}
              {!isGuest && (
                <div className="flex invisible items-center group-hover:visible ">
                  <IdeaActionButton
                    type="Edit"
                    color="blue"
                    Icon={Pen}
                    onClick={() => {
                      dispatch(announcementActions.setAnnouncement(announcement));
                      router.push(`/announcements/edit/${announcement?.slug}`);
                    }}
                  />
                  <IdeaActionButton
                    type="delete"
                    color="red"
                    Icon={Trash}
                    onClick={() => {
                      dispatch(announcementActions.setAnnouncement(announcement));
                      router.push(`/announcements/edit/${announcement?.slug}`);
                    }}
                  />
                </div>
              )}
            </div>
            {canReact && (
              <AnnouncementReaction
                announcementId={announcement?._id}
                reactionCount={announcement?.reactionCount}
              />
            )}
          </div>
        </div>
      </div>
      <InfoModal
        show={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        cancelOnClick={() => setOpenDeleteModal(false)}
        onConfirm={() => {
          dispatch(
            announcementActions.deleteAnnouncement({
              announcementId: announcement?._id,
              onSuccess: () => setOpenDeleteModal(false)
            })
          );
        }}
        icon={<Danger className="w-7 h-7 text-red-600" />}
        title="Delete Idea"
        description="Are you sure you want to delete this idea? This action cannot be undone."
        confirmText="Delete Idea"
        confirmColor="red"
        canCancel
        loading={loading}
      />
    </>
  );
}
