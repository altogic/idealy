import Label from '../Label';

export default function IdeaActionItem({ label, children }) {
  return (
    <div className="pr-4">
      {label && <Label label={label} />}
      {children}
    </div>
  );
}
