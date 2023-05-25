import CategoryListbox from '@/components/CategoryListbox';
import Label from '@/components/Label';
import StatusListbox from '@/components/StatusListbox';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaStatuses() {
  return (
    <IdeaAdminTab title="Statuses">
      <div className="space-y-4">
        <div>
          <Label label="Status" />
          <StatusListbox size="md" />
        </div>

        <div>
          <Label label="Category" />
          <CategoryListbox size="md" />
        </div>
      </div>
    </IdeaAdminTab>
  );
}
