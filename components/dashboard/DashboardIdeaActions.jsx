import useUpdateIdea from '@/hooks/useUpdateIdea';
import companyService from '@/services/company';
import ideaService from '@/services/idea';
import ToastMessage from '@/utils/toast';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncListbox from '../AsyncListbox';
import CategoryListbox from '../CategoryListbox';
import IdeaPriority from '../Idea/IdeaPriority';
import IdeaVisibility from '../Idea/IdeaVisibility';
import TopicSelection from '../Idea/TopicSelection';
import IdeaActions from '../Idea/admin/IdeaActions';
import IdeaApproval from '../IdeaApproval';
import Input from '../Input';
import StatusListbox from '../StatusListbox';
import { Copy } from '../icons';
import IdeaActionItem from './IdeaActionItem';

const formatOptionLabel = ({ label, value }) => {
  const name = label?.split(' ');
  return (
    <div className="flex items-center">
      {value.profilePicture ? (
        <img
          src={value.profilePicture}
          alt={label}
          className="rounded-full object-contain w-6 h-6"
        />
      ) : (
        name && (
          <div className="relative inline-flex items-center justify-center cursor-pointer overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  purple:bg-pt-300  w-6 h-6">
            <span className="font-medium text-slate-500 dark:text-aa-200 purple:text-pt-200 text-xs">
              {name[0]?.charAt(0).toUpperCase()}
              {name[1]?.charAt(0).toUpperCase()}
            </span>
          </div>
        )
      )}
      <span className="ml-2 text-slate-500 dark:text-aa-200 purple:text-pt-200">{label}</span>
    </div>
  );
};

export default function DashboardIdeaActions() {
  const company = useSelector((state) => state.company.company);
  const idea = useSelector((state) => state.idea.selectedIdea);
  const [copyText, setCopyText] = useState('');
  const [topics, setTopics] = useState(idea?.topics);

  const [ideaOwner, setIdeaOwner] = useState();
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
      setTopics(idea?.topics);
      setCopyText(`${company.subdomain}.idealy.io/public-view?feedback=${idea._id}`);
      setIdeaOwner({
        value: {
          _id: idea?.author?._id,
          name: idea?.author?.name || idea?.guestName || idea?.name,
          profilePicture: idea?.author?.profilePicture || idea?.guestProfilePicture,
          email: idea?.author?.email || idea?.guestEmail,
          isRegistered: !!idea?.author?.provider
        },
        label: idea?.author?.name || idea?.guestName || idea?.name
      });
    }
  }, [idea]);

  const updateIdeaTopics = (topics) => {
    updateIdea({
      topics,
      message: `<b>${idea.title}</b> topics updated to <b>${
        topics.length ? topics.join(',') : 'cleared'
      }</b>`
    });
  };
  const filterMembers = async (inputValue) => {
    if (inputValue) {
      const { data, errors } = await ideaService.searchCompanyMembers(company._id, inputValue);
      if (errors) {
        return [];
      }

      return data.map((member) => ({
        value: {
          _id: member._id,
          name: member.name,
          profilePicture: member.profilePicture,
          email: member.email,
          isRegistered: !!member.userId,
          userId: member?.userId
        },
        label: member.name
      }));
    }
    const { data: companyUsers } = await companyService.getCompanyUsers({
      filter: `this.companyId == '${company._id}'`
    });
    return companyUsers.result.map((member) => ({
      value: {
        _id: member._id,
        name: member.name,
        profilePicture: member.profilePicture,
        email: member.email,
        isRegistered: !!member.userId,
        userId: member?.userId
      },
      label: member.name
    }));
  };

  return (
    <div className="h-[calc(100vh-181px)] relative bg-slate-50 dark:bg-aa-900 purple:bg-pt-1000 border-l border-slate-200 dark:border-aa-600 purple:border-pt-800 shadow-xs">
      <div className="overflow-y-auto h-[calc(100%-49px)] pb-4">
        <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 mb-4 text-base font-semibold tracking-sm pt-6 px-6">
          Feedback Details
        </h2>
        <div className="space-y-8 px-4" name="publicLink">
          <IdeaActionItem label="Public Link">
            <div className="flex h-10">
              <Input
                type="text"
                name="publicLink"
                id="publicLink"
                value={copyText}
                onChange={handleCopyText}
                disabled
                postfix={
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex h-full items-center gap-2  text-slate-700 text-sm font-medium tracking-sm ">
                    <Copy className="w-5 h-5 icon" />
                    <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200">Copy</span>
                  </button>
                }
              />
            </div>
          </IdeaActionItem>
          {!idea?.isApproved && (
            <IdeaActionItem label="Approval" name="approval">
              <IdeaApproval />
            </IdeaActionItem>
          )}
          <IdeaActionItem label="Statuses" name="status">
            <StatusListbox size="xxl" />
          </IdeaActionItem>
          <IdeaActionItem label="Categories" name="category">
            <CategoryListbox size="xxl" />
          </IdeaActionItem>

          <IdeaActionItem label="Owner" name="owner">
            <AsyncListbox
              loadOptions={filterMembers}
              placeholder="Search for an member"
              defaultValue={ideaOwner}
              onChange={(res) => {
                if (!res) {
                  setIdeaOwner(null);
                  return;
                }
                const { value } = res;
                setIdeaOwner(res);

                if (value.isRegistered) {
                  updateIdea({ author: value.userId });
                } else {
                  updateIdea({
                    author: null,
                    guestName: value.name,
                    guestAvatar: value.profilePicture,
                    guestEmail: value.email
                  });
                }
              }}
              onFocus={() => setIdeaOwner(null)}
              onBlur={() =>
                setIdeaOwner({
                  value: {
                    _id: idea?.author?._id,
                    name: idea?.author?.name || idea?.guestName || idea?.name,
                    profilePicture: idea?.author?.profilePicture || idea?.guestProfilePicture,
                    email: idea?.author?.email || idea?.guestEmail,
                    isRegistered: !!idea?.author?.provider
                  },
                  label: idea?.author?.name || idea?.guestName || idea?.name
                })
              }
              formatOptionLabel={formatOptionLabel}
            />
          </IdeaActionItem>
          <IdeaActionItem label="Topics" name="topic">
            <TopicSelection topics={topics} setTopics={setTopics} update={updateIdeaTopics} />
          </IdeaActionItem>
          <IdeaActionItem name="roadmap">
            <IdeaVisibility listBoxSize="xxl" />
          </IdeaActionItem>
          <IdeaActionItem name="priority">
            <IdeaPriority />
          </IdeaActionItem>
        </div>
      </div>
      <IdeaActions dashboard />
    </div>
  );
}
