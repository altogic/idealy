import { Tooltip } from 'flowbite-react';
import cn from 'classnames';

export default function IdeaActionButton({ type, color, control, Icon, onClick }) {
  return (
    // eslint-disable-next-line react/style-prop-object
    <Tooltip content={type} placement="bottom" animation="duration-500" style="light">
      <button
        type="button"
        className={cn(
          'w-8 h-8 flex justify-center items-center rounded-full',
          `hover:text-${color}-800 hover:bg-${color}-100`,
          `dark:hover:bg-gray-700 dark:hover:text-${color}-400`,
          `purple:hover:bg-gray-700 purple:hover:text-${color}-400`,
          control
            ? `text-${color}-500 dark:text-${color}-400 purple:text-${color}-400`
            : 'text-gray-700 dark:text-aa-100 purple:text-pt-100'
        )}
        onClick={onClick}
        title={type}>
        <Icon className="w-4 h-4" />
      </button>
    </Tooltip>
  );
}
