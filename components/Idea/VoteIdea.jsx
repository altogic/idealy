import { ChevronDown, ChevronUp } from '@/components/icons';
import useGuestValidation from '@/hooks/useGuestValidation';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { addGuestInfoToLocalStorage } from '@/utils/index';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import _ from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from '../Button';
import GuestForm from '../GuestForm';
import Modal from '../Modal';

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
      className={`flex flex-col items-center bg-white dark:bg-aa-50 purple:bg-pt-50 dark:bg-opacity-10 purple:bg-opacity-10 py-1 px-3 md:px-5 border rounded-lg h-20 ${
        votedState
          ? 'border-2 border-indigo-500 dark:border-aa-200 purple:border-pt-200'
          : 'border-gray-400'
      }`}>
      {canVote && (
        <button
          type="button"
          onClick={upVote}
          disabled={!canVote}
          className="inline-flex items-center justify-center">
          <ChevronUp
            className={`w-5 h-5 ${
              voted ? ' text-indigo-900 dark:text-aa-200 purple:text-pt-200' : 'text-slate-400'
            } `}
          />
        </button>
      )}
      <span
        className={cn(
          'text-indigo-700 dark:text-aa-200 purple:text-pt-200 text-2xl font-semibold tracking-md',
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

      <Modal show={openGuestForm} onClose={() => setOpenGuestForm(false)}>
        <h1 className="mb-8 text-lg md:text-xl lg:text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-aa-100 purple:text-pt-100 text-center">
          Please enter your details to vote
        </h1>

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
      </Modal>
    </div>
  );
}
