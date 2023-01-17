import { Tooltip } from 'flowbite-react';
import cn from 'classnames';

export default function IdeaActionButton({ Icon, onClick, type, color }) {
  return (
    // eslint-disable-next-line react/style-prop-object
    <Tooltip content={type} placement="bottom" animation="duration-500" style="light">
      <button
        type="button"
        className={cn(
          'w-8 h-8 flex justify-center items-center rounded-full text-slate-500 dark:text-aa-300 purple:text-pt-300 hover:bg-slate-100 dark:hover:bg-aa-700 purple:hover:bg-pt-700',
          color
        )}
        onClick={onClick}
        title={type}>
        <Icon className="w-4 h-4" />
      </button>
    </Tooltip>
  );
}
