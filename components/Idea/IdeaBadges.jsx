import { IDEA_BADGES } from 'constants';
import cn from 'classnames';
import Badge from '../Badge';

export default function IdeaBadges({ idea }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {IDEA_BADGES?.map(
          (badge, index) =>
            idea?.[badge.field] && (
              <Badge
                key={badge.name}
                Icon={badge.icon}
                text={badge.name}
                className={cn(badge.className, index === IDEA_BADGES.length - 1 && 'mr-2')}
              />
            )
        )}
      </div>
    </div>
  );
}
