import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import useRouteIdea from '@/hooks/useRouteIdea';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import useUpdateEffect from '@/hooks/useUpdatedEffect';
import TopicBadges from './TopicBadges';
import { ThreeDot } from './icons';

export default function RoadMapCard({ idea, provided, ...rest }) {
  const routeIdea = useRouteIdea();
  const dispatch = useDispatch();
  const [voteCount, setVoteCount] = useState(0);
  const { selectedIdea } = useSelector((state) => state.idea);
  const handleClickIdea = () => {
    routeIdea(idea._id);
    dispatch(ideaActions.setSelectedIdea(idea));
    dispatch(toggleFeedBackDetailModal());
  };
  useUpdateEffect(() => {
    if (selectedIdea && selectedIdea._id === idea._id) {
      setVoteCount(selectedIdea.voteCount);
    }
  }, [selectedIdea]);

  useEffect(() => {
    if (idea) {
      setVoteCount(idea.voteCount);
    }
  }, [idea]);

  return (
    <button type="button" onClick={handleClickIdea}>
      <div
        className="p-4 border border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-lg mt-2 text-left"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        {...rest}>
        {idea?.coverImage && (
          <img
            src={idea?.coverImage}
            className="w-full h-[135px] mb-4 object-cover rounded-lg"
            alt={idea?.title}
          />
        )}

        <div className="flex gap-3.5">
          <span className="inline-flex items-center justify-center flex-shrink-0 w-[50px] h-[50px] text-indigo-700 dark:text-aa-200 purple:text-pt-200 text-2xl font-semibold tracking-md border-2 border-slate-300 rounded-lg">
            {voteCount}
          </span>
          <div>
            <div className="flex items-start justify-between gap-3.5">
              <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 mb-5 text-base font-semibold tracking-sm">
                {idea?.title}
              </h6>
              <Menu
                as="div"
                className="inline-flex items-center relative pl-2 border-l border-slate-200 dark:border-aa-600 purple:border-pt-800">
                <div className="inline-flex items-center">
                  <Menu.Button className="inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <ThreeDot className="w-6 h-6 text-slate-400" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="flex flex-col absolute right-0 top-8 w-56 origin-top-right rounded-lg bg-white shadow-lg overflow-hidden z-50 ring-1 ring-gray-100 focus:outline-none">
                    <div className="flex flex-col divide-y divide-gray-200">
                      <Menu.Item>
                        <button
                          type="button"
                          className="inline-flex items-center gap-3 text-slate-500 dark:text-aa-200 purple:text-pt-200 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                          Add cover image
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          type="button"
                          className="inline-flex items-center gap-3 text-slate-500 dark:text-aa-200 purple:text-pt-200 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                          Hide from Roadmap
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          type="button"
                          className="inline-flex items-center gap-3 text-slate-500 dark:text-aa-200 purple:text-pt-200 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                          Manage
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {idea?.topics.map((topic) => (
                <TopicBadges key={topic} badgeName={topic} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
