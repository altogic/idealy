import BaseListBox from '@/components/BaseListBox';
import CreateModal from '@/components/CreateModal';
import { Check, FilterHamburger, ThreeStar } from '@/components/icons';
import Label from '@/components/Label';
import { DATA_RANGE } from '@/constants/index';
import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { IDEA_SORT_TYPES } from 'constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import Divider from '../Divider';
import FilterCheckboxes from '../FilterCheckboxes';

const userSegments = [
  {
    name: 'Everyone (Default)'
  },
  {
    name: 'Segment One'
  },
  {
    name: 'Segment Two'
  },
  {
    name: 'Segment Three'
  },
  {
    name: 'Segment Four'
  },
  {
    name: 'Segment Five'
  },
  {
    name: 'Segment Six'
  },
  {
    name: 'Segment Seven'
  }
];

export default function FilterSave({ className, filters }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isFilters, setIsFilters] = useState();
  const [isCreateNewTopic, setIsCreateNewTopic] = useState(false);
  const [isUserSegment, setIsUserSegment] = useState(userSegments[0]);
  const [topics, setTopics] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const company = useSelector((state) => state.company.company);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [dataRange, setDataRange] = useState(DATA_RANGE[0]?.name);
  const [modalInfo, setModalInfo] = useState({});
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
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          dataRange,
          startDate: start.toISOString(),
          endDate: end.toISOString()
        }
      });
    }
  };

  const handleFilterTopicChange = (e, topic) => {
    if (e.target.checked) {
      setTopics([...topics, topic.name]);
    } else {
      const newTopics = topics.filter((item) => item !== topic.name);
      if (newTopics.length === 0) {
        delete router.query.topics;
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query
          }
        });
      }

      setTopics(newTopics);
    }
  };

  const handleFilterStatusChange = (e, status) => {
    if (e.target.checked) {
      setStatuses([...statuses, status.name]);
    } else {
      const newStatuses = statuses.filter((item) => item !== status.name);
      if (newStatuses.length === 0) {
        delete router.query.status;
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query
          }
        });
      }
      setStatuses(newStatuses);
    }
  };
  const handleFilterCategoryChange = (e, category) => {
    if (e.target.checked) {
      setCategories([...categories, category.name]);
    } else {
      const newCategories = categories.filter((item) => item !== category.name);
      if (newCategories.length === 0) {
        delete router.query.category;
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query
          }
        });
      }
      setCategories(newCategories);
    }
  };
  const saveFilter = (name) => {
    const req = {
      _parent: user._id,
      name,
      startDate,
      endDate,
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
  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
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
  const openModal = (name, id, field) => {
    setIsCreateNewTopic(!isCreateNewTopic);
    setModalInfo({
      title: `Create new ${name}`,
      description: `Enter a name for your new ${name}`,
      label: name,
      id,
      placeholder: `e.g. New ${name}`,
      createOnClick: (name) => addCompanySubList(name, field)
    });
  };
  useEffect(() => {
    setIsFilters(IDEA_SORT_TYPES[0]);
  }, []);
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
    if (!topics.length && router.query.topics) {
      setTopics(router.query.topics.split(','));
    }
    if (!statuses.length && router.query.status) {
      setStatuses(router.query.status.split(','));
    }
    if (!categories.length && router.query.category) {
      setCategories(router.query.category.split(','));
    }
    if (router.query.startDate) {
      setStartDate(new Date(router.query.startDate));
    }
    if (router.query.endDate) {
      setEndDate(new Date(router.query.endDate));
    }
    if (router.query.dataRange) {
      setDataRange(router.query.dataRange);
    }
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
            mobileSize="auto"
            hidden="mobile"
          />
        </div>
      )}
      <div className="space-y-1.5">
        <Label label="User Segment" />
        <BaseListBox
          value={isFilters}
          icon={<Check className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />}
          label={isUserSegment.name}
          onChange={setIsUserSegment}
          field="name"
          options={userSegments}
          size="xl"
          mobileSize="auto"
          hidden="mobile"
        />
      </div>
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
          <Tab.List className="lg:flex gap-1 fixed lg:static w-full lg:w-auto transform pb-3">
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
            <Tab.Panel>
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                placeholderText="Select a date range"
                dayClassName={() => 'text-slate-500 dark:text-aa-200 purple:text-pt-200'}
                calendarClassName="bg-white dark:bg-aa-700 purple:bg-pt-700 text-slate-500 dark:text-aa-200 purple:text-pt-200"
                className="bg-white dark:bg-aa-700 purple:bg-pt-700 text-slate-500 dark:text-aa-200 purple:text-pt-200  w-full border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-pointer px-[14px] py-3.5 placeholder:text-slate-500 dark:placeholder:text-aa-200 purple:placeholder:text-pt-200"
              />
            </Tab.Panel>
            <Tab.Panel>
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                placeholderText="Select a date range"
                dayClassName={() => 'text-slate-500 dark:text-aa-200 purple:text-pt-200'}
                calendarClassName="bg-white dark:bg-aa-700 purple:bg-pt-700 text-slate-500 dark:text-aa-200 purple:text-pt-200"
                className="bg-white dark:bg-aa-700 purple:bg-pt-700 text-slate-500 dark:text-aa-200 purple:text-pt-200  w-full border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-pointer px-[14px] py-3.5 placeholder:text-slate-500 dark:placeholder:text-aa-200 purple:placeholder:text-pt-200"
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <Divider />
      <FilterCheckboxes
        options={company?.topics}
        onChange={handleFilterTopicChange}
        label="Topics"
        openModal={() => openModal('Topic', 'topicName', 'topics')}
        name="topics"
        selectedItems={topics}
        setItems={setTopics}
      />
      <FilterCheckboxes
        options={company?.statuses}
        onChange={handleFilterStatusChange}
        label="Statuses"
        openModal={() => openModal('Status', 'statusName', 'statuses')}
        name="status"
        selectedItems={statuses}
        setItems={setStatuses}
      />

      <FilterCheckboxes
        options={company?.categories}
        onChange={handleFilterCategoryChange}
        label="Categories"
        openModal={() => openModal('Category', 'categoryName', 'categories')}
        name="category"
        selectedItems={categories}
        setItems={setCategories}
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
