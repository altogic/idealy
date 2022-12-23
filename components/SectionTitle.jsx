import cn from 'classnames';

export default function SectionTitle({ big, sectionTitle, sectionDescription }) {
  return (
    <div>
      <h2
        className={cn(
          'text-slate-800 dark:text-aa-100 purple:text-pt-100',
          big ? 'mb-2 text-3xl font-semibold tracking-md' : 'mb-1 text-lg font-medium tracking-sm'
        )}>
        {sectionTitle}
      </h2>
      {sectionDescription && (
        <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
          {sectionDescription}
        </p>
      )}
    </div>
  );
}
