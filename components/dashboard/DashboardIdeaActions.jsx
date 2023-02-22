import Label from '@/components/Label';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import ToastMessage from '@/utils/toast';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseListBox from '../BaseListBox';
import { Copy } from '../icons';
import IdeaActions from '../Idea/admin/IdeaActions';
import IdeaPriority from '../Idea/IdeaPriority';
import IdeaVisibility from '../Idea/IdeaVisibility';
import Input from '../Input';

export default function DashboardIdeaActions() {
  const [status, setStatus] = useState();
  const [category, setCategory] = useState();
  const [owner, setOwner] = useState();
  const [roadMap, setRoadMap] = useState();
  const [copyText, setCopyText] = useState('');
  const company = useSelector((state) => state.company.company);
  const companyUsers = useSelector((state) => state.company.companyUsers);
  const idea = useSelector((state) => state.idea.selectedIdea);
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
      setOwner({
        name: idea?.author?.name || idea?.guestName || idea?.name,
        profilePicture: idea?.author?.profilePicture || idea?.guestAvatar
      });
      setRoadMap(idea?.roadmap);
    }
  }, [idea]);
  useEffect(() => {
    if (idea) {
      setCopyText(`${company.subdomain}.idealy.io/public-view?feedback=${idea._id}`);
    }
  }, [idea]);
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
            mobileSize="auto"
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
            mobileSize="auto"
            hidden="mobile"
          />
        </div>
        <div>
          <Label label="Owner" />
          <BaseListBox
            value={owner}
            label={owner?.name}
            onChange={(value) => {
              setOwner(value);
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
            field="name"
            options={companyUsers}
            size="xxl"
            mobileSize="auto"
            hidden="mobile"
            type="user"
          />
        </div>
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
            mobileSize="auto"
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
