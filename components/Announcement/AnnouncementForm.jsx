import BaseListBox from '@/components/BaseListBox';
import Button from '@/components/Button';
import CreateModal from '@/components/CreateModal';
import Input from '@/components/Input';
import StatusBadge from '@/components/StatusBadge';
import { ChevronLeft, Plus, ThreeStar } from '@/components/icons';
import useAddCompanySublist from '@/hooks/useAddCompanySublist';
import useDebounce from '@/hooks/useDebounce';
import useUpdateEffect from '@/hooks/useUpdatedEffect';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { realtime } from '@/utils/altogic';
import { compareDates, isGreaterThan } from '@/utils/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

const AnnouncementEditor = dynamic(() => import('@/components/Announcement/Editor'), {
  ssr: false
});
const DatePickerButton = forwardRef(({ onClick }, ref) => (
  <button
    type="button"
    className="text-base inline-flex items-center justify-center gap-2 tracking-sm rounded-md transition ease-linear duration-200 focus:outline-none px-4 py-2.5 h-11 border  bg-white dark:bg-aa-600 purple:bg-pt-900 text-gray-700 dark:text-aa-200 purple:text-pt-200 border-gray-300 hover:bg-gray-100 dark:hover:bg-aa-400 purple:hover:bg-pt-400"
    onClick={onClick}
    ref={ref}>
    Schedule
  </button>
));
DatePickerButton.displayName = 'DatePickerButton';
export default function AnnouncementForm({ onSave, children }) {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [categories, setCategories] = useState([]);

  const {
    updateAnnouncementLoading: loading,
    createAnnouncementLoading,
    announcement
  } = useSelector((state) => state.announcement);
  const router = useRouter();
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const addCompanySubList = useAddCompanySublist();
  const schema = yup.object().shape({
    title: yup
      .string()
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must be less than 100 characters')
      .matches(
        /^^[A-Za-z0-9][A-Za-z0-9\s\-.,!?:;'"()%$&]+$/,
        'Blog title must start with a letter or a number and can include letters, numbers, spaces, and certain special characters.'
      )
  });

  const {
    register,
    formState: { errors },
    setError
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  function saveAnnouncement() {
    if (company) {
      onSave({
        title: announcement?.title,
        content: announcement?.content,
        ...(announcement?._id && { _id: announcement?._id }),
        categories: announcement.categories,
        company: company._id,
        publishDate: date
      });
    }
  }

  function publishAnnouncement() {
    return () => {
      if (announcement?.title) {
        dispatch(
          announcementActions.updateAnnouncement({
            ...announcement,
            isPublished: true,
            onSuccess: () => router.push('/announcements')
          })
        );
        if (!isGreaterThan(date, Date.now())) {
          realtime.send(company._id, 'publish-announcement', {
            ...announcement,
            title: announcement?.title,
            content: announcement?.content,
            ...(announcement?._id && { _id: announcement?._id }),
            categories: categories.map((category) => category._id),
            company: company._id,
            isPublished: true,
            publishDate: date,
            sender: user?._id
          });
        }
        router.push('/announcements');
      } else {
        setError('title', {
          type: 'manual',
          message: 'Title is required'
        });
      }
    };
  }

  useDebounce(announcement, saveAnnouncement, 600);

  useEffect(() => {
    if (!categories?.length) {
      setCategories(
        company.categories.filter((category) => announcement?.categories?.includes(category._id))
      );
    }
  }, [announcement]);

  useUpdateEffect(() => {
    if (!compareDates(date, Date.now())) {
      saveAnnouncement();
    }
  }, [date]);

  return (
    <>
      <div
        className="h-[calc(100vh-218px)] relative overflow-auto px-9 lg:px-8 pt-8 "
        id="editor-scroll-container">
        <div className="w-full lg:px-0 grow max-w-screen-xl mx-auto">
          <div className="h-6">{children}</div>
          <div className="h-full">
            <Input
              type="text"
              name="title"
              id="title"
              className="block text-slate-500 dark:text-aa-200 purple:text-pt-200 px-0 py-4 w-full text-3xl font-medium border-0 placeholder:text-slate-500 dark:placeholder-aa-200 purple:placeholder-pt-200 focus:outline-none focus:ring-0 placeholder:text-2xl bg-inherit"
              placeholder="Share with your audience what you are shipping for."
              onChange={(e) =>
                dispatch(
                  announcementActions.setAnnouncement({
                    title: e.target.value
                  })
                )
              }
              value={announcement?.title}
              register={register('title')}
              error={errors.title}
              autoFocus={!!announcement?.title && !announcement?.content}
              disabled={loading || createAnnouncementLoading}
            />
            <div className="flex items-center">
              <div className="my-auto">
                {categories?.map((category) => (
                  <StatusBadge
                    key={category._id}
                    name={category.name}
                    color={category.color}
                    onClose={() => {
                      setCategories(categories.filter((cat) => cat._id !== category._id));
                      dispatch(
                        announcementActions.setAnnouncement({
                          categories: announcement?.categories.filter((cat) => cat !== category._id)
                        })
                      );
                    }}
                  />
                ))}
              </div>
              <BaseListBox
                label={
                  <div className=" bg-gray-100 dark:bg-aa-700 purple:bg-pt-800 text-gray-700 dark:text-aa-200 purple:text-pt-200 inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full border border-transparent whitespace-nowrap">
                    <Plus className="w-3 h-3 icon" />
                    <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-xs">
                      Categories
                    </span>
                  </div>
                }
                value={categories}
                field="name"
                options={company?.categories}
                size="xxl"
                onChange={(value) => {
                  if (value.length <= 3) {
                    const categories = value.map((cat) => cat._id);
                    setCategories(value);
                    dispatch(
                      announcementActions.setAnnouncement({
                        categories
                      })
                    );
                  }
                }}
                multiple
                type="create"
                hidden="mobile">
                <button
                  type="button"
                  className="inline-flex items-center gap-3 text-slate-400 py-2"
                  onClick={() => setOpenCreateModal(!openCreateModal)}>
                  <Plus className="w-4 h-4 icon" />
                  Add a new category
                </button>
              </BaseListBox>
            </div>
            <div className="mt-4 w-11/12">
              <AnnouncementEditor
                onChange={(content) => {
                  dispatch(
                    announcementActions.setAnnouncement({
                      content
                    })
                  );
                }}
                value={announcement?.content}
              />
            </div>
          </div>
        </div>
      </div>
      {announcement?.title && announcement?.content && (
        <footer className="animate__animated animate__fadeInUp bg-white dark:bg-aa-900 purple:bg-pt-1000  w-full mt-4 border-t border-slate-200 dark:border-aa-600 purple:border-pt-800 p-2 fixed bottom-0 py-8 px-5 md:px-10 space-y-4 flex justify-between">
          <Link href="/announcements">
            <a className="text-slate-500 dark:text-aa-200 purple:text-pt-200 font-medium flex items-center gap-2 underline">
              <ChevronLeft className="w-4 h-4 icon" />
              Back to announcements
            </a>
          </Link>
          {isGreaterThan(date, Date.now()) && (
            <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200 mt-4">
              Will be published on{' '}
              <span className="font-bold">
                {DateTime.fromJSDate(new Date(date))
                  .setLocale('en')
                  .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
              </span>
            </span>
          )}
          <div className="flex gap-4 justify-end flex-1">
            <DatePicker
              selected={Date.now()}
              onChange={setDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<DatePickerButton />}
            />
            <Button
              text="Publish"
              variant="indigo"
              loading={loading}
              disabled={loading}
              onClick={publishAnnouncement()}
            />
          </div>
        </footer>
      )}
      <CreateModal
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        cancelOnClick={() => setOpenCreateModal(false)}
        createOnClick={(name) =>
          addCompanySubList(name, 'categories', (category) => {
            if (categories.length < 3) {
              setCategories([...categories, category]);
              const cIds = categories.map((cat) => cat._id);
              dispatch(
                announcementActions.setAnnouncement({
                  categories: [...cIds, category._id]
                })
              );
            }
          })
        }
        icon={<ThreeStar className="w-5 h-5 icon-green" />}
        title="Create a new category"
        description="Create a new category to organize your announcements."
        label="Category name"
        id="category-name"
      />
    </>
  );
}
