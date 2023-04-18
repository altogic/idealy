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
            `hover:stroke-${color}-800 hover:bg-${color}-100`,
            `dark:hover:bg-gray-700 dark:hover:stroke-${color}-400`,
            `purple:hover:bg-gray-700 purple:hover:stroke-${color}-400`,
            control
              ? `stroke-${color}-500 dark:stroke-${color}-400 purple:stroke-${color}-400`
              : 'stroke-gray-700 dark:stroke-aa-200 purple:stroke-pt-200'
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
