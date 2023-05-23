import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from '@/components/TextArea';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { companyActions } from '@/redux/company/companySlice';

export default function SecondWizard() {
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.company.idea);
  const ideaDescription = useSelector((state) => state.company.ideaDescription);
  const error = useSelector((state) => state.company.error);

  const schema = yup.object().shape({
    idea: yup.string().max(140, 'Title must be under 140 character').required('Idea is required'),
    ideaDescription: yup.string()
  });
  const {
    register,
    formState: { errors },
    setValue,
    setError
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const handleIdeaChange = (e) => {
    dispatch(companyActions.setIdea(e.target.value));
  };
  const handleDescriptionChange = (e) => {
    dispatch(companyActions.setIdeaDescription(e.target.value));
  };

  const debouncedIdea = useCallback(debounce(handleIdeaChange, 500));
  const debouncedIdeaDescription = useCallback(debounce(handleDescriptionChange, 500));

  useEffect(() => {
    if (idea) {
      setValue('idea', idea);
    }
    if (ideaDescription) {
      setValue('ideaDescription', ideaDescription);
    }
  }, [idea, ideaDescription]);

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error.forEach((err) => {
        setError(err.field, {
          type: 'manual',
          message: err.message
        });
      });
    }
  }, [error]);

  return (
    <>
      <div className="max-w-[444px] mx-auto mb-8 md:mb-16 text-center">
        <h2 className="text-slate-700 mb-4 text-3xl font-semibold tracking-md">
          Let&apos;s add your first idea
        </h2>
        <p className="text-slate-500 text-lg tracking-sm">
          Think of an idea your customer might give you. Be specific. You can delete it later.
        </p>
      </div>
      <div className="space-y-6">
        <Input
          type="text"
          name="idea"
          id="idea"
          register={register('idea')}
          error={errors.idea}
          placeholder="e.g. Make the logo bigger"
          onChange={debouncedIdea}
        />
        <TextArea
          id="ideaDescription"
          name="ideaDescription"
          rows={7}
          register={register('ideaDescription')}
          error={errors.ideaDescription}
          placeholder="Idea description..."
          onChange={debouncedIdeaDescription}
        />
      </div>
    </>
  );
}
