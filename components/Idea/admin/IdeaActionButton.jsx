export default function IdeaActionButton({ Icon, onClick, type, color, control }) {
  return (
    <button
      type="button"
      className="w-8 h-8 flex justify-center items-center"
      onClick={onClick}
      title={type}>
      <Icon
        className={`w-4 h-4 ${
          control ? `text-${color}-500` : 'text-slate-500 dark:text-aa-300 purple:text-pt-300'
        } hover:text-${color}-500 `}
      />
    </button>
  );
}
