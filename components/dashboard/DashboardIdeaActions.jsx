import Label from '@/components/Label';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import ideaService from '@/services/idea';
import ToastMessage from '@/utils/toast';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import BaseListBox from '../BaseListBox';
import { Copy } from '../icons';
import IdeaActions from '../Idea/admin/IdeaActions';
import IdeaPriority from '../Idea/IdeaPriority';
import IdeaVisibility from '../Idea/IdeaVisibility';
import TopicSelection from '../Idea/TopicSelection';
import Input from '../Input';

const memberSelectStyles = {
  control: (provided) => ({
    ...provided,
    width: '100%',
    border: 'none',
    '&:hover': {
      borderColor: '#e4e4e4'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#e4e4e4' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#e4e4e4'
    }
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999
  }),
  input: (provided) => ({
    ...provided,
    color: 'black',
    width: '100%',
    height: '100%'
  })
};

export default function DashboardIdeaActions() {
  const company = useSelector((state) => state.company.company);

  const idea = useSelector((state) => state.idea.selectedIdea);
  const [status, setStatus] = useState();
  const [category, setCategory] = useState();

  const [roadMap, setRoadMap] = useState();
  const [copyText, setCopyText] = useState('');
  const [topics, setTopics] = useState();
  const [segments, setSegments] = useState();

  const updateIdea = useUpdateIdea(idea);

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = () => {
    copy(copyText);
    ToastMessage.success('Link copied to clipboard');
  };

  useEffect(() => {
    if (idea) {
      setStatus(idea?.status);
      setCategory(idea?.category);
      setRoadMap(idea?.roadmap);
      setTopics(idea?.topics);
      setSegments(idea?.userSegment);
    }
  }, [idea]);
  useEffect(() => {
    if (idea) {
      setCopyText(`${company.subdomain}.idealy.io/public-view?feedback=${idea._id}`);
    }
  }, [idea]);

  const updateIdeaTopics = (topics) => {
    updateIdea({
      topics
    });
  };
  const filterMembers = async (inputValue) => {
    const { data, errors } = await ideaService.searchCompanyMembers(company._id, inputValue);
    if (errors) {
      return [];
    }
    const response = [...data.members, ...data.users];

    return response.map((member) => ({
      value: {
        _id: member._id,
        name: member.name,
        profilePicture: member.profilePicture,
        email: member.email,
        isRegistered: !!member.provider
      },
      label: member.name
    }));
  };

  return (
    <div className="h-[calc(100vh-181px)] p-6 overflow-y-auto">
      <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 mb-4 text-base font-semibold tracking-sm">
        Feedback Details
      </h2>
      <div className="space-y-4">
        <div>
          <Label label="Public Link" />
          <div className="flex h-10">
            <Input
              type="text"
              name="publicLink"
              id="publicLink"
              value={copyText}
              onChange={handleCopyText}
              disabled
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex h-full items-center gap-2  text-slate-700 px-2 py-[21px] text-sm font-medium tracking-sm border border-l-0 border-gray-300 dark:border-aa-600 purple:border-pt-800 rounded-r-md">
              <Copy className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
              <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200">Copy</span>
            </button>
          </div>
        </div>
        <div>
          <Label label="Status" />
          <BaseListBox
            value={status}
            label={status?.name}
            onChange={(value) => {
              setStatus(value);
              updateIdea({ status: value._id });
            }}
            field="name"
            options={company?.statuses}
            size="xxl"
            hidden="mobile"
            type="status"
          />
        </div>
        <div>
          <Label label="Category" />
          <BaseListBox
            value={category}
            label={category?.name}
            onChange={(value) => {
              setCategory(value);
              updateIdea({ category: value._id });
            }}
            field="name"
            options={company?.categories}
            size="xxl"
            hidden="mobile"
          />
        </div>
        <div>
          <Label label="User Segments" />
          <BaseListBox
            value={segments}
            label={segments?.name}
            onChange={(value) => {
              setSegments(value);
              updateIdea({ userSegments: value._id });
            }}
            field="name"
            options={company?.userSegments}
            size="xxl"
            hidden="mobile"
          />
        </div>
        <div>
          <Label label="Owner" />

          <AsyncSelect
            className="relative flex items-center bg-white dark:bg-aa-700 purple:bg-pt-700 justify-between gap-2 w-full border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm min-w-[auto] md:min-w-[300px] py-1"
            cacheOptions
            defaultOptions
            defaultValue={idea?.author?.name || idea?.guestName || idea?.name}
            loadOptions={filterMembers}
            placeholder="Search for an member"
            isClearable
            onChange={({ value }) => {
              if (value.isRegistered) {
                updateIdea({ author: value._id });
              } else {
                updateIdea({
                  guestName: value.name,
                  guestAvatar: value.profilePicture,
                  guestEmail: value.email
                });
              }
            }}
            styles={memberSelectStyles}
          />
        </div>
        {!!topics?.length && (
          <div>
            <Label label="Topics" />
            <TopicSelection topics={topics} setTopics={setTopics} update={updateIdeaTopics} />
          </div>
        )}
        <div>
          <Label label="Roadmap" />
          <BaseListBox
            value={roadMap}
            label={roadMap?.name}
            onChange={(value) => {
              setRoadMap(value);
              updateIdea({ roadMap: value._id });
            }}
            field="name"
            options={company?.roadmaps}
            size="xxl"
            hidden="mobile"
          />
        </div>
        <div>
          <Label label="Priority" />
          <IdeaPriority />
        </div>
        <div>
          <Label label="Visibility" />
          <IdeaVisibility />
        </div>

        <IdeaActions dashboard />
      </div>
    </div>
  );
}
