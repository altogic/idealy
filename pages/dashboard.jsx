import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import cn from 'classnames';
import Layout from '@/components/Layout';
import Input from '@/components/Input';
import Label from '@/components/Label';
import FeatureListCard from '@/components/FeatureListCard';
import CreateModal from '@/components/CreateModal';
import FeedbackCardDetail from '@/components/FeedbackCardDetail';
import Select, { components } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Listbox, Dialog, Transition } from '@headlessui/react';
import copy from 'copy-to-clipboard';
import {
  Search,
  Close,
  Filter,
  Check,
  Plus,
  ThreeStar,
  Copy,
  Pen,
  UpDown
} from '@/components/icons';

const commentsFilters = [
  { name: 'Trending' },
  { name: 'Top' },
  { name: 'Newest' },
  { name: 'Status Changed' }
];

const filters = [
  {
    name: 'Filter Name One'
  },
  {
    name: 'Filter Name Two'
  },
  {
    name: 'Filter Name Three'
  }
];

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

const statusList = [
  {
    id: 0,
    color: 'text-red-500',
    name: 'Under Consideration'
  },
  {
    id: 1,
    color: 'text-blue-500',
    name: 'Planned'
  },
  {
    id: 2,
    color: 'text-yellow-500',
    name: 'In Development'
  },
  {
    id: 3,
    color: 'text-green-500',
    name: 'Shipped'
  },
  {
    id: 4,
    color: 'text-purple-500',
    name: 'Complete'
  },
  {
    id: 5,
    color: 'text-slate-500',
    name: 'Closed'
  }
];

const category = [
  {
    name: 'Development'
  },
  {
    name: 'Bug'
  },
  {
    name: 'Design'
  },
  {
    name: 'Misc'
  },
  {
    name: 'Integrations'
  }
];

const owner = [
  {
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Olivia Rhye'
  },
  {
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Halit Güvenilir'
  },
  {
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'İsmail Erüstün'
  },
  {
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Ümit Çakmak'
  },
  {
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Enes Malik Özer'
  },
  {
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Deniz Çolak'
  }
];

const roadmaps = [
  {
    name: 'Roadmap Name One'
  },
  {
    name: 'Roadmap Name Two'
  },
  {
    name: 'Roadmap Name Three'
  },
  {
    name: 'Roadmap Name Four'
  },
  {
    name: 'Roadmap Name Five'
  }
];

const colorOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
  { value: 'blue', label: 'Blue', color: '#0052CC' },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630' },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' }
];

const searchFilters = [
  {
    name: 'Trending'
  },
  {
    name: 'Top'
  },
  {
    name: 'Newest'
  },
  {
    name: 'Status Changed'
  }
];

function MultiValueContainer(...props) {
  return (
    <div>
      <components.MultiValueContainer {...props} />
    </div>
  );
}

export default function AdminDashboard() {
  // List Box States
  const [isCommentsFilters, setIsCommentsFilters] = useState(commentsFilters[0]);
  const [isFilters, setIsFilters] = useState(filters[0]);
  const [isUserSegment, setIsUserSegment] = useState(userSegments[0]);
  const [isStatus, setIsStatus] = useState(statusList[0]);
  const [isCategory, setIsCategory] = useState(category[0]);
  const [isOwner, setIsOwner] = useState(owner[0]);
  const [isRoadmap, setIsRoadmap] = useState(roadmaps[0]);
  const [isSearchFilter, setIsSearchFilter] = useState(searchFilters[0]);

  const [isCreateNewTopic, setIsCreateNewTopic] = useState(false);
  const [userChoice, setUserChoice] = useState([]);
  const [isFilterSlide, setIsFilterSlide] = useState(false);
  const [copyText, setCopyText] = useState('www.altogic.com/featu...');

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = () => {
    copy(copyText);
    toast.success('Link copied to clipboard');
  };
  console.log('userChoice', userChoice);
  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Admin Dashboard</title>
        <meta name="description" content="Altogic Canny Alternative Admin Dashboard" />
      </Head>
      <Layout>
        <div className="grid grid-cols-[500px,1fr] 4xl:grid-cols-[300px,499px,1fr] h-[calc(100vh-88px)] -mx-4">
          <div className="hidden 4xl:block h-[calc(100vh-88px)] bg-slate-50 px-6 py-8 space-y-8 border-r border-gray-200 overflow-y-auto">
            <div className="space-y-1.5">
              <Label label="Filters" />
              <Listbox value={isFilters} onChange={setIsFilters}>
                <div className="relative">
                  <Listbox.Button className="relative w-full inline-flex bg-white p-3.5 border border-slate-300 rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="flex items-center gap-2 text-slate-800 text-sm tracking-sm truncate">
                      <Filter className="w-5 h-5 text-slate-500" />
                      {isFilters.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg z-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {filters.map((filter) => (
                        <Listbox.Option
                          key={filter.name}
                          className={({ active }) =>
                            `relative flex items-center justify-between select-none py-2.5 px-3.5 text-sm ${
                              active ? 'bg-slate-100' : 'text-slate-900'
                            }`
                          }
                          value={filter}>
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}>
                                {filter.name}
                              </span>
                              {selected ? (
                                <span className="flex items-center pl-3 text-indigo-700">
                                  <Check className="w-5 h-5" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="space-y-1.5">
              <Label label="User Segment" />
              <Listbox value={isUserSegment} onChange={setIsUserSegment}>
                <div className="relative">
                  <Listbox.Button className="relative w-full inline-flex bg-white p-3.5 border border-slate-300 rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="flex items-center gap-2 text-slate-800 text-sm tracking-sm truncate">
                      <Filter className="w-5 h-5 text-slate-500" />
                      {isUserSegment.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg z-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userSegments.map((userSegment) => (
                        <Listbox.Option
                          key={userSegment.name}
                          className={({ active }) =>
                            `relative flex items-center justify-between select-none py-2.5 px-3.5 text-sm ${
                              active ? 'bg-slate-100' : 'text-slate-900'
                            }`
                          }
                          value={userSegment}>
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}>
                                {userSegment.name}
                              </span>
                              {selected ? (
                                <span className="flex items-center pl-3 text-indigo-700">
                                  <Check className="w-5 h-5" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="space-y-2">
              <Label label="Topic" />
              <div className="space-y-3">
                <div className="relative flex items-center">
                  <div className="flex items-center">
                    <input
                      id="topics"
                      name="topics"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-2">
                    <label
                      htmlFor="topics"
                      className="bg-gray-200 text-slate-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                      Comments
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="flex items-center">
                    <input
                      id="topics"
                      name="topics"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-2">
                    <label
                      htmlFor="topics"
                      className="bg-gray-200 text-slate-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                      Comments
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-3 text-slate-400 py-2 text-sm tracking-sm"
                onClick={() => setIsCreateNewTopic(!isCreateNewTopic)}>
                <Plus className="w-4 h-4" />
                Create new topic
              </button>
              {/* Create New Topic Modal */}
              <CreateModal
                show={isCreateNewTopic}
                onClose={() => setIsCreateNewTopic(!isCreateNewTopic)}
                cancelOnClick={() => setIsCreateNewTopic(!isCreateNewTopic)}
                createOnClick={() => setIsCreateNewTopic(!isCreateNewTopic)}
                icon={<ThreeStar className="w-6 h-6 text-green-600" />}
                title="Create new topic"
                description="Please enter a name for this topic."
                label="Topic name"
                id="topicName"
                placeholder="e.g. New topic"
              />
            </div>
            <hr className="my-8" />
            <div className="space-y-2">
              <Label label="Statuses" />
              <div className="space-y-3">
                <div className="relative flex items-center">
                  <div className="flex items-center">
                    <input
                      id="underConsideration"
                      name="statuses"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-2">
                    <label
                      htmlFor="underConsideration"
                      className="bg-red-50 text-red-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                      Under Consideration
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="flex items-center">
                    <input
                      id="planned"
                      name="statuses"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-2">
                    <label
                      htmlFor="planned"
                      className="bg-blue-50 text-blue-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                      Planned
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="flex items-center">
                    <input
                      id="inDevelopment"
                      name="statuses"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-2">
                    <label
                      htmlFor="inDevelopment"
                      className="bg-orange-50 text-orange-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                      In Development
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="flex items-center">
                    <input
                      id="shipped"
                      name="statuses"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-2">
                    <label
                      htmlFor="shipped"
                      className="bg-green-50 text-green-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                      Shipped
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="flex items-center">
                    <input
                      id="complete"
                      name="statuses"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-2">
                    <label
                      htmlFor="complete"
                      className="bg-purple-50 text-purple-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                      Complete
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="flex items-center">
                    <input
                      id="closed"
                      name="statuses"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-2">
                    <label
                      htmlFor="closed"
                      className="bg-neutral-100 text-neutral-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                      Closed
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-8" />
            <div className="relative">
              <Select
                isMulti
                name="colors"
                closeMenuOnSelect={false}
                options={colorOptions}
                className="basic-multi-select"
                placeholder="Deneme"
                classNamePrefix="select"
                onChange={(choice) => setUserChoice(choice)}
              />
              <div>
                {/* {userChoice.map((item) => (
                  <div>{item.label}</div>
                ))} */}
                <MultiValueContainer />
              </div>
            </div>
          </div>
          <div className="border-r border-gray-200">
            <div>
              <div className="flex items-center gap-2 p-6 border-b border-slate-200">
                <button
                  type="button"
                  className="inline-flex items-center justify-between bg-indigo-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={() => setIsFilterSlide(!isFilterSlide)}>
                  <Filter className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <Input
                    type="text"
                    name="search"
                    id="search"
                    icon={<Search className="w-5 h-5 text-slate-500" />}
                    placeholder="Search"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-between bg-indigo-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2">
                  <Pen className="w-5 h-5" />
                </button>
                <Listbox value={isSearchFilter} onChange={setIsSearchFilter}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full inline-flex bg-transparent text-slate-700 p-3 border border-slate-200 rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <UpDown className="w-5 h-5" />
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0">
                      <Listbox.Options className="absolute right-0 mt-1 max-h-60 w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none sm:text-sm">
                        {searchFilters.map((item) => (
                          <Listbox.Option
                            key={item.name}
                            className={({ active }) =>
                              `relative flex items-center justify-between select-none py-2 px-3.5 ${
                                active ? 'bg-slate-100' : 'text-slate-900'
                              }`
                            }
                            value={item}>
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}>
                                  {item.name}
                                </span>
                                {selected ? (
                                  <span className="flex items-center pl-3 text-indigo-700">
                                    <svg
                                      className="w-5 h-5"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <path
                                        d="M16.6673 5L7.50065 14.1667L3.33398 10"
                                        stroke="currentColor"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="h-[calc(100vh-181px)] overflow-auto">
                <FeatureListCard
                  title="Volutpat elementum elit faucibus non sed orci."
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elitcutri scelerisque pellentesque posuere neque..."
                  upNumber="10"
                  commentNumber="50"
                  status={2}
                  badgeName="Bug"
                />
                <FeatureListCard
                  title="Volutpat elementum elit faucibus non sed orci."
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elitcutri scelerisque pellentesque posuere neque..."
                  upNumber="10"
                  commentNumber="50"
                  status={2}
                  badgeName="Bug"
                />
                <FeatureListCard
                  title="Volutpat elementum elit faucibus non sed orci."
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elitcutri scelerisque pellentesque posuere neque..."
                  upNumber="10"
                  commentNumber="50"
                  status={2}
                  badgeName="Bug"
                />
                <FeatureListCard
                  title="Volutpat elementum elit faucibus non sed orci."
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elitcutri scelerisque pellentesque posuere neque..."
                  upNumber="10"
                  commentNumber="50"
                  status={2}
                  badgeName="Bug"
                />
                <FeatureListCard
                  title="Volutpat elementum elit faucibus non sed orci."
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elitcutri scelerisque pellentesque posuere neque..."
                  upNumber="10"
                  commentNumber="50"
                  status={2}
                  badgeName="Bug"
                />
                <FeatureListCard
                  title="Volutpat elementum elit faucibus non sed orci."
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elitcutri scelerisque pellentesque posuere neque..."
                  upNumber="10"
                  commentNumber="50"
                  status={2}
                  badgeName="Bug"
                />
                <FeatureListCard
                  title="Volutpat elementum elit faucibus non sed orci."
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elitcutri scelerisque pellentesque posuere neque..."
                  upNumber="10"
                  commentNumber="50"
                  status={2}
                  badgeName="Bug"
                />
                <FeatureListCard
                  title="Volutpat elementum elit faucibus non sed orci."
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elitcutri scelerisque pellentesque posuere neque..."
                  upNumber="10"
                  commentNumber="50"
                  status={2}
                  badgeName="Bug"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="p-8 border-b border-slate-200">
              <h2 className="text-slate-800 text-xl font-semibold tracking-md">
                Leo ultricies elit amet ultrices ectus quisque.
              </h2>
            </div>
            <div className="grid 2xl:grid-cols-[1fr,348px]">
              <div className="h-[calc(100vh-181px)] p-10 border-r border-slate-200 overflow-y-auto">
                <FeedbackCardDetail
                  avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  name="Olivia Rhye"
                  date="June 29, 2022"
                  firstButton="Edit"
                  secondButton="Add Comment"
                  thirdButton="Spam"
                  fourthButton="Archive"
                  fifthButton="Delete"
                />
                <div className="my-10">
                  <div className="flex items-center justify-between gap-6">
                    <h6>Comments</h6>
                    <hr className="flex-1" />
                    <div className="flex-shrink-0">
                      <Listbox value={isCommentsFilters} onChange={setIsCommentsFilters}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full inline-flex min-w-[195px] bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <UpDown className="w-5 h-5 text-slate-500 mr-2" />
                            <span className="block text-slate-800 truncate">
                              {isCommentsFilters.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                              <svg
                                className="w-5 h-5 text-slate-500"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M5 7.5L10 12.5L15 7.5"
                                  stroke="currentColor"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Listbox.Options className="absolute mt-1 max-h-60 min-w-[195px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {commentsFilters.map((item) => (
                                <Listbox.Option
                                  key={item.name}
                                  className={({ active }) =>
                                    `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                                      active ? 'bg-slate-100' : 'text-slate-900'
                                    }`
                                  }
                                  value={item}>
                                  {({ isCommentsFilters }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          isCommentsFilters ? 'font-medium' : 'font-normal'
                                        }`}>
                                        {item.name}
                                      </span>
                                      {isCommentsFilters ? (
                                        <span className="flex items-center pl-3 text-indigo-700">
                                          <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                              d="M16.6673 5L7.50065 14.1667L3.33398 10"
                                              stroke="currentColor"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                </div>
                <div>
                  <FeedbackCardDetail
                    avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    name="Olivia Rhye"
                    date="June 29, 2022"
                    firstButton="Edit"
                    secondButton="Reply"
                    thirdButton="Spam"
                    fourthButton="Archive"
                    fifthButton="Delete"
                  />
                  <div className="px-10">
                    <hr className="my-10" />
                  </div>
                  <FeedbackCardDetail
                    avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    name="Olivia Rhye"
                    date="June 29, 2022"
                    firstButton="Edit"
                    secondButton="Reply"
                    thirdButton="Spam"
                    fourthButton="Archive"
                    fifthButton="Delete"
                  />
                  <div className="px-10">
                    <hr className="my-10" />
                  </div>
                  <FeedbackCardDetail
                    avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    name="Olivia Rhye"
                    date="June 29, 2022"
                    firstButton="Edit"
                    secondButton="Reply"
                    thirdButton="Spam"
                    fourthButton="Archive"
                    fifthButton="Delete"
                  />
                </div>
              </div>
              <div className="h-[calc(100vh-181px)] p-6 overflow-y-auto">
                <h2 className="text-slate-800 mb-4 text-base font-semibold tracking-sm">
                  Feedback Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <ToastContainer
                      position="top-right"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                    <Label label="Public Link" />
                    <div className="flex h-10">
                      <input
                        type="text"
                        name="publicLink"
                        id="publicLink"
                        value={copyText}
                        onChange={handleCopyText}
                        className="block w-full min-w-0 flex-1 text-slate-500 placeholder-slate-500 text-sm tracking-sm border-slate-200 rounded-none rounded-l-md z-10 focus:border-indigo-500 focus:ring-indigo-500"
                        disabled
                      />
                      <button
                        type="button"
                        onClick={copyToClipboard}
                        className="inline-flex items-center gap-2 bg-white text-slate-700 px-3 text-sm font-medium tracking-sm border border-l-0 border-slate-200 rounded-r-md">
                        <Copy className="w-5 h-5" />
                        Copy
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label label="Status" />
                    <Listbox value={isStatus} onChange={setIsStatus}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <div className="inline-flex items-center gap-2">
                            <svg
                              className={cn(`h-2.5 w-2.5 ${isStatus.color}`)}
                              fill="currentColor"
                              viewBox="0 0 8 8">
                              <circle cx={4} cy={4} r={3} />
                            </svg>
                            <span className="block text-slate-800 truncate">{isStatus.name}</span>
                          </div>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                            <svg
                              className="w-5 h-5 text-slate-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0">
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none sm:text-sm">
                            {statusList.map((item) => (
                              <Listbox.Option
                                key={item.name}
                                className={({ active }) =>
                                  `relative flex items-center justify-between select-none py-2 px-3.5 ${
                                    active ? 'bg-slate-100' : 'text-slate-900'
                                  }`
                                }
                                value={item}>
                                {({ selected }) => (
                                  <>
                                    <div className="inline-flex items-center gap-2">
                                      <svg
                                        className={cn(`h-2.5 w-2.5 ${item.color}`)}
                                        fill="currentColor"
                                        viewBox="0 0 8 8">
                                        <circle cx={4} cy={4} r={3} />
                                      </svg>
                                      <span
                                        className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                        }`}>
                                        {item.name}
                                      </span>
                                    </div>
                                    {selected ? (
                                      <span className="flex items-center pl-3 text-indigo-700">
                                        <svg
                                          className="w-5 h-5"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                            d="M16.6673 5L7.50065 14.1667L3.33398 10"
                                            stroke="currentColor"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div>
                    <Label label="Category" />
                    <Listbox value={isCategory} onChange={setIsCategory}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block text-slate-800 truncate">{isCategory.name}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                            <svg
                              className="w-5 h-5 text-slate-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0">
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none sm:text-sm">
                            {category.map((item) => (
                              <Listbox.Option
                                key={item.name}
                                className={({ active }) =>
                                  `relative flex items-center justify-between select-none py-2 px-3.5 ${
                                    active ? 'bg-slate-100' : 'text-slate-900'
                                  }`
                                }
                                value={item}>
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}>
                                      {item.name}
                                    </span>
                                    {selected ? (
                                      <span className="flex items-center pl-3 text-indigo-700">
                                        <svg
                                          className="w-5 h-5"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                            d="M16.6673 5L7.50065 14.1667L3.33398 10"
                                            stroke="currentColor"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div>
                    <Label label="Owner" />
                    <Listbox value={isOwner} onChange={setIsOwner}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <div className="inline-flex items-center gap-2">
                            <img src={isOwner.image} className="w6 h-6 rounded-full" alt="" />
                            <span className="block text-slate-800 truncate">{isOwner.name}</span>
                          </div>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                            <svg
                              className="w-5 h-5 text-slate-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0">
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none sm:text-sm">
                            {owner.map((item) => (
                              <Listbox.Option
                                key={item.name}
                                className={({ active }) =>
                                  `relative flex items-center justify-between select-none py-2 px-3.5 ${
                                    active ? 'bg-slate-100' : 'text-slate-900'
                                  }`
                                }
                                value={item}>
                                {({ selected }) => (
                                  <>
                                    <div className="inline-flex items-center gap-2">
                                      <img
                                        src={item.image}
                                        className="w-6 h-6 rounded-full"
                                        alt=""
                                      />
                                      <span
                                        className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                        }`}>
                                        {item.name}
                                      </span>
                                    </div>
                                    {selected ? (
                                      <span className="flex items-center pl-3 text-indigo-700">
                                        <svg
                                          className="w-5 h-5"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                            d="M16.6673 5L7.50065 14.1667L3.33398 10"
                                            stroke="currentColor"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div>
                    <Label label="Roadmap" />
                    <Listbox value={isRoadmap} onChange={setIsRoadmap}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block text-slate-800 truncate">{isRoadmap.name}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                            <svg
                              className="w-5 h-5 text-slate-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0">
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none sm:text-sm">
                            {roadmaps.map((item) => (
                              <Listbox.Option
                                key={item.name}
                                className={({ active }) =>
                                  `relative flex items-center justify-between select-none py-2 px-3.5 ${
                                    active ? 'bg-slate-100' : 'text-slate-900'
                                  }`
                                }
                                value={item}>
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}>
                                      {item.name}
                                    </span>
                                    {selected ? (
                                      <span className="flex items-center pl-3 text-indigo-700">
                                        <svg
                                          className="w-5 h-5"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                            d="M16.6673 5L7.50065 14.1667L3.33398 10"
                                            stroke="currentColor"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {/* Mobile Slide Over Filter */}
      <Transition.Root show={isFilterSlide} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsFilterSlide}>
          <div className="fixed inset-0 bg-black/30" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="-translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="-translate-x-0"
                  leaveTo="-translate-x-full">
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setIsFilterSlide(false)}>
                              <span className="sr-only">Close panel</span>
                              <Close className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 space-y-8">
                        <div className="space-y-1.5">
                          <Label label="Filters" />
                          <Listbox value={isFilters} onChange={setIsFilters}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full inline-flex bg-white p-3.5 border border-slate-300 rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="flex items-center gap-2 text-slate-800 text-sm tracking-sm truncate">
                                  <Filter className="w-5 h-5 text-slate-500" />
                                  {isFilters.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                                  <svg
                                    className="w-5 h-5 text-gray-500"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M5 7.5L10 12.5L15 7.5"
                                      stroke="currentColor"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg z-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {filters.map((filter) => (
                                    <Listbox.Option
                                      key={filter.name}
                                      className={({ active }) =>
                                        `relative flex items-center justify-between select-none py-2.5 px-3.5 text-sm ${
                                          active ? 'bg-slate-100' : 'text-slate-900'
                                        }`
                                      }
                                      value={filter}>
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected ? 'font-medium' : 'font-normal'
                                            }`}>
                                            {filter.name}
                                          </span>
                                          {selected ? (
                                            <span className="flex items-center pl-3 text-indigo-700">
                                              <Check className="w-5 h-5" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                        <div className="space-y-1.5">
                          <Label label="User Segment" />
                          <Listbox value={isUserSegment} onChange={setIsUserSegment}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full inline-flex bg-white p-3.5 border border-slate-300 rounded-lg text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="flex items-center gap-2 text-slate-800 text-sm tracking-sm truncate">
                                  <Filter className="w-5 h-5 text-slate-500" />
                                  {isUserSegment.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                                  <svg
                                    className="w-5 h-5 text-gray-500"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M5 7.5L10 12.5L15 7.5"
                                      stroke="currentColor"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg z-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {userSegments.map((userSegment) => (
                                    <Listbox.Option
                                      key={userSegment.name}
                                      className={({ active }) =>
                                        `relative flex items-center justify-between select-none py-2.5 px-3.5 text-sm ${
                                          active ? 'bg-slate-100' : 'text-slate-900'
                                        }`
                                      }
                                      value={userSegment}>
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected ? 'font-medium' : 'font-normal'
                                            }`}>
                                            {userSegment.name}
                                          </span>
                                          {selected ? (
                                            <span className="flex items-center pl-3 text-indigo-700">
                                              <Check className="w-5 h-5" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                        <div className="space-y-2">
                          <Label label="Topic" />
                          <div className="space-y-3">
                            <div className="relative flex items-center">
                              <div className="flex items-center">
                                <input
                                  id="topics"
                                  name="topics"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-2">
                                <label
                                  htmlFor="topics"
                                  className="bg-gray-200 text-slate-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                                  Comments
                                </label>
                              </div>
                            </div>
                            <div className="relative flex items-center">
                              <div className="flex items-center">
                                <input
                                  id="topics"
                                  name="topics"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-2">
                                <label
                                  htmlFor="topics"
                                  className="bg-gray-200 text-slate-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                                  Comments
                                </label>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center gap-3 text-slate-400 py-2 text-sm tracking-sm"
                            onClick={() => setIsCreateNewTopic(!isCreateNewTopic)}>
                            <Plus className="w-4 h-4" />
                            Create new topic
                          </button>
                          {/* Create New Topic Modal */}
                          <CreateModal
                            show={isCreateNewTopic}
                            onClose={() => setIsCreateNewTopic(!isCreateNewTopic)}
                            cancelOnClick={() => setIsCreateNewTopic(!isCreateNewTopic)}
                            createOnClick={() => setIsCreateNewTopic(!isCreateNewTopic)}
                            icon={<ThreeStar className="w-6 h-6 text-green-600" />}
                            title="Create new topic"
                            description="Please enter a name for this topic."
                            label="Topic name"
                            id="topicName"
                            placeholder="e.g. New topic"
                          />
                        </div>
                        <hr className="my-8" />
                        <div className="space-y-2">
                          <Label label="Statuses" />
                          <div className="space-y-3">
                            <div className="relative flex items-center">
                              <div className="flex items-center">
                                <input
                                  id="underConsideration"
                                  name="statuses"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-2">
                                <label
                                  htmlFor="underConsideration"
                                  className="bg-red-50 text-red-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                                  Under Consideration
                                </label>
                              </div>
                            </div>
                            <div className="relative flex items-center">
                              <div className="flex items-center">
                                <input
                                  id="planned"
                                  name="statuses"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-2">
                                <label
                                  htmlFor="planned"
                                  className="bg-blue-50 text-blue-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                                  Planned
                                </label>
                              </div>
                            </div>
                            <div className="relative flex items-center">
                              <div className="flex items-center">
                                <input
                                  id="inDevelopment"
                                  name="statuses"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-2">
                                <label
                                  htmlFor="inDevelopment"
                                  className="bg-orange-50 text-orange-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                                  In Development
                                </label>
                              </div>
                            </div>
                            <div className="relative flex items-center">
                              <div className="flex items-center">
                                <input
                                  id="shipped"
                                  name="statuses"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-2">
                                <label
                                  htmlFor="shipped"
                                  className="bg-green-50 text-green-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                                  Shipped
                                </label>
                              </div>
                            </div>
                            <div className="relative flex items-center">
                              <div className="flex items-center">
                                <input
                                  id="complete"
                                  name="statuses"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-2">
                                <label
                                  htmlFor="complete"
                                  className="bg-purple-50 text-purple-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                                  Complete
                                </label>
                              </div>
                            </div>
                            <div className="relative flex items-center">
                              <div className="flex items-center">
                                <input
                                  id="closed"
                                  name="statuses"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-2">
                                <label
                                  htmlFor="closed"
                                  className="bg-neutral-100 text-neutral-700 p-2.5 py-1 text-sm tracking-sm rounded-full">
                                  Closed
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-8" />
                        <div className="relative">
                          <Select
                            isMulti
                            name="colors"
                            closeMenuOnSelect={false}
                            options={colorOptions}
                            className="basic-multi-select"
                            placeholder="Deneme"
                            classNamePrefix="select"
                            onChange={(choice) => setUserChoice(choice)}
                          />
                          <div>
                            {/* {userChoice.map((item) => (
                  <div>{item.label}</div>
                ))} */}
                            <MultiValueContainer />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
