import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import SectionTitle from '@/components/SectionTitle';
import SettingsActionCard from '@/components/SettingsActionCard';
import { companyActions } from '@/redux/company/companySlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddANewRoadMap from '@/components/AddANewRoadMap';

export default function RoadMaps() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.company.isLoading);
  const company = useSelector((state) => state.company.company);
  const [updateRoadMapLoading, setUpdateRoadMapLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editedRoadmap, setEditedRoadmap] = useState(null);

  useEffect(() => {
    if (!loading) {
      setUpdateRoadMapLoading(false);
    }
  }, [loading]);

  return (
    <>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Roadmaps"
          sectionDescription="You can delete or rename your roadmaps"
          big
        />
      </div>
      <div className="lg:max-w-2xl">
        <div className="pb-6 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <Button
            text="Add roadmap"
            loading={updateRoadMapLoading}
            variant="indigo"
            size="sm"
            height="44"
            onClick={() => setOpenCreateModal(true)}
          />
        </div>
        <div>
          {company?.roadmaps.length > 0 ? (
            <div>
              {company?.roadmaps.map((roadmap) => (
                <SettingsActionCard
                  key={roadmap._id}
                  id={roadmap._id}
                  title={roadmap.name}
                  description={roadmap.description}
                  modalTitle="Delete Roadmaps"
                  modalDescription="Are you sure you want to delete this roadmap? This action cannot be undone."
                  isPublic={roadmap.isPublic}
                  deleteAction={() =>
                    dispatch(
                      companyActions.deleteCompanySubListsItem({
                        id: roadmap._id,
                        fieldName: 'roadmaps'
                      })
                    )
                  }
                  onEdit={() => {
                    setEditedRoadmap(roadmap);
                    setOpenCreateModal(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No data found"
              description="You have not create any roadmaps yet. Roadmaps help you to plan the activities on a timeline and communicate your upcoming product releases."
            />
          )}
        </div>
      </div>
      <AddANewRoadMap
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        cancelOnClick={() => setOpenCreateModal(false)}
        editedRoadmap={editedRoadmap}
        setEditedRoadmap={setEditedRoadmap}
      />
    </>
  );
}
