export default function Label({ label, ...props }) {
  return (
    <label
      className="inline-block text-slate-700 dark:text-aa-400 purple:text-pt-400 mb-1.5 text-sm font-medium"
      {...props}>
      {label}
    </label>
  );
}
