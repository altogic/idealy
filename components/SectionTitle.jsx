import cn from 'classnames';

export default function SectionTitle({ big, sectionTitle, sectionDescription }) {
  return (
    <div>
      <h2
        className={cn(
          'text-slate-800',
          big ? 'mb-2 text-3xl font-semibold tracking-md' : 'mb-1 text-lg font-medium tracking-sm'
        )}>
        {sectionTitle}
      </h2>
      {sectionDescription && (
        <p className="text-slate-500 text-sm tracking-sm">{sectionDescription}</p>
      )}
    </div>
  );
}
