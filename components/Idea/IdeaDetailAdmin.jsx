import { Disclosure, RadioGroup, Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import DeleteModal from '@/components/DeleteModal';
import { toggleFeedBackDetailModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { fileActions } from '@/redux/file/fileSlice';
import {
  Archive,
  Bug,
  ChevronUp,
  CircleCheck,
  Danger,
  Pen,
  Thumbtack,
  Trash,
  Merge
} from '../icons';

export default function IdeaDetailAdmin({ idea, setSelectedStatus, selectedStatus }) {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState();
  const [isPinned, setIsPinned] = useState();
  const [isArchived, setIsArchived] = useState();
  const [showOnRoadMap, setShowOnRoadMap] = useState();
  const coverImage = useSelector((state) => state.file.fileLink);
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
      setShowOnRoadMap(idea.showOnRoadMap);
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
  const handleAddCoverImage = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      dispatch(fileActions.uploadFileRequest({ file, name: `${idea.title}-coverImage` }));
    };
  };
  useEffect(() => {
    if (coverImage) {
      updateIdea({ coverImage });
    }
  }, [coverImage]);
  return (
    <>
      <div className="flex-shrink-0 w-72 bg-white dark:bg-aa-900 purple:bg-pt-1000 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400">
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 px-4 py-9 border-b border-slate-200 dark:border-aa-400 purple:border-pt-400">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-aa-200 purple:text-pt-200">
              Admin
            </h2>
          </div>
          <div className="flex flex-col flex-1 bg-slate-50 dark:bg-aa-800 purple:bg-pt-900 p-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="-mx-2 p-2 flex items-center justify-between rounded transition-colors duration-300 hover:bg-surface-10 outline-none cursor-pointer">
                    <span className="text-slate-900 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
                      Statuses
                    </span>
                    <ChevronUp
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-slate-500 dark:text-aa-200 purple:text-pt-200`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="">
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
                        <div>
                          {company?.statuses?.map((status) => (
                            <RadioGroup.Option
                              key={status._id}
                              value={status}
                              className="relative flex cursor-pointer py-3 focus:outline-none">
                              {({ checked }) => (
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center">
                                    <svg
                                      className="h-2.5 w-2.5 mr-1.5"
                                      fill={status.color}
                                      viewBox="0 0 8 8">
                                      <circle cx={4} cy={4} r={3} />
                                    </svg>
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium  ${
                                          checked || idea?.status?.name === status.name
                                            ? 'text-slate-400 dark:text-aa-400 purple:text-pt-400'
                                            : 'text-slate-900 dark:text-aa-100 purple:text-pt-100'
                                        }`}>
                                        {status.name}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                  {(checked || idea?.status?.name === status.name) && (
                                    <div className="flex-shrink-0 text-slate-900 dark:text-aa-100 purple:text-pt-100">
                                      <CircleCheck className="h-5 w-5" />
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
            <hr className="my-2 border-slate-200 dark:border-aa-400 purple:border-pt-400" />
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="-mx-2 p-2 flex items-center justify-between rounded transition-colors duration-300 hover:bg-surface-10 outline-none cursor-pointer">
                      <span className="text-slate-900 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
                        Visibility
                      </span>
                      <ChevronUp
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-slate-500 dark:text-aa-200 purple:text-pt-200`}
                      />
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
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
                          isPrivate
                            ? 'bg-indigo-600 dark:bg-aa-500 purple:bg-pt-600'
                            : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-aa-500 purple:focus:ring-pt-600 focus:ring-offset-2`}>
                        <span className="sr-only">Make Private</span>
                        <span
                          className={`${
                            isPrivate ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-aa-50 purple:bg-pt-300 shadow ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
                        Show Idea on Roadmap
                      </span>
                      <Switch
                        checked={isPrivate}
                        onChange={() => {
                          updateIdea({
                            showOnRoadMap: !showOnRoadMap
                          });
                          setShowOnRoadMap(!showOnRoadMap);
                        }}
                        className={`${
                          showOnRoadMap
                            ? 'bg-indigo-600 dark:bg-aa-500 purple:bg-pt-600'
                            : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-aa-500 purple:focus:ring-pt-600 focus:ring-offset-2`}>
                        <span className="sr-only">Make Private</span>
                        <span
                          className={`${
                            showOnRoadMap ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-aa-50 purple:bg-pt-300 shadow ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>
                    <div className="flex justify-between items-center gap-4 py-3">
                      <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
                        Cover Image
                      </span>
                      <button
                        type="button"
                        className="border border-slate-600 rounded px-2 py-1"
                        onClick={handleAddCoverImage}>
                        <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
                          Upload
                        </span>
                      </button>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <div className="bg-slate-50 dark:bg-aa-800 purple:bg-pt-900 p-6">
            <p className="text-slate-900 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
              Actions
            </p>
            <hr className="my-2 border-slate-200 dark:border-aa-400 purple:border-pt-400" />
            <div className="flex w-full flex-row space-x-2">
              <div className="inline-flex relative">
                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8"
                  title="Pin">
                  <Thumbtack
                    className={`w-4 h-4 hover:text-orange-500 ${
                      isPinned
                        ? 'text-orange-500'
                        : 'text-slate-600 dark:text-aa-300 purple:text-pt-300'
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
                  className="flex items-center justify-center w-8 h-8"
                  onClick={() => {
                    updateIdea({
                      isArchived: !isArchived
                    });
                    setIsArchived(!isArchived);
                  }}
                  title="Archive">
                  <Archive
                    className={`w-4 h-4 hover:text-yellow-500 ${
                      isArchived
                        ? 'text-yellow-500'
                        : 'text-slate-600 dark:text-aa-300 purple:text-pt-300'
                    }`}
                  />
                </button>
              </div>
              <div className="inline-flex relative">
                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8"
                  onClick={() => {
                    updateIdea({
                      isBug: !isBug
                    });
                    setIsBug(!isBug);
                  }}
                  title="Bug">
                  <Bug
                    className={`w-4 h-4 hover:text-red-500 ${
                      isBug ? 'text-red-500' : 'text-slate-600 dark:text-aa-300 purple:text-pt-300'
                    }`}
                  />
                </button>
              </div>
              <div className="inline-flex relative">
                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8"
                  onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                  title="Merge">
                  <Merge className="w-5 h-5 text-slate-600 dark:text-aa-300 purple:text-pt-300 hover:text-red-500" />
                </button>
              </div>
              <div className="inline-flex relative">
                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8"
                  onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                  title="Trash">
                  <Trash className="w-4 h-4 text-slate-600 dark:text-aa-300 purple:text-pt-300 hover:text-red-500" />
                </button>
              </div>
              <div className="inline-flex relative" aria-labelledby="idea-menu">
                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8"
                  onClick={() => {
                    dispatch(toggleFeedBackDetailModal());
                    dispatch(toggleFeedBackSubmitModal());
                  }}
                  title="Edit">
                  <Pen className="w-4 h-4 text-slate-600 dark:text-aa-300 purple:text-pt-300 hover:text-indigo-500" />
                </button>
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
