export default function ButtonBadge({ icon, name, ...props }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-1 bg-gray-100 text-gray-700 py-1 px-2 text-xs font-medium rounded-2xl"
      {...props}>
      {props.icon}
      {props.name}
    </button>
  );
}
