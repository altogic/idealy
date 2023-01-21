import Layout from '@/components/Layout';
import RoadMapCard from '@/components/RoadMapCard';
import PublicViewCard from '@/components/PublicViewCard';
import TopicBadges from '@/components/TopicBadges';
import CommentCard from '@/components/CommentCard';
import Divider from '@/components/Divider';

export default function Component() {
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto my-20">
        <div className="mb-10">
          <h2 className="text-slate-800 mb-5 text-4xl font-semibold tracking-sm">
            Roadmap Page Card
          </h2>
          <RoadMapCard score="5" title="At venenatis leo fringilla eu nec." />
        </div>
        <Divider />
        <div className="mb-10">
          <h2 className="text-slate-800 mb-5 text-4xl font-semibold tracking-sm">
            Public View Card
          </h2>
          <PublicViewCard
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu scelerisque pellentesque posuere neque integer mauris. Eget sit nulla id sit urna velit. Eu sed elit mauris, semper viverra molestie orci vitae. Senectus sem et nullam..."
            title="Logo bigger"
            user="Olivia Rhye"
            date="June 29"
            status={2}
          />
        </div>
        <Divider />
        <div className="mb-10">
          <h2 className="text-slate-800 mb-5 text-4xl font-semibold tracking-sm">Topic Badges</h2>
          <TopicBadges badgeName="Development" />
        </div>
        <Divider />
        <div className="mb-10">
          <h2 className="text-slate-800 mb-5 text-4xl font-semibold tracking-sm">Comment Card</h2>
          <CommentCard nameFirstLetter="O" userName="Olivia Rhye" timeAgo="3 days ago" />
        </div>
      </div>
    </Layout>
  );
}
