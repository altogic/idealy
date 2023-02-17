import { IDEA_BADGES } from 'constants';
import Badge from '../Badge';

export default function IdeaBadges({ idea }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {IDEA_BADGES?.map(
          (badge) =>
            ((badge.field !== 'isApproved' && idea?.[badge.field]) ||
              (badge.field === 'isApproved' && !idea?.[badge.field])) && (
              <Badge key={badge.name} Icon={badge?.icon} text={badge?.name} color={badge.color} />
            )
        )}
      </div>
    </div>
  );
}
