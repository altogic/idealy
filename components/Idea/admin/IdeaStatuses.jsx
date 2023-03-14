import CategoryListbox from '@/components/CategoryListbox';
import Label from '@/components/Label';
import StatusListbox from '@/components/StatusListbox';
import UserSegmentListbox from '@/components/UserSegmentListbox';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaStatuses() {
  return (
    <IdeaAdminTab title="Statuses">
      <div className="space-y-4">
        <div>
          <Label label="Status" />
          <StatusListbox size="xl" />
        </div>
        <div>
          <Label label="Category" />
          <CategoryListbox size="xl" />
        </div>
        <div>
          <Label label="User Segment" />
          <UserSegmentListbox size="xl" />
        </div>
      </div>
    </IdeaAdminTab>
  );
}
