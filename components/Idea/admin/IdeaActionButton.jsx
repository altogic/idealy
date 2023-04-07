import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip';
import cn from 'classnames';

export default function IdeaActionButton({ type, color, control, Icon, onClick }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            'w-8 h-8 flex justify-center items-center rounded-full group relative duration-300',
            `hover:text-${color}-800 hover:bg-${color}-100`,
            `dark:hover:bg-gray-700 dark:hover:text-${color}-400`,
            `purple:hover:bg-gray-700 purple:hover:text-${color}-400`,
            control
              ? `text-${color}-500 dark:text-${color}-400 purple:text-${color}-400`
              : 'text-gray-700 dark:text-aa-200 purple:text-pt-200'
          )}
          onClick={onClick}
          title={type}>
          <Icon className="w-4 h-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent>{type}</TooltipContent>
    </Tooltip>
  );
}
