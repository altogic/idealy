import { ChevronDown, ChevronUp } from '@/components/icons';
import useGuestValidation from '@/hooks/useGuestValidation';
import useNotification from '@/hooks/useNotification';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import useSaveGuestInformation from '@/hooks/useSaveGuestInformation';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { generateRandomName } from '@/utils/index';
import cn from 'classnames';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuestFormModal from '../GuestFormModal';

export default function VoteIdea({ voteCount, idea }) {
  const dispatch = useDispatch();
  const canVote = useRegisteredUserValidation('voteIdea');
  const { userIp, user, guestInfo } = useSelector((state) => state.auth);
  const company = useSelector((state) => state.company.company);
  const voteGuestAuthentication = useGuestValidation('voteIdea');
  const error = useSelector((state) => state.idea.error);
  const [voteCountState, setVoteCountState] = useState();
  const [voted, setVoted] = useState();
  const [openGuestForm, setOpenGuestForm] = useState(false);
  const isLoading = useSelector((state) => state.idea.isLoading);
  const ideaVotes = useSelector((state) => state.idea.ideaVotes);
  const voteGuestAuth = useGuestValidation('voteIdea');
  const saveGuestInfo = useSaveGuestInformation();
  const sendNotification = useNotification();
  const downVote = () => {
    setVoteCountState((prev) => prev - 1);
    setVoted(false);
    dispatch(
      ideaActions.downVoteIdea({
        ideaId: idea._id,
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
        setVoted(true);
        dispatch(
          ideaActions.voteIdea({
            ideaId: idea._id,
            ...(!user && !voteGuestAuthentication && { ip: userIp }),
            ...(voteGuestAuthentication && {
              guestEmail: guestInfo.email,
              guestName: guestInfo.name
            }),
            companyId: company._id,
            userId: user?._id,
            onSuccess: () => {
              if (!user && !voteGuestAuthentication && !guestInfo.name) {
                saveGuestInfo({
                  name: generateRandomName()
                });
              }
              if (idea?.author?._id) {
                console.log('voted');
                sendNotification({
                  message: `<p><b>${user?.name || guestInfo.name}</b>  voted for <b>${
                    idea.title
                  }</b></p>`,
                  targetUser: idea?.author._id,
                  type: 'vote',
                  url: `public-view?feedback=${idea._id}`
                });
              }
            },
            onError: () => {
              if (voteCountState > 0) {
                setVoteCountState((prev) => prev - 1);
              }
              setVoted(false);
            }
          })
        );
      }
    } else {
      downVote();
    }
  };
  const handleGuestFormSubmit = (data) => {
    setVoted(true);
    setVoteCountState((prev) => prev + 1);
    setOpenGuestForm(false);
    dispatch(
      ideaActions.voteIdea({
        ideaId: idea._id,
        ...(!user && !voteGuestAuthentication && { ip: userIp }),
        ...(voteGuestAuthentication && { ...data }),
        companyId: company._id,
        userId: user?._id,
        onSuccess: () => {
          sendNotification({
            message: `${user?.name || guestInfo.name}  voted for  ${idea.title}`,
            targetUser: idea?.author._id,
            type: 'vote',
            url: `public-view?feedback=${idea._id}`
          });
        },
        onError: () => {
          setVoteCountState((prev) => prev - 1);
          setVoted(false);
        }
      })
    );
  };
  const handleVoted = () => {
    if (user) {
      return ideaVotes.some((v) => v.ideaId === idea._id && v.userId === user._id);
    }
    if (voteGuestAuth) {
      return ideaVotes.some(
        (v) => v.ideaId === idea._id && guestInfo.email === v.guestEmail && !v.userId
      );
    }
    return ideaVotes.some((v) => v.ideaId === idea._id && v.ip === userIp && !v.userId);
  };
  useEffect(() => {
    setVoteCountState(voteCount);
    setVoted(handleVoted());
  }, [voteCount, ideaVotes]);

  return (
    <div
      className={`flex flex-col items-center flex-shrink-0 bg-white dark:bg-aa-50 purple:bg-pt-50 dark:bg-opacity-10 purple:bg-opacity-10 py-1 px-3 md:px-5 border rounded-lg h-20 ${
        voted
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
      {voteCount > 0 && canVote && voted && (
        <button
          type="button"
          onClick={downVote}
          className="inline-flex items-center justify-center"
          disabled={!voted}>
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
