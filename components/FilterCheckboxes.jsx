import { useRouter } from 'next/router';
import Button from './Button';
import Checkbox from './Checkbox';
import { Plus } from './icons';
import Label from './Label';
import StatusBadge from './StatusBadge';

export default function FilterCheckboxes({
  options,
  label,
  onChange,
  openModal,
  name,
  selectedItems,
  setItems
}) {
  const router = useRouter();
  const handleReset = () => {
    setItems([]);
    delete router.query[name];
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query
      }
    });
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label label={label} />
        <Button variant="text" text="Reset" onClick={handleReset} />
      </div>
      <div className="space-y-3 h-64 overflow-auto  px-2">
        {options?.map((item) => (
          <div className="relative flex items-center" key={item?._id}>
            <div key={item?._id} className="flex items-center">
              <Checkbox
                label={name !== 'status' ? item?.name : null}
                checked={selectedItems.includes(item.name)}
                name={name}
                onChange={(e) => onChange(e, item)}
                labelBackground
              />
              {name === 'status' && (
                <div className="ml-2">
                  <StatusBadge name={item.name} color={item.color} className="whitespace-nowrap" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="text"
        text={`Add ${label}`}
        icon={<Plus className="w-4 h-4 text-slate-500 dark:text-aa-200 purple:text-pt-200" />}
        onClick={openModal}
      />
    </div>
  );
}
