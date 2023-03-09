import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Draggable, resetServerContext } from 'react-beautiful-dnd';
import { ThreeDot } from './icons';
import RoadMapCard from './RoadMapCard';

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0 0 ${grid}px 0`,
  position: isDragging ? 'absolute' : '',
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '',

  // styles we need to apply on draggables
  ...draggableStyle
});
export default function RoadmapSection({ status, ideas, provided, ...rest }) {
  resetServerContext();

  return (
    <div
      className="flex-shrink-0 w-[384px] p-6 border border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-lg"
      ref={provided.innerRef}
      {...provided.droppableProps}
      {...rest}>
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <div className="flex items-center gap-2">
          <svg className="h-2.5 w-2.5" fill={status?.color} viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>
          <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-base font-medium tracking-sm">
            {status?.name} <span className="font-normal">({ideas?.length || 0})</span>
          </span>
        </div>
        <div>
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
                      Hide from roadmap
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      type="button"
                      className="inline-flex items-center gap-3 text-slate-500 dark:text-aa-200 purple:text-pt-200 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                      Manage roadmap
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-y-auto space-y-4 max-h-[700px]">
        {!!ideas?.length &&
          ideas?.map((idea, index) => (
            <Draggable key={idea._id} draggableId={idea._id} index={index}>
              {(provided, snapshot) => (
                <RoadMapCard
                  idea={idea}
                  provided={provided}
                  style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                />
              )}
            </Draggable>
          ))}
      </div>
    </div>
  );
}
