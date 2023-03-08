import ImageList from '@/components/ImageList';
import useGuestValidation from '@/hooks/useGuestValidation';
import useSaveGuestInformation from '@/hooks/useSaveGuestInformation';
import useSendMentionNotification from '@/hooks/useSendMentionNotification';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { fileActions } from '@/redux/file/fileSlice';
import { toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { generateRandomName } from '@/utils/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { PRIORITY_VALUES } from 'constants';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import AutoComplete from '../AutoComplete';
import Button from '../Button';
import Divider from '../Divider';
import Drawer from '../Drawer';
import GuestForm from '../GuestForm';
import GuestFormModal from '../GuestFormModal';
import { Photo } from '../icons';
import Input from '../Input';
import SimilarIdeas from '../SimilarIdeas';
import Suggestion from '../Suggestion';
import TopicButton from '../TopicButton';

const Editor = dynamic(() => import('../Editor'), { ssr: false });

export default function SubmitIdea({ idea }) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const similarIdeas = useSelector((state) => state.idea.similarIdeas);
  const loading = useSelector((state) => state.file.isLoading);
  const ideaLoading = useSelector((state) => state.idea.isLoading);
  const fileLinks = useSelector((state) => state.file.fileLinks);
  const feedBackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);
  const userIp = useSelector((state) => state.auth.userIp);
  const companyMembers = useSelector((state) => state.idea.searchedCompanyMembers);
  const searchLoading = useSelector((state) => state.idea.isLoading);
  const error = useSelector((state) => state.idea.error);
  const companyError = useSelector((state) => state.company.error);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const [images, setImages] = useState([]);
  const guestValidation = useGuestValidation('submitIdeas');
  const [openGuestForm, setOpenGuestForm] = useState(false);
  const [topics, setTopics] = useState([]);
  const [content, setContent] = useState('');
  const [inpTitle, setInpTitle] = useState();
  const [member, setMember] = useState();
  const [topicsOptions, setTopicsOptions] = useState([]);
  const dispatch = useDispatch();
  const updateIdea = useUpdateIdea(idea);
  const saveGuestInformation = useSaveGuestInformation();

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
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      privacyPolicy: false
    },
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const resetForm = () => {
    reset({});
    setContent('');
    setTopics([]);
    setImages([]);
    setMember();
    dispatch(ideaActions.clearSimilarIdeas());
  };
  const handleClose = () => {
    resetForm();
    dispatch(toggleFeedBackSubmitModal());
    dispatch(ideaActions.setEditedIdea(null));
  };
  const sendMentionNotification = useSendMentionNotification('idea');
  const submitOnSuccess = (guestEmail, guestName, submittedIdea) => {
    if (guestEmail && guestName) {
      saveGuestInformation({ email: guestEmail, name: guestName });
    }
    sendMentionNotification({
      content: submittedIdea.content,
      name: user?.name || submittedIdea.guestName,
      email: submittedIdea.guestEmail,
      title: submittedIdea.title
    });
    handleClose();
    dispatch(fileActions.clearFileLinks());
    dispatch(ideaActions.setEditedIdea(null));
  };
  const onSubmit = (data) => {
    const guestName = generateRandomName();
    if (!user && !guestValidation && !guestInfo.name) {
      saveGuestInformation({
        name: guestName
      });
    }
    const reqData = {
      ...data,
      content,
      topics,
      images: fileLinks,
      author: member?.provider ? member._id : undefined,
      name: member?.name || guestName,
      email: member?.email,
      company: company._id,
      ...(!user && !data.guestEmail && { ip: userIp }),
      isApproved: !company?.privacy?.ideaApproval,
      costFactor: PRIORITY_VALUES[company?.priorityType][0],
      benefitFactor: PRIORITY_VALUES[company?.priorityType][0]
    };
    delete reqData.privacyPolicy;

    if (idea) {
      updateIdea(reqData, (submittedIdea) =>
        submitOnSuccess(data.guestEmail, data.guestName, submittedIdea)
      );
    } else {
      dispatch(
        ideaActions.createIdea({
          idea: reqData,
          onSuccess: (submittedIdea) =>
            submitOnSuccess(data.guestEmail, data.guestName, submittedIdea)
        })
      );
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

  const handleOnSearch = (searchText) => {
    if (searchText) {
      dispatch(ideaActions.searchCompanyMembers({ searchText, companyId: company._id }));
    }
  };
  const formatResult = (item) => (
    <Suggestion item={item} profilePicture={idea?.author?.profilePicture} />
  );

  const createNewUser = () => {
    setMember(user);
    setInpTitle('');
  };
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
      setMember(idea?.author);
    } else {
      resetForm();
    }
  }, [idea, feedBackSubmitModal]);

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
    if (topics) {
      setValue('topics', topics);
    }
  }, [content, topics]);

  useEffect(() => {
    if (idea) {
      setMember(idea.author);
    } else {
      setMember(user);
    }
  }, [user, idea, feedBackSubmitModal]);

  useEffect(() => {
    if (guestInfo) {
      setValue('guestName', guestInfo.name);
      setValue('guestEmail', guestInfo.email);
      setValue('privacyPolicy', true);
    }
  }, [feedBackSubmitModal, guestInfo]);

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error.forEach((err) => {
        if (err.code === 'user_exist') {
          setError('guestEmail', {
            type: 'manual',
            message: err.message
          });
        }
      });
    }
  }, [error, setError]);

  useEffect(() => {
    if (company) {
      const _topics = [...company.topics];
      setTopicsOptions(_topics.sort((a, b) => a.order - b.order));
    }
  }, [company]);

  return (
    <Drawer
      open={feedBackSubmitModal}
      onClose={() => handleClose()}
      className="z-[100]"
      position="right"
      size="lg">
      <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold break-all">
        Tell us your idea
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {user && company?.role && company?.role !== 'Guest' && (
          <div className="my-8">
            <AutoComplete
              suggestions={companyMembers}
              onSearch={handleOnSearch}
              loading={searchLoading}
              formatResult={formatResult}
              onSuggestionClick={setMember}
              activeSuggestion={member}
              setOpenGuestForm={setOpenGuestForm}
              openGuestForm={openGuestForm}
            />
          </div>
        )}
        <div className={user && company?.role ? 'mb-8' : 'my-8'}>
          <Input
            type="text"
            name="title"
            id="title"
            label="Title"
            register={register('title')}
            error={errors.title}
            placeholder="Feedback Title"
            onKeyUp={(e) => {
              if (!idea) {
                setInpTitle(e.target.value);
              }
            }}
          />
          {!!similarIdeas?.length && <SimilarIdeas ideas={similarIdeas} title="Similar Ideas" />}
        </div>
        <div className="mb-8 relative">
          <Editor content={content} setContent={setContent} errors={errors.content}>
            {images?.length < 5 && (
              <button type="button" onClick={imageHandler}>
                <Photo className="w-6 h-6 text-slate-500 dark:text-aa-200 purple:text-pt-200 hover:text-[#06c] dark:hover:text-[#06c] purple:hover:text-[#06c]" />
              </button>
            )}
          </Editor>

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
          <div className="flex flex-wrap items-center gap-4">
            {topicsOptions.map((topic) => (
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
                selected={topics?.some((t) => t === topic.name)}
              />
            ))}
            {errors?.topics?.message && (
              <span className="inline-block text-sm text-red-600">{errors.topics.message}</span>
            )}
          </div>
        </div>
        <Divider className="my-8" />
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
      <GuestFormModal
        title="Add a new user"
        open={openGuestForm}
        onClose={() => setOpenGuestForm(false)}
        onSubmit={createNewUser}
        error={companyError}
        saveLocal={false}
      />
    </Drawer>
  );
}
