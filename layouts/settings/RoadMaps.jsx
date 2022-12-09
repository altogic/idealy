import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import SectionTitle from '@/components/SectionTitle';
import Input from '@/components/Input';
import Button from '@/components/Button';
import SettingsActionCard from '@/components/SettingsActionCard';
import EmptyState from '@/components/EmptyState';

export default function RoadMaps() {
  const createRoadMapSchema = new yup.ObjectSchema({
    name: yup.string().required('Roadmap name is required'),
    description: yup.string().required('Roadmap description is required')
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.company.companyRoadMapError);
  const loading = useSelector((state) => state.company.isLoading);
  const company = useSelector((state) => state.company.company);
  const [updateRoadMapLoading, setUpdateRoadMapLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createRoadMapSchema)
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('roadmap')) {
          setError('roadmap', {
            type: 'manuel',
            message: err.message
          });
        }
      });
    }
    if (!error) {
      reset();
    }
  }, [error, setError]);

  const formSubmit = (form) => {
    setUpdateRoadMapLoading(true);
    dispatch(
      companyActions.addItemToCompanySubLists({
        fieldName: 'roadmaps',
        value: {
          name: form.name,
          description: form.description
        }
      })
    );
    reset();
  };

  useEffect(() => {
    if (!loading) {
      setUpdateRoadMapLoading(false);
    }
  }, [loading]);

  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Roadmaps"
          sectionDescription="You can delete or rename your roadmaps"
          big
        />
      </div>
      <div className="lg:max-w-2xl">
        <div className="pb-6 mb-11 border-b border-slate-200">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="grid grid-cols-1 md:grid-cols-[500px,1fr] items-end gap-4">
            <div className="flex-1 space-y-4">
              <Input
                type="text"
                name="name"
                id="name"
                register={register('name')}
                error={errors.name}
                placeholder="Enter roadmap name"
              />
              <Input
                type="text"
                name="description"
                id="description"
                register={register('description')}
                error={errors.description}
                placeholder="Enter roadmap description"
              />
            </div>
            <div>
              <Button
                type="submit"
                text="Add roadmap"
                loading={updateRoadMapLoading}
                variant="indigo"
                size="sm"
                height="44"
                fullWidth
              />
            </div>
          </form>
        </div>
        <div>
          {company?.roadmaps.length > 0 ? (
            <div>
              {company?.roadmaps.map((roadmap) => (
                <SettingsActionCard
                  key={roadmap._id}
                  id={roadmap._id}
                  title={roadmap.name}
                  roadMapDescription={roadmap.description}
                  modalTitle="Delete Roadmaps"
                  modalDescription="Are you sure you want to delete this roadmap? This action cannot be undone."
                  deleteAction={() =>
                    dispatch(
                      companyActions.deleteCompanySubListsItem({
                        id: roadmap._id,
                        fieldName: 'roadmaps'
                      })
                    )
                  }
                  editAction={companyActions.updateCompanySubLists}
                  property="roadmaps"
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
    </>
  );
}
