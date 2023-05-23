import BaseListBox from '@/components/BaseListBox';
import CreateModal from '@/components/CreateModal';
import {
  Bug,
  CircleCheck,
  Eye,
  FilterHamburger,
  ThreeStar,
  Archive,
  XCircle
} from '@/components/icons';
import Label from '@/components/Label';
import { DATA_RANGE } from '@/constants/index';
import { authActions } from '@/redux/auth/authSlice';
import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import DatePicker from '../DatePicker';
import Divider from '../Divider';
import FilterCheckboxes from '../FilterCheckboxes';
import IdeaPropertyButton from '../IdeaPropertyButton';

export default function FilterSave({ className, filters }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [userSegments, setUserSegments] = useState([]);
  const [topics, setTopics] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const company = useSelector((state) => state.company.company);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [dataRange, setDataRange] = useState(DATA_RANGE[0]?.name);

  const saveFilter = (name) => {
    const req = {
      _parent: user._id,
      name,
      startDate: date[0].startDate,
      endDate: date[0].endDate,
      dataRange,
      userSegments: company.userSegments
        .filter((topic) => topics.includes(topic.name))
        .map((topic) => topic._id),
      topics: company.topics
        .filter((topic) => topics.includes(topic.name))
        .map((topic) => topic._id),
      statuses: company.statuses
        .filter((status) => statuses.includes(status.name))
        .map((status) => status._id),
      categories: company.categories
        .filter((category) => categories.includes(category.name))
        .map((category) => category._id),
      isArchive: router.query.archive === 'true',
      isPin: router.query.pin === 'true',
      isPrivate: router.query.private === 'true',
      isNoStatus: router.query.noStatus === 'true',
      isApproval: router.query.approval === 'true'
    };
    dispatch(authActions.saveFilter(req));
  };

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        filter: value._id,
        dataRange: value?.dataRange,
        startDate: value?.startDate,
        endDate: value?.endDate,
        userSegments: value?.userSegments
          .map((id) => company.userSegments.find((item) => item._id === id))
          .map((item) => item.name)
          .join(','),
        category: value?.categories
          .map((id) => company.categories.find((item) => item._id === id))
          .map((item) => item.name)
          .join(','),
        topics: value?.topics
          .map((id) => company.topics.find((item) => item._id === id))
          .map((item) => item.name)
          .join(','),
        status: value?.statuses
          .map((id) => company.statuses.find((item) => item._id === id))
          .map((item) => item.name)
          .join(','),
        archive: value?.isArchive,
        pin: value?.isPin,
        private: value?.isPrivate,
        noStatus: value?.isNoStatus,
        approval: value?.isApproval
      }
    });
  };

  const onChange = (dates) => {
    if (dates[0] === null) {
      delete router.query.startDate;
      delete router.query.endDate;
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query
        }
      });
    }
    const { startDate, endDate } = dates[0];
    setDate([{ startDate, endDate, key: 'selection' }]);
    if (startDate && endDate) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          dataRange,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString()
        }
      });
    }
  };
  const updateSavedFilter = () => {
    const req = {
      _id: selectedFilter._id,
      startDate: date[0].startDate,
      endDate: date[0].endDate,
      dataRange,
      userSegments: company.userSegments
        .filter((topic) => userSegments.includes(topic.name))
        .map((topic) => topic._id),
      topics: company.topics
        .filter((topic) => topics.includes(topic.name))
        .map((topic) => topic._id),
      statuses: company.statuses
        .filter((status) => statuses.includes(status.name))
        .map((status) => status._id),
      categories: company.categories
        .filter((category) => categories.includes(category.name))
        .map((category) => category._id),
      isArchive: router.query.archive === 'true',
      isPin: router.query.pin === 'true',
      isPrivate: router.query.private === 'true',
      isNoStatus: router.query.noStatus === 'true',
      isApproval: router.query.approval === 'true'
    };
    dispatch(authActions.updateSavedFilters(req));
  };
  useEffect(() => {
    const { topics, status, category, startDate, endDate, dataRange, userSegments, filter } =
      router.query;

    setUserSegments(userSegments ? userSegments?.split(',') : []);
    setTopics(topics ? topics?.split(',') : []);
    setStatuses(status ? status?.split(',') : []);
    setCategories(category ? category?.split(',') : []);
    setDate([
      {
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        key: 'selection'
      }
    ]);
    setDataRange(dataRange || DATA_RANGE[0]?.name);

    setSelectedFilter(filter ? filters?.find((f) => f._id === filter) : null);
  }, [router]);

  return (
    <div className={className}>
      {filters?.length > 0 && (
        <div className="space-y-1.5">
          <Label label="Filters" />
          <BaseListBox
            value={selectedFilter}
            label={selectedFilter?.name}
            onChange={handleFilterSelect}
            icon={<FilterHamburger className="w-5 h-5 icon" />}
            field="name"
            options={filters}
            size="xl"
            hidden="mobile"
          />
        </div>
      )}
      <div>
        <Label label="Data Range" />
        <Tab.Group
          onChange={(index) => {
            const dataRange = DATA_RANGE[index].name;
            setDataRange(dataRange);
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                dataRange
              }
            });
          }}>
          <Tab.List className="flex gap-2 w-full mb-4">
            {DATA_RANGE.map((item) => (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  cn(
                    'w-full px-3 py-2 text-sm font-medium tracking-sm rounded-md text-center focus:outline-none ',
                    selected
                      ? 'bg-indigo-50 dark:bg-aa-500 purple:bg-pt-500 border-2 text-indigo-600  dark:text-aa-200 purple:text-pt-200 border-indigo-700 dark:border-aa-600 purple:border-pt-800'
                      : 'text-slate-500 dark:text-aa-200 purple:text-pt-200 dark:bg-aa-800 purple:bg-pt-800'
                  )
                }>
                {item.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="h-[50px]">
              <DatePicker onChange={onChange} value={date} />
            </Tab.Panel>
            <Tab.Panel>
              <DatePicker onChange={onChange} value={date} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* <FilterCheckboxes
        options={company?.userSegments}
        onChange={(value) => {
          setUserSegments(value);
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              userSegments: value.join(',')
            }
          });
        }}
        label="User Segments"
        name="userSegments"
        selectedItems={userSegments}
      /> */}

      <FilterCheckboxes
        options={company?.topics}
        onChange={(value) => {
          setTopics(value);
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              topics: value.join(',')
            }
          });
        }}
        label="Topics"
        name="topics"
        selectedItems={topics}
      />

      <FilterCheckboxes
        options={company?.statuses}
        onChange={(value) => {
          setStatuses(value);
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              status: value.join(',')
            }
          });
        }}
        label="Statuses"
        name="status"
        selectedItems={statuses}
      />

      <FilterCheckboxes
        options={company?.categories}
        onChange={(value) => {
          setCategories(value);
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              category: value.join(',')
            }
          });
        }}
        label="Categories"
        name="category"
        selectedItems={categories}
      />
      <div className="space-y-1.5 ">
        <Label label="Properties" className="px-2" />
        <div className="space-y-2 ">
          <IdeaPropertyButton
            text="Archive"
            active={router.query.archive === 'true'}
            icon={<Archive className="w-5 h-5 icon" />}
            name="archive"
          />
          <IdeaPropertyButton
            text="Private"
            active={router.query.private === 'true'}
            icon={<Eye className="w-5 h-5 icon" />}
            name="private"
          />
          <IdeaPropertyButton
            text="Need Approval"
            active={router.query.approved === 'true'}
            icon={<CircleCheck className="w-5 h-5 icon" />}
            name="approved"
          />

          <IdeaPropertyButton
            text="Bug"
            active={router.query.bug === 'true'}
            icon={<Bug className="w-5 h-5 icon" />}
            name="bug"
          />

          <IdeaPropertyButton
            text="No Status"
            active={router.query.noStatus === 'true'}
            icon={<XCircle className="w-5 h-5 icon" />}
            name="noStatus"
          />
        </div>
      </div>
      {(topics.length > 0 ||
        userSegments.length > 0 ||
        statuses.length > 0 ||
        categories.length > 0 ||
        router.query.archive === 'true' ||
        router.query.bug === 'true' ||
        router.query.private === 'true' ||
        router.query.noStatus === 'true') && (
        <>
          <Divider />
          <Button
            variant="blank"
            fullWidth
            text="Clear All Filters"
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: { page: router.query.page, feedback: router.query.feedback }
              });
            }}
          />
          <Button
            variant="blank"
            text="Save Filter"
            fullWidth
            onClick={() => {
              setOpenCreateModal(!openCreateModal);
            }}
          />
        </>
      )}
      {selectedFilter && (
        <Button variant="blank" text="Update Filter" fullWidth onClick={updateSavedFilter} />
      )}

      <CreateModal
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        cancelOnClick={() => setOpenCreateModal(false)}
        createOnClick={(name) => saveFilter(name)}
        icon={<ThreeStar className="w-6 h-6 text-green-600" />}
        title="Filter Save"
        description="Please enter a name for this filter."
        label="Filter name"
        id="filterName"
        placeholder="e.g. New Filter"
      />
    </div>
  );
}
