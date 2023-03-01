import { useRouter } from 'next/router';
import BaseListBox from './BaseListBox';
import { FilterHamburger } from './icons';

export default function FilterCheckboxes({
  options,
  label,
  onChange,

  name,

  selectedItems
}) {
  const router = useRouter();
  const handleReset = () => {
    onChange([]);
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
      {!!options?.length && (
        <div className="space-y-3">
          <BaseListBox
            value={selectedItems}
            onChange={onChange}
            field="name"
            options={options}
            icon={
              <FilterHamburger className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
            }
            label={label}
            valueField="name"
            multiple
            size="xl"
            hidden="mobile"
            type={label !== 'Topic' ? 'status' : 'default'}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  );
}
