import { Disclosure, RadioGroup, Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import DeleteModal from '@/components/DeleteModal';
import { toggleFeedBackDetailModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { Archive, Bug, ChevronUp, CircleCheck, Danger, Pen, Thumbtack, Trash } from '../icons';

export default function IdeaDetailAdmin({ idea, setSelectedStatus, selectedStatus }) {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState();
  const [isPinned, setIsPinned] = useState();
  const [isArchived, setIsArchived] = useState();
  const [isBug, setIsBug] = useState();
  const handleDelete = () => {
    dispatch(ideaActions.deleteIdea(idea._id));
    dispatch(toggleFeedBackDetailModal());
  };
  useEffect(() => {
    if (idea) {
      setSelectedStatus(idea.status);
      setIsPrivate(idea.isPrivate);
      setIsPinned(idea.isPinned);
      setIsArchived(idea.isArchived);
      setIsBug(idea.isBug);
    }
  }, [idea]);

  const updateIdea = (req) => {
    dispatch(
      ideaActions.updateIdea({
        _id: idea._id,
        ...req
      })
    );
  };
  return (
    <>
      <div className="flex-shrink-0 w-72 bg-gray-50 border-r-2 border-gray-200">
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 px-4 py-6 bg-white border-b-2 border-gray-200">
            <div className="flex items-center">
              <h2 className="text-lg font-medium text-slate-900 dark:text-aa-200 purple:text-pt-200">
                Admin
              </h2>
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-y-scroll p-4">
            <Disclosure className="">
              {({ open }) => (
                <>
                  <Disclosure.Button className="-mx-2 p-2 flex items-center justify-between rounded transition-colors duration-300 hover:bg-surface-10 outline-none cursor-pointer">
                    <span>Statuses</span>
                    <ChevronUp
                      className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-slate-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-slate-500">
                    <div className="flex flex-col gap-4">
                      <RadioGroup
                        value={selectedStatus}
                        onChange={(status) => {
                          updateIdea({
                            status: status._id,
                            statusUpdatedAt: Date.now(),
                            isCompleted: status.isCompletedStatus
                          });
                          setSelectedStatus(status);
                        }}>
                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                        <div className="space-y-2">
                          {company?.statuses?.map((status) => (
                            <RadioGroup.Option
                              key={status._id}
                              value={status}
                              className={({ active, checked }) => `${
                                active || selectedStatus?._id === status._id
                                  ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300'
                                  : ''
                              }
                                        ${
                                          checked || selectedStatus?._id === status._id
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-white'
                                        } relative flex cursor-pointer rounded-lg p-2 shadow-md focus:outline-none`}>
                              {({ checked }) => (
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium  ${
                                          checked || selectedStatus?._id === status._id
                                            ? 'text-white'
                                            : 'text-gray-900'
                                        }`}>
                                        {status.name}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                  {(checked || selectedStatus?._id === status._id) && (
                                    <div className="shrink-0 text-white">
                                      <CircleCheck className="h-6 w-6" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="-mx-2 p-2 flex items-center justify-between rounded transition-colors duration-300 hover:bg-surface-10 outline-none cursor-pointer">
                      <span>Visibility</span>
                      <ChevronUp
                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-slate-500`}
                      />
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-slate-500">
                    <div className="flex justify-between gap-4">
                      <span className="text-xs font-medium text-gray-900">
                        Make {isPrivate ? 'Public' : 'Private'}
                      </span>
                      <Switch
                        checked={isPrivate}
                        onChange={() => {
                          updateIdea({
                            isPrivate: !isPrivate
                          });
                          setIsPrivate(!isPrivate);
                        }}
                        className={`${
                          isPrivate ? 'bg-indigo-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}>
                        <span className="sr-only">Make Private</span>
                        <span
                          className={`${
                            isPrivate ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <div className="flex p-4 sm:px-8">
            <div className="flex flex-col space-y-2">
              <p className="text-0.75 font-semibold text-text-medium">Actions</p>
              <div className="flex w-full flex-row space-x-2">
                <div className="inline-flex relative">
                  <button type="button" className="flex p-2 rounded border border-slate-400">
                    <Thumbtack
                      className={`w-4 h-4 hover:text-orange-500 ${
                        isPinned ? 'text-orange-500' : 'text-slate-500'
                      }`}
                      onClick={() => {
                        updateIdea({
                          isPinned: !isPinned
                        });
                        setIsPinned(!isPinned);
                      }}
                    />
                  </button>
                </div>
                <div className="inline-flex relative">
                  <button
                    type="button"
                    className="flex p-2 rounded border border-slate-400"
                    onClick={() => {
                      updateIdea({
                        isArchived: !isArchived
                      });
                      setIsArchived(!isArchived);
                    }}>
                    <Archive
                      className={`w-4 h-4 hover:text-yellow-500 ${
                        isArchived ? 'text-yellow-500' : 'text-slate-500'
                      }`}
                    />
                  </button>
                </div>
                <div className="inline-flex relative">
                  <button
                    type="button"
                    className="flex p-2 rounded border border-slate-400"
                    onClick={() => {
                      updateIdea({
                        isBug: !isBug
                      });
                      setIsBug(!isBug);
                    }}>
                    <Bug
                      className={`w-4 h-4 hover:text-red-500 ${
                        isBug ? 'text-red-500' : 'text-slate-500'
                      }`}
                    />
                  </button>
                </div>
                <div className="inline-flex relative">
                  <button
                    type="button"
                    className="flex p-2 rounded border border-slate-400"
                    onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
                    <Trash className="w-4 h-4 hover:text-red-500" />
                  </button>
                </div>
                <div className="inline-flex relative" aria-labelledby="idea-menu">
                  <button
                    type="button"
                    className="flex p-2 rounded border border-slate-400"
                    onClick={() => {
                      dispatch(toggleFeedBackDetailModal());
                      dispatch(toggleFeedBackSubmitModal());
                    }}>
                    <Pen className="w-4 h-4 hover:text-indigo-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        cancelOnClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        deleteOnClick={handleDelete}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete Idea"
        description="Are you sure you want to delete this idea? This action cannot be undone."
      />
    </>
  );
}
