import EmptyState from '@/components/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import { ChevronLeft, Close } from '@/components/icons';
import useDebounce from '@/hooks/useDebounce';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ImportIdea({ setAddNewIdea, addIdea }) {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);
  const { similarIdeas: ideas } = useSelector((state) => state.idea);
  const [ideaTitle, setIdeaTitle] = useState();
  useDebounce(ideaTitle, () => {
    dispatch(
      ideaActions.searchSimilarIdeas({
        title: ideaTitle,
        companyId: company._id,
        random: false,
        page: 1,
        limit: 5
      })
    );
  });
  function closeAddIdea() {
    setAddNewIdea(false);
    setIdeaTitle('');
  }

  useEffect(() => {
    dispatch(
      ideaActions.searchSimilarIdeas({
        title: ideaTitle,
        companyId: company._id,
        random: true,
        page: 1,
        limit: 5
      })
    );
  }, []);
  useEffect(
    () => () => {
      dispatch(ideaActions.clearSimilarIdeas());
      closeAddIdea();
    },
    []
  );

  return (
    <div className="w-full">
      <div className="flex gap-2 relative p-3 border-b border-slate-200 dark:border-aa-400 purple:border-pt-400">
        <button type="button" onClick={closeAddIdea}>
          <ChevronLeft className="w-6 h-6 icon" />
        </button>
        <input
          placeholder="Search idea"
          className="outline-none grow placeholder:text-sm text-sm text-slate-700 dark:text-aa-200 purple:text-pt-200"
          onChange={(e) => setIdeaTitle(e.target.value)}
          value={ideaTitle}
        />
        {ideaTitle && (
          <button type="button" onClick={() => setIdeaTitle('')}>
            <Close className="w-4 h-4 icon" />
          </button>
        )}
      </div>
      <ul className="flex flex-col h-full space-y-2 max-h-60 overflow-y-auto p-3">
        {ideas.length ? (
          ideas.map((idea) => (
            <li
              key={idea._id}
              className=" hover:bg-slate-50 dark:hover:bg-aa-800 purple:hover:bg-pt-900 px-3 py-2 rounded">
              <button
                type="button"
                onClick={() => addIdea(idea)}
                className="flex gap-4 justify-between w-full">
                <p className=" text-sm text-slate-700 dark:text-aa-200 purple:text-pt-200 truncate">
                  {idea?.title}
                </p>
                {idea?.status && (
                  <StatusBadge name={idea?.status?.name} color={idea?.status?.color} />
                )}
              </button>
            </li>
          ))
        ) : (
          <li className="m-auto">
            <EmptyState
              title="No ideas found"
              description="Your search did not match any idea. Please retry or try a new word."
            />
          </li>
        )}
      </ul>
    </div>
  );
}
