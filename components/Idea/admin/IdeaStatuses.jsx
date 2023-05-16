import CategoryListbox from '@/components/CategoryListbox';
import Label from '@/components/Label';
import StatusListbox from '@/components/StatusListbox';
import { useSelector } from 'react-redux';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaStatuses() {
  const company = useSelector((state) => state.company.company);
  return (
    <IdeaAdminTab title="Statuses">
      <div className="space-y-4">
        {company?.statuses?.length > 0 && (
          <div>
            <Label label="Status" />
            <StatusListbox size="md" />
          </div>
        )}
        {company?.categories?.length > 0 && (
          <div>
            <Label label="Category" />
            <CategoryListbox size="md" />
          </div>
        )}
      </div>
    </IdeaAdminTab>
  );
}
