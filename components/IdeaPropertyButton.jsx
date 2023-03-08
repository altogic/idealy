import cn from 'classnames';
import { useRouter } from 'next/router';
import { CircleCheck } from './icons';

export default function IdeaPropertyButton({ icon, text, name, active, className }) {
  const router = useRouter();
  return (
    <div className="hover:bg-slate-200 dark:hover:bg-aa-700 purple:hover:bg-pt-800 rounded-lg">
      <button
        type="button"
        className={cn('px-2 flex justify-between py-3 w-full rounded-lg', className)}
        onClick={() => {
          if (active) {
            delete router.query[name];
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query
              }
            });
          } else {
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                [name]: true
              }
            });
          }
        }}>
        <div className="flex grow items-center flex-row space-x-2">
          <div className="flex-shrink-0">{icon}</div>
          <span className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
            {text}
          </span>
        </div>
        {active && (
          <CircleCheck className="w-5 h-5 text-green-500 dark:text-aa-200 purple:text-pt-200 self-end" />
        )}
      </button>
    </div>
  );
}
