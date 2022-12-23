import { ideaActions } from '@/redux/ideas/ideaSlice';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from '../Button';
import { ChevronUp } from '../icons';
import Input from '../Input';
import SimilarIdeaCard from '../SimilarIdeaCard';
import TopicButton from '../TopicButton';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function SubmitIdea({ open, setOpen, idea }) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const similarIdeas = useSelector((state) => state.idea.similarIdeas);

  const [guestValidation, setGuestValidation] = useState(false);
  const [topics, setTopics] = useState([]);
  const [value, setValue] = useState('');
  const [inpTitle, setInpTitle] = useState();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    topics: yup.array().max(3, 'Maximum 3 topics'),
    guestName: yup.string().when([], {
      is: () => guestValidation && !user,
      then: yup.string().required('Name is required')
    }),
    guestEmail: yup.string().when([], {
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
    formState: { errors }
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
      content: value,
      topics
    };
    delete reqData.privacyPolicy;
    if (idea) {
      dispatch(ideaActions.updateIdea({ _id: idea._id, ...reqData }));
    } else {
      dispatch(ideaActions.createIdea(reqData));
    }
    setOpen(false);
  };
  useEffect(() => {
    if (company) {
      setGuestValidation(
        company?.authentication.type === 'Guest Authentication' ||
          (company.authentication.type === 'Custom' &&
            company.authentication.submitIdeas === 'Guest Authentication')
      );
    }
  }, [company]);
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);
  useEffect(() => {
    console.log(idea);
    if (!_.isNil(idea)) {
      reset({
        title: idea?.title,
        content: idea?.content,
        topics: idea?.topics,
        guestName: idea?.guestName,
        guestEmail: idea?.guestEmail
      });
      setValue(idea?.content);
      setTopics(idea?.topics);
    } else {
      reset({
        title: '',
        content: '',
        topics: '',
        guestName: '',
        guestEmail: ''
      });
      setTopics([]);
      setValue('');
      setInpTitle('');
    }
  }, [idea]);
  useEffect(() => {
    let timer;
    if (inpTitle) {
      timer = setTimeout(() => {
        dispatch(ideaActions.searchSimilarIdeas(inpTitle));
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [inpTitle]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto max-w-screen-lg w-screen">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white p-14 shadow-xl">
                    {/* Close Button Submit Feedback Modal */}
                    <div className="absolute top-8 right-8 flex items-center justify-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-full h-full text-slate-500 rounded-md transition hover:bg-slate-100"
                        onClick={() => setOpen(false)}>
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true">
                          <path
                            d="M17 1L1 17M1 1L17 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-slate-800 mb-8 text-xl font-semibold">
                          Tell us your Idea!
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="relative flex-1">
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
                            <div className="w-full mt-8 rounded-md border border-slate-200">
                              <div className="w-full bg-slate-50">
                                <Disclosure>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 border-b border-slate-300">
                                        <span>{open ? 'Hide' : 'Show'} similar ideas</span>
                                        <ChevronUp
                                          className={`${
                                            open ? 'rotate-180 transform' : ''
                                          } h-5 w-5 text-slate-500`}
                                        />
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="max-h-40 px-4 pt-4 pb-2 text-sm text-gray-500 overflow-hidden overflow-y-auto overflow-scroll-fix">
                                        {similarIdeas.map((idea) => (
                                          <SimilarIdeaCard key={idea?._id} idea={idea} />
                                        ))}
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-8">
                          <Controller
                            name="content"
                            control={control}
                            rules={{ required: true }}
                            render={() => (
                              <ReactQuill
                                theme="snow"
                                value={value}
                                onChange={setValue}
                                className={` border ${
                                  !errors?.content?.message
                                    ? 'border-gray-300 focus:border-blue-300'
                                    : 'border-red-300 focus:border-red-300'
                                }  rounded-md`}
                              />
                            )}
                          />
                          {errors?.content?.message && (
                            <span className="inline-block text-sm text-red-600">
                              {errors.content.message}
                            </span>
                          )}
                        </div>
                        <div className="mt-8">
                          <span className="inline-block text-slate-600 mb-4 text-base tracking-sm">
                            Choose up to 3 Topics for this Idea (optional)
                          </span>
                          <Controller
                            name="topics"
                            control={control}
                            defaultValue={[]}
                            rules={{ required: false, validate: (value) => value.length <= 3 }}
                            render={() => (
                              <div className="flex flex-wrap items-center gap-4">
                                {company?.topics.map((topic) => (
                                  <TopicButton
                                    key={topic._id}
                                    badgeName={topic.name}
                                    onClick={() => {
                                      if (topics.some((t) => t === topic.name)) {
                                        setTopics((prevTopics) =>
                                          prevTopics.filter((t) => t !== topic.name)
                                        );
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
                        <hr className="my-8 border-slate-200" />
                        <div>
                          {((idea?.guestName && idea?.guestEmail) ||
                            company?.authentication.type === 'Guest Authentication' ||
                            (company?.authentication.type === 'Custom' &&
                              company?.authentication.submitIdeas === 'Guest Authentication')) && (
                            <>
                              <div className="flex gap-4 mb-4 relative max-h-[46px]">
                                <span className="inline-block text-slate-600 text-base tracking-sm whitespace-nowrap m-auto">
                                  Your details
                                </span>
                                <Input
                                  type="text"
                                  name="guestName"
                                  id="guestName"
                                  placeholder="Name"
                                  register={register('guestName')}
                                  error={errors.guestName}
                                />
                                <Input
                                  type="email"
                                  name="guestEmail"
                                  id="guestEmail"
                                  register={register('guestEmail')}
                                  error={errors.guestEmail}
                                  placeholder="Email"
                                />
                              </div>
                              <div className="flex items-center mt-10">
                                <Input
                                  id="privacyPolicy"
                                  aria-describedby="privacyPolicy"
                                  name="privacyPolicy"
                                  type="checkbox"
                                  register={register('privacyPolicy')}
                                  error={errors.privacyPolicy}
                                  label="I consent to my information being stored and used according to
                                      the Privacy Policy."
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <hr className="mt-8 mb-20" />
                            </>
                          )}
                        </div>
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            className="flex items-center justify-center text-white py-3 px-4 text-sm font-medium tracking-sm border border-transparent rounded-lg bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            text={`${idea ? 'Update' : 'Submit'} Feedback`}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
