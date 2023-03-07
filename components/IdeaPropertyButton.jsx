import cn from 'classnames';
import { useRouter } from 'next/router';

export default function IdeaPropertyButton({ icon, text, name, className }) {
  const router = useRouter();
  return (
    <div className="hover:bg-slate-200 dark:hover:bg-aa-700 purple:hover:bg-pt-800 rounded-lg">
      <button
        type="button"
        className={cn('px-2 flex flex-col py-3 w-full rounded-lg', className, {
          'bg-slate-200 dark:bg-aa-700 purple:bg-pt-800': router.query[name] === 'true'
        })}
        onClick={() => {
          if (router.query[name] === 'true') {
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
      </button>
    </div>
  );
}
