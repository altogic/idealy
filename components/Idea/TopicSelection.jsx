import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TopicButton from '../TopicButton';

export default function TopicSelection({ topics, setTopics, update, errors }) {
  const { company } = useSelector((state) => state.company);
  const [topicsOptions, setTopicsOptions] = useState([]);
  useEffect(() => {
    if (company?.topics) {
      const _topics = [...company.topics];
      setTopicsOptions(_topics.sort((a, b) => a.order - b.order));
    }
  }, [company?.topics]);
  return (
    <div>
      <span className="inline-block text-slate-600 dark:text-aa-300 purple:text-pt-300 mb-4 text-sm tracking-sm">
        Choose up to 3 Topics for this Idea
      </span>
      <div className="flex flex-wrap items-center gap-4">
        {topicsOptions.map((topic) => (
          <TopicButton
            key={topic._id}
            badgeName={topic.name}
            onClick={() => {
              let newTopics = [];
              if (topics.some((t) => t === topic.name)) {
                newTopics = topics.filter((t) => t !== topic.name);
                setTopics(newTopics);
              } else if (topics.length < 3) {
                newTopics = [...topics, topic.name];
                setTopics(newTopics);
              }
              if (update) {
                update(newTopics);
              }
            }}
            selected={topics?.some((t) => t === topic.name)}
            disabled={topics?.length === 3 && !topics.some((t) => t === topic.name)}
          />
        ))}
        {errors?.topics?.message && (
          <span className="inline-block text-sm text-red-600">{errors.topics.message}</span>
        )}
      </div>
    </div>
  );
}
