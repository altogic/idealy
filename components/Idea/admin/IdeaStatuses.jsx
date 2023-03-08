import CategoryListbox from '@/components/CategoryListbox';
import StatusListbox from '@/components/StatusListbox';
import UserSegmentListbox from '@/components/UserSegmentListbox';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaStatuses() {
  return (
    <IdeaAdminTab title="Statuses">
      <div className="flex flex-col space-y-4">
        <StatusListbox size="xl" />
        <CategoryListbox size="xl" />
        <UserSegmentListbox size="xl" />
      </div>
    </IdeaAdminTab>
  );
}
