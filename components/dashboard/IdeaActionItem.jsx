import Button from '../Button';
import { Plus } from '../icons';
import Label from '../Label';

export default function IdeaActionItem({ label, children, name, openModal }) {
  return (
    <div className="pr-5">
      {label && <Label label={label} />}
      {children}
      {openModal && (
        <Button
          variant="text"
          text={`Add ${name}`}
          icon={<Plus className="w-4 h-4 text-slate-500 dark:text-aa-200 purple:text-pt-200" />}
          onClick={openModal}
        />
      )}
    </div>
  );
}
