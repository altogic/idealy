import { Disclosure } from '@headlessui/react';
import cn from 'classnames';
import { ChevronUp } from './icons';
import SimilarIdeaCard from './SimilarIdeaCard';

export default function SimilarIdeas({ similarIdeas }) {
  return (
    <div className="w-full mt-8 rounded-lg border border-gray-300 dark:border-aa-600 purple:border-pt-800 overflow-hidden">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between bg-slate-100 dark:bg-aa-800 purple:bg-pt-800 text-slate-800 dark:text-aa-200 purple:text-pt-200 px-4 py-2 text-left text-sm font-medium hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
              <span>{open ? 'Hide' : 'Show'} similar ideas</span>
              <ChevronUp
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-slate-500 dark:text-aa-200 purple:text-pt-200`}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              className={cn(
                similarIdeas.length > 1 ? 'max-h-52' : 'max-h-40',
                `p-4 text-sm text-gray-500 overflow-hidden overflow-y-auto overflow-scroll-fix`
              )}>
              {similarIdeas.map((idea) => (
                <SimilarIdeaCard key={idea?._id} idea={idea} />
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
