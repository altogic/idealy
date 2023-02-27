import { IDEA_BADGES } from 'constants';
import { useEffect, useState } from 'react';
import Badge from '../Badge';

export default function IdeaBadges({ idea }) {
  const [badges, setBadges] = useState();

  useEffect(() => {
    setBadges(IDEA_BADGES);
  }, [IDEA_BADGES]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {badges?.map(
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
