import { useEffect, useState } from 'react';
import TopicBadges from '@/components/TopicBadges';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { differenceWith, isEqual } from 'lodash';
import IdeaPreview from '@/components/IdeaPreview';

export default function ThirdWizard() {
  const dispatch = useDispatch();
  const [topicList, setTopicList] = useState([]);
  const companyTopics = useSelector((state) => state.company.companyTopics);
  const topics = useSelector((state) => state.topic.topics);

  useEffect(() => {
    if (topics) {
      setTopicList(() => {
        if (companyTopics.length) {
          return differenceWith(topics, companyTopics, isEqual);
        }
        return topics;
      });
    }
  }, [topics]);

  return (
    <>
      <div className="max-w-[444px] mx-auto mb-8 md:mb-16 text-center">
        <h2 className="text-slate-700 mb-4 text-3xl font-semibold tracking-md">
          Add topics to your idea
        </h2>
        <p className="text-slate-500 text-lg tracking-sm">
          Topics help describe the area an idea belongs to. Add topics to your idea below (max
          three).
        </p>
      </div>
      <div>
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-md mx-auto mb-6">
          {topicList.map((topic) => (
            <button
              type="button"
              key={topic._id}
              onClick={() => {
                if (companyTopics.length < 3) {
                  dispatch(companyActions.addTopic(topic));
                  setTopicList(topicList.filter((t) => t._id !== topic._id));
                }
              }}>
              <TopicBadges badgeName={topic.name} />
            </button>
          ))}
        </div>
        <IdeaPreview isTopic topicList={topicList} setTopicList={setTopicList} />
      </div>
    </>
  );
}
