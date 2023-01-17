import { ChevronDown, ChevronUp } from '@/components/icons';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useDispatch, useSelector } from 'react-redux';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import cn from 'classnames';
import { useEffect, useState } from 'react';

export default function VoteIdea({ voted, voteCount, ideaId }) {
  const dispatch = useDispatch();
  const canVote = useRegisteredUserValidation('voteIdea');
  const userIp = useSelector((state) => state.auth.userIp);
  const company = useSelector((state) => state.company.company);
  const [voteCountState, setVoteCountState] = useState();
  const [votedState, setVotedState] = useState();
  useEffect(() => {
    setVoteCountState(voteCount);
    setVotedState(voted);
  }, [voteCount, voted]);

  const downVote = () => {
    setVoteCountState((prev) => prev - 1);
    setVotedState(false);
    dispatch(ideaActions.downVoteIdea({ ideaId, ip: userIp }));
  };

  const upVote = () => {
    if (!voted) {
      setVoteCountState((prev) => prev + 1);
      setVotedState(true);
      dispatch(ideaActions.voteIdea({ ideaId, ip: userIp, companyId: company._id }));
    } else {
      downVote();
    }
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
          <ChevronUp className={`w-5 h-5 ${votedState ? ' text-indigo-900' : 'text-slate-400'} `} />
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
    </div>
  );
}
