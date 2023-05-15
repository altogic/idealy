import SanitizeHtml from '@/components/SanitizeHtml';
import StatusBadge from '@/components/StatusBadge';
import { ChevronLeft, Danger, Pen, Trash } from '@/components/icons';
import useClickAnnouncementIdea from '@/hooks/useClickAnnouncementIdea';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateUrl, isGreaterThan } from '@/utils/index';
import AnnouncementReaction from '@/components/Announcement/AnnouncementReaction';
import IdeaActionButton from '@/components/Idea/admin/IdeaActionButton';
import InfoModal from '@/components/InfoModal';
import ShareButtons from '@/components/ShareButtons';

export default function AnnouncementCard({ announcement, onPage }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const canReact = useRegisteredUserValidation('announcementReaction');
  const { company, isGuest } = useSelector((state) => state.company);

  const loading = useSelector((state) => state.announcement?.isLoading);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  useClickAnnouncementIdea(announcement);
  console.log({
    query: canReact && !company.disableAnnouncementReactions,
    canReact,
    company: company.miscellaneous.disableAnnouncementReactions
  });
  return (
    <>
      <div className="w-full odd:bg-white dark:odd:bg-aa-900 odd:purple:bg-pt-1000 even:bg-slate-100 dark:even:bg-aa-800 purple:even:bg-pt-900">
        {onPage && (
          <div>
            <Link href="/announcements">
              <a className="flex items-center  mt-4 text-slate-800 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-md text-left whitespace-nowrap">
                <ChevronLeft className="w-4 h-4 icon" />
                Back to Announcements
              </a>
            </Link>
          </div>
        )}
        <div className="grow flex flex-col">
          <div className="flex justify-between items-center gap-2 divide-x divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
            <button
              type="button"
              onClick={() => {
                router.push(`/announcements/${announcement?._id}`);
                dispatch(announcementActions.setAnnouncement(announcement));
              }}
              className="flex-1">
              <h2 className="flex-1 text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold tracking-md text-left lg:truncate">
                {announcement?.title || 'Untitled'}
              </h2>
            </button>

            {announcement?.publishDate && isGreaterThan(announcement?.publishDate, Date.now()) && (
              <div className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-md text-left">
                Will be published on{' '}
                <span className="text-slate-800 dark:text-aa-200 purple:text-pt-200 font-bold ">
                  {DateTime.fromISO(announcement?.publishDate)
                    .setLocale('en')
                    .toLocaleString(DateTime.DATETIME_SHORT)}
                </span>
              </div>
            )}
            <StatusBadge
              name={announcement?.isPublished ? 'Published' : 'Draft'}
              color={announcement?.isPublished ? '#8CD460' : '#FF891C'}
            />

            {!!announcement?.categories?.length && (
              <div className="flex flex-wrap items-center justify-center gap-2 ml-auto max-w-md pl-2">
                {company.categories
                  .filter((category) => announcement?.categories.includes(category._id))
                  .map((cat) => (
                    <StatusBadge key={cat._id} name={cat?.name} color={cat?.color} />
                  ))}
              </div>
            )}

            <div className="pl-2">
              <ShareButtons
                url={generateUrl(`/announcements/${announcement?._id}`, company?.subdomain)}
                title={announcement?.title}
                hashtags={company?.categories
                  .filter((category) => announcement?.categories.includes(category._id))
                  .map((cat) => cat.name)}
                summary={announcement?.content}
                isPublished={announcement?.isPublished}
              />
            </div>

            {!isGuest && (
              <div className="flex items-center px-2">
                <IdeaActionButton
                  type="Edit"
                  color="blue"
                  Icon={Pen}
                  onClick={() => {
                    dispatch(announcementActions.setAnnouncement(announcement));
                    router.push(`/announcements/edit/${announcement?._id}`);
                  }}
                />
                <IdeaActionButton
                  type="Delete"
                  color="red"
                  Icon={Trash}
                  onClick={() => {
                    setOpenDeleteModal(true);
                  }}
                />
              </div>
            )}
          </div>

          <span className="mt-2 mb-8 text-slate-800 dark:text-aa-200 purple:text-pt-200 text-sm font-normal tracking-md text-left">
            {DateTime.fromISO(announcement?.createdAt)
              .setLocale('en')
              .toLocaleString(DateTime.DATE_MED)}
          </span>

          <div className="prose prose-p:text-slate-800 dark:prose-p:text-aa-200 purple:prose-p:text-pt-200 prose-a:text-slate-800 dark:prose-a:text-aa-400 purple:prose-a:text-pt-400 prose-strong:text-slate-900 dark:prose-strong:text-aa-500 purple:prose-strong:text-pt-600 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm prose-headings:m-0 prose-headings:p-0 max-w-full mb-4">
            <SanitizeHtml id="idea-detail" html={announcement?.content} />
          </div>
          {canReact && !company.miscellaneous.disableAnnouncementReactions && (
            <AnnouncementReaction
              announcementId={announcement?._id}
              reactionCount={announcement?.reactionCount}
            />
          )}
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
        icon={<Danger className="w-7 h-7 icon-red" />}
        title="Delete Announcement"
        description="Are you sure you want to delete this announcement? This action cannot be undone."
        confirmText="Delete Announcement"
        confirmColor="red"
        canCancel
        loading={loading}
      />
    </>
  );
}
