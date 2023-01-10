import { ChevronDown, ChevronUp } from '@/components/icons';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useDispatch, useSelector } from 'react-redux';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import cn from 'classnames';

export default function VoteIdea({ voted, voteCount, ideaId }) {
  const dispatch = useDispatch();
  const canVote = useRegisteredUserValidation('voteIdea');
  const userIp = useSelector((state) => state.auth.userIp);
  const company = useSelector((state) => state.company.company);
  const upVote = () => {
    dispatch(ideaActions.voteIdea({ ideaId, ip: userIp, companyId: company._id }));
  };
  const downVote = () => {
    dispatch(ideaActions.downVoteIdea({ ideaId, ip: userIp }));
  };
  return (
    <div
      className={`flex flex-col items-center bg-white px-3 md:px-5 border rounded-lg h-20 ${
        voted ? 'border-2 border-indigo-500' : 'border-gray-400'
      }`}>
      {canVote && (
        <button
          type="button"
          onClick={upVote}
          disabled={voted || !canVote}
          className="inline-flex items-center justify-center">
          <ChevronUp className={`w-5 h-5 ${voted ? ' text-indigo-900' : 'text-slate-400'} `} />
        </button>
      )}
      <span
        className={cn(
          'text-indigo-700 text-2xl font-semibold tracking-md',
          !canVote ? 'm-auto' : ''
        )}>
        {voteCount}
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
