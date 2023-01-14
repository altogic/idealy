import ImageList from '@/components/ImageList';
import useGuestValidation from '@/hooks/useGuestValidation';
import { fileActions } from '@/redux/file/fileSlice';
import { toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { Disclosure } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from '../Button';
import Drawer from '../Drawer';
import Editor from '../Editor';
import GuestForm from '../GuestForm';
import { ChevronUp, Photo, Plus } from '../icons';
import Input from '../Input';
import SimilarIdeaCard from '../SimilarIdeaCard';
import TopicButton from '../TopicButton';

export default function SubmitIdea({ idea }) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const similarIdeas = useSelector((state) => state.idea.similarIdeas);
  const loading = useSelector((state) => state.file.isLoading);
  const ideaLoading = useSelector((state) => state.idea.isLoading);
  const fileLinks = useSelector((state) => state.file.fileLinks);
  const open = useSelector((state) => state.general.feedBackSubmitModal);
  const userIp = useSelector((state) => state.auth.userIp);
  const [images, setImages] = useState([]);
  const guestValidation = useGuestValidation({
    company,
    fieldName: 'submitIdeas'
  });

  const [topics, setTopics] = useState([]);
  const [content, setContent] = useState('');
  const [inpTitle, setInpTitle] = useState();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    title: yup.string().max(140, 'Title must be under 140 character').required('Title is required'),
    content: yup.string(),
    topic: yup.array('Choose at least one topic').max(3, 'Maximum 3 topics'),
    guestName: yup.string().when([], {
      is: () => guestValidation && !user,
      then: yup.string().required('Name is required')
    }),
    guestEmail: yup
      .string()
      .email("That doesn't look like an email address")
      .when([], {
        is: () => guestValidation && !user,
        then: yup.string().required('Email is required')
      }),
    privacyPolicy: yup.boolean().when([], {
      is: () => guestValidation && !user,
      then: yup.boolean().oneOf([true], 'Privacy Policy is required')
    })
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      privacyPolicy: false
    },
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const onSubmit = (data) => {
    const reqData = {
      ...data,
      content,
      topics,
      images: fileLinks,
      author: user?._id,
      company: company._id,
      companySubdomain: company.subdomain,
      ip: userIp
    };
    delete reqData.privacyPolicy;
    if (idea) {
      dispatch(ideaActions.updateIdea({ _id: idea._id, ...reqData }));
    } else {
      dispatch(ideaActions.createIdea(reqData));
    }
  };

  function imageHandler() {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      setImages((prev) => [...prev, URL.createObjectURL(file)]);
      dispatch(fileActions.uploadFileRequest({ file, name: file.name }));
    };
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    dispatch(fileActions.deleteFile(fileLinks[index]));
  };
  const handleClose = () => {
    reset({
      title: undefined,
      content: undefined,
      topics: undefined,
      guestName: undefined,
      guestEmail: undefined,
      privacyPolicy: false
    });
    setImages([]);
    setContent('');
    setTopics([]);
    dispatch(fileActions.clearFileLinks());
    dispatch(ideaActions.clearSimilarIdeas());
    dispatch(toggleFeedBackSubmitModal());
  };
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);
  useEffect(() => {
    if (!_.isNil(idea)) {
      reset({
        title: idea?.title,
        content: idea?.content,
        topics: idea?.topics,
        guestName: idea?.guestName,
        guestEmail: idea?.guestEmail
      });
      setContent(idea?.content);
      setTopics(idea?.topics);
      setImages(idea?.images);
    }
  }, [idea]);

  useEffect(() => {
    let timer;
    if (inpTitle) {
      timer = setTimeout(() => {
        dispatch(ideaActions.searchSimilarIdeas({ title: inpTitle, companyId: company._id }));
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [inpTitle]);
  useEffect(() => {
    if (content) {
      setValue('content', content);
    }
  }, [content]);
  useEffect(() => {
    if (topics) {
      setValue('topics', topics);
    }
  }, [topics]);

  useEffect(() => {
    if (!ideaLoading && isSubmitSuccessful) {
      handleClose();
    }
  }, [ideaLoading, isSubmitSuccessful]);

  return (
    <>
      <Button
        type="button"
        text="Submit Feedback"
        icon={<Plus className="w-5 h-5" />}
        variant="indigo"
        size="sm"
        onClick={() => dispatch(toggleFeedBackSubmitModal())}
      />
      <Drawer open={open} onClose={() => handleClose()} title="Tell us your idea">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <Input
              name="title"
              id="title"
              label="Title"
              register={register('title')}
              error={errors.title}
              placeholder="Feedback Title"
              onKeyUp={(e) => setInpTitle(e.target.value)}
            />

            {!!similarIdeas?.length && (
              <div className="w-full mt-8 rounded-lg border border-slate-200 overflow-hidden">
                <Disclosure defaultOpen>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between bg-slate-100 text-slate-700 dark:text-aa-100 purple:text-pt-100 px-4 py-2 text-left text-sm font-medium hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                        <span>{open ? 'Hide' : 'Show'} similar ideas</span>
                        <ChevronUp
                          className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-slate-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel
                        className={cn(
                          similarIdeas.length > 1 ? 'max-h-52' : 'max-h-40',
                          `p-4 text-sm text-gray-500 overflow-hidden overflow-y-auto overflow-scroll-fix`
                        )}>
                        {similarIdeas.map((idea) => (
                          <SimilarIdeaCard key={idea?._id} idea={idea} />
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            )}
          </div>
          <div className="mb-8 relative">
            <Controller
              name="content"
              control={control}
              rules={{ required: true }}
              render={() => (
                <Editor content={content} setContent={setContent} errors={errors.content}>
                  {images.length < 5 && (
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-2 z-50"
                      onClick={imageHandler}>
                      <Photo className="w-6 h-6 text-slate-500 dark:text-aa-200 purple:text-pt-200 hover:text-[#06c] dark:hover:text-[#06c] purple:hover:text-[#06c]" />
                    </button>
                  )}
                </Editor>
              )}
            />

            {errors?.content?.message && (
              <span className="inline-block text-sm text-red-600">{errors.content.message}</span>
            )}
          </div>
          {images?.length > 0 && (
            <ImageList images={images} onRemove={removeImage} removable loading={loading} />
          )}
          <div className="mt-8">
            <span className="inline-block text-slate-600 dark:text-aa-300 purple:text-pt-300 mb-4 text-base tracking-sm">
              Choose up to 3 Topics for this Idea (optional)
            </span>
            <Controller
              name="topics"
              control={control}
              defaultValue={[]}
              rules={{
                required: false,
                validate: (value) => value.length <= 3
              }}
              render={() => (
                <div className="flex flex-wrap items-center gap-4">
                  {company?.topics.map((topic) => (
                    <TopicButton
                      key={topic._id}
                      badgeName={topic.name}
                      onClick={() => {
                        if (topics.some((t) => t === topic.name)) {
                          setTopics((prevTopics) => prevTopics.filter((t) => t !== topic.name));
                        } else if (topics.length < 3) {
                          setTopics((prevTopics) => [...prevTopics, topic.name]);
                        }
                      }}
                      selected={topics.some((t) => t === topic.name)}
                    />
                  ))}
                  {errors?.topics?.message && (
                    <span className="inline-block text-sm text-red-600">
                      {errors.topics.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <hr className="my-8 border-slate-200 dark:border-aa-600 purple:border-pt-800" />
          <div>
            {((idea?.guestName && idea?.guestEmail) || guestValidation) && (
              <GuestForm register={register} errors={errors} />
            )}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            {idea && <Button type="button" text="Cancel" variant="blank" onClick={handleClose} />}
            <Button
              type="submit"
              className="flex items-center justify-center bg-indigo-700 dark:bg-aa-700 purple:bg-pt-700 text-white py-3 px-4 text-sm font-medium tracking-sm border border-transparent rounded-lg hover:bg-indigo-600 dark:hover:bg-aa-600 purple:hover:bg-pt-600 focus:outline-none"
              text={`${idea ? 'Update' : 'Submit'} Idea`}
              loading={ideaLoading}
            />
          </div>
        </form>
      </Drawer>
    </>
  );
}
