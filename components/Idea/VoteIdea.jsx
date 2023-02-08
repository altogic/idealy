import { ChevronDown, ChevronUp } from '@/components/icons';
import useGuestValidation from '@/hooks/useGuestValidation';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import useSaveGuestInformation from '@/hooks/useSaveGuestInformation';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { generateRandomName } from '@/utils/index';
import cn from 'classnames';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuestFormModal from '../GuestFormModal';

export default function VoteIdea({ voted, voteCount, ideaId }) {
  const dispatch = useDispatch();
  const canVote = useRegisteredUserValidation('voteIdea');
  const userIp = useSelector((state) => state.auth.userIp);
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);
  const voteGuestAuthentication = useGuestValidation('voteIdea');
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const error = useSelector((state) => state.idea.error);
  const [voteCountState, setVoteCountState] = useState();
  const [votedState, setVotedState] = useState();
  const [openGuestForm, setOpenGuestForm] = useState(false);
  const isLoading = useSelector((state) => state.idea.isLoading);
  const saveGuestInfo = useSaveGuestInformation();
  useEffect(() => {
    setVoteCountState(voteCount);
    setVotedState(voted);
  }, [voteCount, voted]);

  const downVote = () => {
    setVoteCountState((prev) => prev - 1);
    setVotedState(false);
    dispatch(
      ideaActions.downVoteIdea({
        ideaId,
        ...(!user && { ip: userIp }),
        ...(voteGuestAuthentication && { email: guestInfo.email }),
        userId: user?._id
      })
    );
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
            ...(!user && !voteGuestAuthentication && { ip: userIp }),
            ...(voteGuestAuthentication && {
              guestEmail: guestInfo.email,
              guestName: guestInfo.name
            }),
            companyId: company._id,
            userId: user?._id,
            onError: () => {
              if (voteCountState > 0) {
                setVoteCountState((prev) => prev - 1);
              }
              setVotedState(false);
            }
          })
        );
        if (!user && !voteGuestAuthentication && !guestInfo.name) {
          saveGuestInfo({
            name: generateRandomName()
          });
        }
      }
    } else {
      downVote();
    }
  };
  const handleGuestFormSubmit = (data) => {
    setVotedState(true);
    setVoteCountState((prev) => prev + 1);
    setOpenGuestForm(false);
    dispatch(
      ideaActions.voteIdea({
        ideaId,
        ...(!user && !voteGuestAuthentication && { ip: userIp }),
        ...(voteGuestAuthentication && { ...data }),
        companyId: company._id,
        userId: user?._id,
        onError: () => {
          setVoteCountState((prev) => prev - 1);
          setVotedState(false);
        }
      })
    );
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
          disabled={!canVote || isLoading}
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
      {voteCount > 0 && canVote && votedState && (
        <button
          type="button"
          onClick={downVote}
          className="inline-flex items-center justify-center"
          disabled={!votedState}>
          <ChevronDown className="w-5 h-5 text-slate-500 dark:text-aa-400 purple:text-pt-400" />
        </button>
      )}
      <GuestFormModal
        title="Please enter your details to vote"
        open={openGuestForm}
        onClose={() => setOpenGuestForm(false)}
        error={error}
        onSubmit={handleGuestFormSubmit}
        showLoginLink
        saveLocal
      />
    </div>
  );
}
