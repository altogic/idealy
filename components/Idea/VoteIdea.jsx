import { ChevronDown, ChevronUp } from '@/components/icons';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useDispatch, useSelector } from 'react-redux';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import cn from 'classnames';
import { useEffect, useState, Fragment } from 'react';
import useGuestValidation from '@/hooks/useGuestValidation';
import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { addGuestInfoToLocalStorage } from '@/utils/index';
import _ from 'lodash';
import Link from 'next/link';
import GuestForm from '../GuestForm';
import Button from '../Button';

export default function VoteIdea({ voted, voteCount, ideaId }) {
  const dispatch = useDispatch();
  const canVote = useRegisteredUserValidation('voteIdea');
  const userIp = useSelector((state) => state.auth.userIp);
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const voteGuestAuthentication = useGuestValidation('voteIdea');
  const guestInfo = useSelector((state) => state.idea.guestInfo);
  const [voteCountState, setVoteCountState] = useState();
  const [votedState, setVotedState] = useState();
  const [openGuestForm, setOpenGuestForm] = useState(false);

  const schema = yup.object().shape({
    guestName: yup.string().required('Name is required'),
    guestEmail: yup.string().email('Email is invalid').required('Email is required')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    setVoteCountState(voteCount);
    setVotedState(voted);
  }, [voteCount, voted]);

  const downVote = () => {
    setVoteCountState((prev) => prev - 1);
    setVotedState(false);
    dispatch(ideaActions.downVoteIdea({ ideaId, ...(!user && { ip: userIp }), userId: user?._id }));
  };

  const upVote = () => {
    if (!voted) {
      if (voteGuestAuthentication && _.isEmpty(guestInfo)) {
        setOpenGuestForm(true);
      } else {
        setVoteCountState((prev) => prev + 1);
        setVotedState(true);
        dispatch(
          ideaActions.voteIdea({
            ideaId,
            ...(!user && { ip: userIp }),
            ...(voteGuestAuthentication && guestInfo),
            companyId: company._id,
            userId: user?._id
          })
        );
      }
    } else {
      downVote();
    }
  };
  const guestVote = (data) => {
    addGuestInfoToLocalStorage(data.guestEmail, data.guestName);
    dispatch(
      ideaActions.setGuestInfo({
        name: data.guestName,
        email: data.guestEmail
      })
    );
    setOpenGuestForm(false);
    upVote();
  };
  return (
    <div
      className={`flex flex-col items-center bg-white px-3 md:px-5 border rounded-lg h-20 ${
        votedState ? 'border-2 border-indigo-500' : 'border-gray-400'
      }`}>
      {canVote && (
        <button
          type="button"
          onClick={upVote}
          disabled={!canVote}
          className="inline-flex items-center justify-center">
          <ChevronUp className={`w-5 h-5 ${voted ? ' text-indigo-900' : 'text-slate-400'} `} />
        </button>
      )}
      <span
        className={cn(
          'text-indigo-700 text-2xl font-semibold tracking-md',
          !canVote ? 'm-auto' : ''
        )}>
        {voteCountState}
      </span>
      {voteCount > 0 && canVote && (
        <button
          type="button"
          onClick={downVote}
          className="inline-flex items-center justify-center">
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </button>
      )}
      <Transition appear show={openGuestForm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpenGuestForm(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    class="mb-8 text-lg md:text-xl lg:text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-aa-100 purple:text-pt-100 text-center">
                    Please enter your details to vote
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(guestVote)} className="px-8">
                    <GuestForm register={register} errors={errors} vertical />
                    <div className="flex justify-end gap-2 my-8">
                      <Button
                        type="button"
                        text="Cancel"
                        variant="blank"
                        onClick={() => setOpenGuestForm(false)}
                      />
                      <Button type="submit" variant="indigo" text="Submit" />
                    </div>
                    <div className="text-center text-sm">
                      Already have an account?{' '}
                      <Link href="/login">
                        <a className="text-indigo-700 ml-2">Login</a>
                      </Link>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
