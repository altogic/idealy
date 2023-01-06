export default function IdeaActionButton({ Icon, className, onClick, type }) {
  return (
    <button
      type="button"
      className="w-8 h-8 flex justify-center items-center"
      onClick={onClick}
      title={type}>
      <Icon
        className={`w-4 h-4 ${className || 'text-slate-600 dark:text-aa-300 purple:text-pt-300'}`}
      />
    </button>
  );
}
