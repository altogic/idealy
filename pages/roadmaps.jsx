import AddANewRoadMap from '@/components/AddANewRoadMap';
import BaseListBox from '@/components/BaseListBox';
import { ThreeStar, Plus } from '@/components/icons';
import Layout from '@/components/Layout';
import RoadmapSection from '@/components/RoadmapSection';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

const dummy = {
  '63b7df7096e6d5db165a0694': [
    {
      _id: '63f0d1045089920254f44726',
      createdAt: '2023-02-18T13:22:12.471Z',
      updatedAt: '2023-03-08T14:48:55.734Z',
      title: "I'll Reboot the 1080p SMS Sensor, That Should Firewall the AI Protocol!",
      topics: ['Development', 'Misc', 'Design'],
      status: '63b7df7096e6d5db165a0694',
      voteCount: 0,
      order: 1
    }
  ],
  'no-status': [
    {
      _id: '63f0d1043cca9914f9030775',
      createdAt: '2023-02-18T13:22:12.485Z',
      updatedAt: '2023-03-08T14:56:40.553Z',
      title: 'The TLS Program Is Down, Input the Digital Pixel So We Can Input the CSS Array!',
      topics: ['Development', 'Misc', 'Design'],
      voteCount: 0,
      order: 1
    },
    {
      _id: '63f0d1045089920254f44727',
      createdAt: '2023-02-18T13:22:12.500Z',
      updatedAt: '2023-03-08T14:56:54.659Z',
      title: "I'll Hack the Redundant SMTP Monitor, That Should Driver the SCSI Bus!",
      topics: ['Development', 'Misc', 'Design'],
      voteCount: 0,
      order: 2
    },
    {
      _id: '63f0d10406717e96f4c1f75d',
      createdAt: '2023-02-18T13:22:12.542Z',
      updatedAt: '2023-03-08T14:56:50.880Z',
      title: 'Use the Wireless SCSI Matrix, Then You Can Reboot the Neural System!',
      topics: ['Development', 'Misc', 'Design'],
      voteCount: 0,
      order: 3
    }
  ],
  '63b7df7096e6d5db165a0693': [
    {
      _id: '63f0d1055089920254f44892',
      createdAt: '2023-02-18T13:22:13.143Z',
      updatedAt: '2023-03-03T11:40:42.373Z',
      title: 'Try to Back Up the PCI Program, Maybe It Will Connect the Multi-Byte Bandwidth!',
      topics: ['Development', 'Misc', 'Design'],
      status: '63b7df7096e6d5db165a0693',
      voteCount: 0,
      order: 1
    }
  ]
};
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightgrey' : ''
});

export default function RoadMapAdmin() {
  const [isCreate, setIsCreate] = useState(false);
  const { company } = useSelector((state) => state.company);
  const [roadmap, setRoadmap] = useState(company?.roadmaps?.[0]);
  const [state, setState] = useState(dummy);
  useEffect(() => {
    if (company) {
      setRoadmap(company?.roadmaps[0]);
    }
  }, [company]);
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = state;
      newState[sInd] = items;
      setState(newState);
    } else {
      const destinationList = state[dInd] || [];
      const result = move(state[sInd], destinationList, source, destination);
      const newState = state;
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      // setState(newState.filter((group) => group.length));
    }
  };
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Roadmap Admin Page</title>
        <meta name="description" content="Altogic Canny Alternative Roadmap Admin Page" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto my-14">
          <div className="space-y-2">
            <BaseListBox
              value={roadmap}
              label={roadmap?.name}
              onChange={setRoadmap}
              field="name"
              options={company?.roadmaps}
              size="xxl"
              type="create">
              <button
                type="button"
                className="inline-flex items-center gap-3 text-slate-400 py-2"
                onClick={() => setIsCreate(!isCreate)}>
                <Plus className="w-4 h-4" />
                Add a new roadmap
              </button>
            </BaseListBox>
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
            <p className="text-slate-500 dark:text-aa-200 purple:text-pt-200text-sm tracking-sm">
              {roadmap?.description}
            </p>
          </div>
        </div>
        <div className="flex flex-nowrap items-start gap-8 mb-14 pb-4 overflow-x-auto relative">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="no-status" index={0}>
              {(provided, snapshot) => (
                <>
                  <RoadmapSection
                    status={{
                      name: 'No Status',
                      color: '#000000',
                      _id: 'no-status'
                    }}
                    ideas={state['no-status']}
                    provided={provided}
                    style={getListStyle(snapshot.isDraggingOver)}
                  />

                  {provided.placeholder}
                </>
              )}
            </Droppable>
            {company?.statuses.map((status, index) => (
              <Droppable key={status._id} droppableId={status._id} index={index + 1}>
                {(provided, snapshot) => (
                  <>
                    <RoadmapSection
                      status={status}
                      ideas={state[status._id]}
                      provided={provided}
                      style={getListStyle(snapshot.isDraggingOver)}
                    />
                    {provided.placeholder}
                  </>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </Layout>
    </>
  );
}
