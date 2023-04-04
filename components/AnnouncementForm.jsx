import BaseListBox from '@/components/BaseListBox';
import Button from '@/components/Button';
import CreateModal from '@/components/CreateModal';
import Input from '@/components/Input';
import StatusBadge from '@/components/StatusBadge';
import useDebounce from '@/hooks/useDebounce';
import useUpdateEffect from '@/hooks/useUpdatedEffect';
import { companyActions } from '@/redux/company/companySlice';
import { realtime } from '@/utils/altogic';
import { Plus, Sparkle } from '@phosphor-icons/react';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { compareDates, isGreaterThan } from '../utils';

const AnnouncementEditor = dynamic(() => import('@/components/AnnouncementEditor'), {
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
export default function AnnouncementForm({ onSave, announcement, children }) {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(Date.now());
  const loading = useSelector((state) => state.announcement.updateAnnouncementLoading);
  const router = useRouter();
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);

  const addCompanySubList = (name, fieldName) => {
    dispatch(
      companyActions.addItemToCompanySubLists({
        fieldName,
        value: {
          name,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          order: company[fieldName].length + 1
        }
      })
    );
  };

  function saveAnnouncement(isPublished = false) {
    onSave({
      title,
      content,
      ...(announcement?._id && { _id: announcement._id }),
      ...(title && { slug: title.toLowerCase().replace(/ /g, '-') }),
      categories: categories.map((category) => category._id),
      company: company._id,
      isPublished: isPublished || isGreaterThan(date, Date.now()),
      publishDate: date
    });
  }

  useDebounce(
    title,
    () => {
      saveAnnouncement();
      router.push(`/announcements/edit/${title.toLowerCase().replace(/ /g, '-')}`);
    },
    500
  );
  useDebounce(content?.replace(/<p><br><\/p>/g, ''), saveAnnouncement, 500);
  useDebounce(categories, saveAnnouncement, 750);

  useEffect(() => {
    if (router.isReady && announcement && !title && !content && !categories.length && company) {
      setTitle(announcement.title);
      setContent(announcement.content);
      setCategories(
        company.categories.filter((category) => announcement.categories?.includes(category._id))
      );
      setDate(
        isGreaterThan(announcement.publishDate, Date.now()) ? announcement.publishDate : Date.now()
      );
    }
  }, [announcement, router, company]);

  useUpdateEffect(() => {
    if (!compareDates(date, Date.now())) {
      saveAnnouncement(true);
    }
  }, [date]);

  return (
    <>
      <div className="max-w-screen-xl h-[calc(100vh-93px)] px-9 lg:px-8 pt-8 pb-[72px] relative mx-auto">
        <div id="editor-scroll-container" className="w-full h-full lg:px-0 grow overflow-y-auto">
          {children}
          <div className="h-full">
            <Input
              type="text"
              name="story-title"
              className="block text-slate-500 dark:text-aa-200 purple:text-pt-200 px-0 py-4 w-full text-3xl font-medium border-0 placeholder-slate-500 focus:outline-none focus:ring-0 placeholder:text-2xl bg-inherit"
              placeholder="Share with your audience what you are shipping for."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className="flex items-center">
              <div className="my-auto">
                {categories.map((category) => (
                  <StatusBadge
                    key={category._id}
                    name={category.name}
                    color={category.color}
                    onClose={() =>
                      setCategories(categories.filter((cat) => cat._id !== category._id))
                    }
                  />
                ))}
              </div>
              <BaseListBox
                label={
                  <div className=" bg-gray-100 dark:bg-aa-700 purple:bg-pt-800 text-gray-700 dark:text-aa-200 purple:text-pt-200 inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full border border-transparent whitespace-nowrap">
                    <Plus size={12} />
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
                    setCategories(value);
                  }
                }}
                multiple
                type="create"
                hidden="mobile">
                <button
                  type="button"
                  className="inline-flex items-center gap-3 text-slate-400 py-2"
                  onClick={() => setOpenCreateModal(!openCreateModal)}>
                  <Plus size={16} />
                  Add a new category
                </button>
              </BaseListBox>
            </div>
            <div className="mt-4 w-11/12 h-full">
              <AnnouncementEditor onChange={setContent} value={content} />
            </div>
          </div>
        </div>
      </div>
      {title && content && (
        <div className="animate__animated animate__fadeInUp bg-white dark:bg-aa-900 purple:bg-pt-1000  w-full mt-4 border-t border-slate-200 dark:border-aa-600 purple:border-pt-800 p-2 absolute bottom-0 py-8 px-5 md:px-10 space-y-4 flex justify-between">
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
              onClick={() => {
                saveAnnouncement(true);
                if (!isGreaterThan(date, Date.now())) {
                  realtime.send(company._id, 'publish-announcement', {
                    title,
                    content,
                    ...(announcement?._id && { _id: announcement._id }),
                    ...(title && { slug: title.toLowerCase().replace(/ /g, '-') }),
                    categories: categories.map((category) => category._id),
                    company: company._id,
                    isPublished: true,
                    publishDate: date,
                    sender: user?._id
                  });
                }
                router.push('/announcements');
              }}
            />
          </div>
        </div>
      )}
      <CreateModal
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        cancelOnClick={() => setOpenCreateModal(false)}
        createOnClick={() => addCompanySubList('Category', 'categories')}
        icon={<Sparkle size={20} className="fill-green-600" />}
        title="Create a new category"
        description="Create a new category to organize your announcements."
        label="Category name"
        id="category-name"
      />
    </>
  );
}
