import { Fragment, useState } from 'react';
import Head from 'next/head';
import RoadMapCard from '@/components/RoadMapCard';
import AddANewRoadMap from '@/components/AddANewRoadMap';
import { Listbox, Menu, Transition } from '@headlessui/react';
import { ThreeStar, Plus, ThreeDot, ChevronDown } from '@/components/icons';
import Layout from '@/components/Layout';

const roadmapFilter = [
  { name: 'Roadmap One' },
  { name: 'Roadmap Two' },
  { name: 'Roadmap Three' },
  { name: 'Roadmap Four' },
  { name: 'Roadmap Five' }
];

export default function RoadMapAdmin() {
  const [selected, setSelected] = useState(roadmapFilter[0]);
  const [isCreate, setIsCreate] = useState(false);

  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Roadmap Admin Page</title>
        <meta name="description" content="Altogic Canny Alternative Roadmap Admin Page" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto my-14">
          <div>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative">
                <Listbox.Button className="relative w-full inline-flex items-center bg-white mb-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                  <span className="block text-slate-800 text-3xl font-semibold truncate">
                    {selected.name}
                  </span>
                  <ChevronDown className="w-5 h-5 ml-3 text-slate-900" />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options className="absolute max-w-[300px] w-full bg-white p-4 rounded-lg shadow-lg z-50 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <div className="max-h-[180px] mb-5 border border-gray-100 rounded-lg overflow-auto">
                      {roadmapFilter.map((item) => (
                        <Listbox.Option
                          key={item.name}
                          className={({ active }) =>
                            `relative flex items-center justify-between text-base tracking-sm cursor-default select-none px-3.5 py-2.5 ${
                              active ? 'bg-slate-50' : 'text-slate-900'
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
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-3 text-slate-400 py-2"
                      onClick={() => setIsCreate(!isCreate)}>
                      <Plus className="w-4 h-4" />
                      Add a new roadmap
                    </button>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            {/* Add a New RoadMap Modal */}
            <AddANewRoadMap
              show={isCreate}
              onClose={() => setIsCreate(!isCreate)}
              cancelOnClick={() => setIsCreate(!isCreate)}
              createOnClick={() => setIsCreate(!isCreate)}
              icon={<ThreeStar className="w-6 h-6 text-green-600" />}
              title="Create new roadmap"
              description="Please enter a name for this roadmap."
            />
            <p className="text-gray-500 text-sm tracking-sm">Roadmap description here....</p>
          </div>
        </div>
        <div className="flex flex-nowrap items-start gap-8 mb-14 pb-4 overflow-x-auto">
          <div className="flex-shrink-0 max-w-[384px] p-6 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <svg className="h-2.5 w-2.5 text-red-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <span className="text-slate-700 text-base font-medium tracking-sm">
                  Under Consideration <span className="font-normal">(3)</span>
                </span>
              </div>
              <div>
                <Menu
                  as="div"
                  className="inline-flex items-center relative pl-2 border-l border-slate-200">
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
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Hide from roadmap
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Manage roadmap
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="flex flex-col max-h-[700px] overflow-y-auto divide-y divide-slate-200">
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 max-w-[384px] p-6 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <svg className="h-2.5 w-2.5 text-blue-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <span className="text-slate-700 text-base font-medium tracking-sm">
                  Planned <span className="font-normal">(15)</span>
                </span>
              </div>
              <div>
                <Menu
                  as="div"
                  className="inline-flex items-center relative pl-2 border-l border-slate-200">
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
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Hide from roadmap
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Manage roadmap
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="flex flex-col max-h-[700px] overflow-y-auto divide-y divide-slate-200">
              <div className="py-4 last:pb-0">
                <RoadMapCard
                  image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                  score="5"
                  title="At venenatis leo fringilla eu nec."
                />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 max-w-[384px] p-6 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <svg className="h-2.5 w-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <span className="text-slate-700 text-base font-medium tracking-sm">
                  In Development <span className="font-normal">(15)</span>
                </span>
              </div>
              <div>
                <Menu
                  as="div"
                  className="inline-flex items-center relative pl-2 border-l border-slate-200">
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
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Hide from roadmap
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Manage roadmap
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="flex flex-col max-h-[700px] overflow-y-auto divide-y divide-slate-200">
              <div className="py-4 last:pb-0">
                <RoadMapCard
                  image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                  score="5"
                  title="At venenatis leo fringilla eu nec."
                />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 max-w-[384px] p-6 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <svg className="h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <span className="text-slate-700 text-base font-medium tracking-sm">
                  Shipped <span className="font-normal">(15)</span>
                </span>
              </div>
              <div>
                <Menu
                  as="div"
                  className="inline-flex items-center relative pl-2 border-l border-slate-200">
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
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Hide from roadmap
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Manage roadmap
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="flex flex-col max-h-[700px] overflow-y-auto divide-y divide-slate-200">
              <div className="py-4 last:pb-0">
                <RoadMapCard
                  image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                  score="5"
                  title="At venenatis leo fringilla eu nec."
                />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 max-w-[384px] p-6 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <svg className="h-2.5 w-2.5 text-slate-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <span className="text-slate-700 text-base font-medium tracking-sm">
                  Complete <span className="font-normal">(15)</span>
                </span>
              </div>
              <div>
                <Menu
                  as="div"
                  className="inline-flex items-center relative pl-2 border-l border-slate-200">
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
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Hide from roadmap
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            className="inline-flex items-center gap-3 text-slate-500 p-4 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium">
                            Manage roadmap
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="flex flex-col max-h-[700px] overflow-y-auto divide-y divide-slate-200">
              <div className="py-4 last:pb-0">
                <RoadMapCard
                  image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                  score="5"
                  title="At venenatis leo fringilla eu nec."
                />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
              <div className="py-4 last:pb-0">
                <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
