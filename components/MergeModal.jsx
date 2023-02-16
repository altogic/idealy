import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import ideaService from '@/services/idea';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import * as yup from 'yup';
import { Merge } from './icons';

export default function MergeModal({ openMergeModal, setOpenMergeModal }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.idea.isLoading);
  const company = useSelector((state) => state.company.company);
  const idea = useSelector((state) => state.idea.selectedIdea);

  const schema = yup.object().shape({
    baseIdea: yup.string().required('Base idea is required'),
    consent: yup.boolean().oneOf([true], 'You must agree to merge ideas')
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });
  const filterIdeas = async (inputValue) => {
    const { data, errors } = await ideaService.searchSimilarIdeas(inputValue, company._id, true);
    if (errors) {
      return [];
    }
    return data.map((idea) => ({ value: idea._id, label: idea.title }));
  };
  const handleMerge = (data) => {
    dispatch(
      ideaActions.mergeIdeas({
        ...data,
        mergedIdea: idea._id,
        onSuccess: () => {
          setOpenMergeModal(false);
          reset();
          router.push(
            {
              pathname: router.pathname,
              query: {
                ...router.query,
                feedback: data.baseIdea
              }
            },
            undefined,
            { scroll: false }
          );
        }
      })
    );
  };
  return (
    <Modal open={openMergeModal} onClose={() => setOpenMergeModal(false)} size="xl">
      <div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 mb-8 lg:mb-4">
          <span className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full ring-8 bg-gray-200 dark:bg-aa-200 purple:bg-pt-200  ring-gray-100 dark:ring-aa-100 purple:ring-pt-100">
            <Merge className="w-5 h-5 text-gray-500 dark:text-aa-100 purple:text-pt-100" />
          </span>

          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
              Merge Idea
            </h2>
            <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
              Merging an idea will move all votes, comments, and attachments to the selected idea.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleMerge)} className="px-16 mt-8">
          <AsyncSelect
            cacheOptions
            loadOptions={filterIdeas}
            defaultOptions
            placeholder="Search for an idea"
            className="w-full"
            isLoading={loading}
            isClearable
            onChange={(idea) => {
              if (idea) {
                setValue('baseIdea', idea.value);
              } else {
                setValue('baseIdea', '');
              }
            }}
          />
          {errors?.baseIdea && (
            <span className="inline-block text-sm text-red-600 dark:text-red-500 purple:text-red-500 mt-2">
              {errors.baseIdea.message}
            </span>
          )}
          <div className="flex items-center mt-10">
            <Input
              id="consent"
              aria-describedby="consent"
              name="consent"
              type="checkbox"
              register={register('consent')}
              error={errors.consent}
              label="Votes will combine with the winning idea."
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:focus:aa-indigo-500 purple:focus:ring-pt-500 dark:bg-aa-800 purple:bg-pt-800 checked:bg-aa-600 checked:purple:bg-pt-600 "
            />
          </div>
          <div className="flex justify-end gap-2 my-8">
            <Button
              type="button"
              text="Cancel"
              variant="blank"
              onClick={() => {
                setOpenMergeModal(false);
                reset();
              }}
            />
            <Button type="submit" variant="indigo" text="Submit" loading={loading} />
          </div>
        </form>
      </div>
    </Modal>
  );
}