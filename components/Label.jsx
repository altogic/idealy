export default function Label({ label, ...props }) {
  return (
    <label
      className="inline-block text-slate-700 dark:text-aa-200 purple:text-pt-200 mb-1.5 text-sm font-medium"
      {...props}>
      {label}
    </label>
  );
}
