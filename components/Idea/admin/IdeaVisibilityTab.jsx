import IdeaVisibility from '../IdeaVisibility';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaVisibilityTab() {
  return (
    <IdeaAdminTab title="Visibility">
      <IdeaVisibility listBoxSize="xl" />
    </IdeaAdminTab>
  );
}
