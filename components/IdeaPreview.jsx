import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import StatusBadge from './StatusBadge';
import TopicBadges from './TopicBadges';

export default function IdeaPreview({ isTopic, topicList, setTopicList }) {
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.company.idea);
  const ideaDescription = useSelector((state) => state.company.ideaDescription);
  const status = useSelector((state) => state.company.ideaStatus);
  const topics = useSelector((state) => state.company.companyTopics);
  return (
    <div className="bg-white py-8 px-6 border border-slate-200 rounded-lg">
      <h2 className="text-slate-800 mb-2 text-base font-semibold tracking-sm">{idea}</h2>
      <p className="text-slate-500 mb-5 text-sm tracking-sm line-clamp-3">{ideaDescription}</p>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {topics.map((topic) =>
            isTopic ? (
              <button
                type="button"
                key={topic._id}
                onClick={() => {
                  dispatch(companyActions.removeTopic(topic));
                  setTopicList([...topicList, topic]);
                }}>
                <TopicBadges badgeName={topic.name} />
              </button>
            ) : (
              <TopicBadges key={topic._id} badgeName={topic.name} />
            )
          )}
        </div>
        {status && <StatusBadge name={status?.name} color={status?.color} />}
      </div>
    </div>
  );
}
