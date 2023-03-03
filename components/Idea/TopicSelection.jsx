import { useSelector } from 'react-redux';
import TopicButton from '../TopicButton';

export default function TopicSelection({ topics, setTopics, update, errors }) {
  const { company } = useSelector((state) => state.company);

  return (
    <div>
      <span className="inline-block text-slate-600 dark:text-aa-300 purple:text-pt-300 mb-4 text-sm tracking-sm">
        Choose up to 3 Topics for this Idea
      </span>
      <div className="flex flex-wrap items-center gap-4">
        {company?.topics?.map((topic) => (
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
