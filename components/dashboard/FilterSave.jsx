import BaseListBox from '@/components/BaseListBox';
import CreateModal from '@/components/CreateModal';
import { FilterHamburger, ThreeStar } from '@/components/icons';
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

export default function FilterSave({ className, filters }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isCreateNewTopic, setIsCreateNewTopic] = useState(false);
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
  const [modalInfo, setModalInfo] = useState({});

  const saveFilter = (name) => {
    const req = {
      _parent: user._id,
      name,
      startDate: date[0].startDate,
      endDate: date[0].endDate,
      dataRange,
      sortType: router.query.sort,
      topics: company.topics
        .filter((topic) => topics.includes(topic.name))
        .map((topic) => topic._id),
      statuses: company.statuses
        .filter((status) => statuses.includes(status.name))
        .map((status) => status._id),
      categories: company.categories
        .filter((category) => categories.includes(category.name))
        .map((category) => category._id)
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
        dataRange: value.dataRange,
        startDate: value.startDate,
        endDate: value.endDate,
        categories: value.categories
          .map((id) => company.categories.find((item) => item._id === id))
          .map((item) => item.name)
          .join(','),
        topics: value.topics
          .map((id) => company.topics.find((item) => item._id === id))
          .map((item) => item.name)
          .join(','),
        statuses: value.statuses
          .map((id) => company.statuses.find((item) => item._id === id))
          .map((item) => item.name)
          .join(',')
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

  useEffect(() => {
    if (topics.length) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          topics: topics.join(',')
        }
      });
    }
  }, [topics]);

  useEffect(() => {
    if (statuses.length) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          status: statuses.join(',')
        }
      });
    }
  }, [statuses]);

  useEffect(() => {
    if (userSegments.length) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          segment: userSegments.join(',')
        }
      });
    }
  }, [userSegments]);

  useEffect(() => {
    if (categories.length) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          category: categories.join(',')
        }
      });
    }
  }, [categories]);

  useEffect(() => {
    setUserSegments(router.query.segment ? router.query.segment.split(',') : []);
    setTopics(router.query.topics ? router.query.topics.split(',') : []);
    setStatuses(router.query.status ? router.query.status.split(',') : []);
    setCategories(router.query.category ? router.query.category.split(',') : []);
    setDate([
      {
        startDate: router.query.startDate ? new Date(router.query.startDate) : null,
        endDate: router.query.endDate ? new Date(router.query.endDate) : null,
        key: 'selection'
      }
    ]);
    setDataRange(router.query.dataRange ? router.query.dataRange : DATA_RANGE[0]?.name);
    setSelectedFilter(
      router.query.filter ? filters.find((filter) => filter._id === router.query.filter) : null
    );
  }, [router]);

  return (
    <div className={className}>
      {filters?.length > 0 && (
        <div className="space-y-1.5">
          <Label label="Filters" />

          <BaseListBox
            value={selectedFilter}
            label={selectedFilter?.name}
            icon={
              <FilterHamburger className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
            }
            onChange={handleFilterSelect}
            field="name"
            options={filters}
            size="xl"
            hidden="mobile"
          />
        </div>
      )}

      <div className="space-y-1.5">
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
          <Tab.List className="lg:flex gap-1 lg:static w-full lg:w-auto transform pb-3">
            {DATA_RANGE.map((item) => (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  cn(
                    ' px-3 py-2 text-sm font-medium tracking-sm rounded-md text-center  focus:outline-none w-1/2 ',
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
            <Tab.Panel />
          </Tab.Panels>
        </Tab.Group>
      </div>

      <FilterCheckboxes
        options={company?.userSegments}
        onChange={setUserSegments}
        label="User Segments"
        name="userSegments"
        selectedItems={userSegments}
      />

      <FilterCheckboxes
        options={company?.topics}
        onChange={setTopics}
        label="Topics"
        name="topics"
        selectedItems={topics}
      />

      <FilterCheckboxes
        options={company?.statuses}
        onChange={setStatuses}
        label="Statuses"
        name="status"
        selectedItems={statuses}
      />

      <FilterCheckboxes
        options={company?.categories}
        onChange={setCategories}
        label="Categories"
        name="category"
        selectedItems={categories}
      />

      <Divider />
      <Button
        variant="blank"
        text="Save Filter"
        fullWidth
        onClick={() => {
          setIsCreateNewTopic(!isCreateNewTopic);
          setModalInfo({
            title: 'Filter Save',
            description: 'Please enter a name for this filter.',
            label: 'Filter name',
            id: 'filterName',
            placeholder: 'e.g. New Filter',
            createOnClick: (name) => saveFilter(name)
          });
        }}
      />
      <CreateModal
        show={isCreateNewTopic}
        onClose={() => setIsCreateNewTopic(!isCreateNewTopic)}
        cancelOnClick={() => setIsCreateNewTopic(!isCreateNewTopic)}
        createOnClick={modalInfo.createOnClick}
        icon={<ThreeStar className="w-6 h-6 text-green-600" />}
        title={modalInfo.title}
        description={modalInfo.description}
        label={modalInfo.label}
        id={modalInfo.id}
        placeholder={modalInfo.placeholder}
      />
    </div>
  );
}
