import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BaseListBox from './BaseListBox';
import { FilterHamburger } from './icons';
import StatusBadge from './StatusBadge';
import TopicBadges from './TopicBadges';

export default function FilterCheckboxes({ options, label, onChange, name, selectedItems }) {
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
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    if (selectedItems?.length > 0) {
      const selectedOptions = options.filter((option) => selectedItems.includes(option.name));
      setSelectedOptions(selectedOptions);
    }
  }, [selectedItems]);

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
              <FilterHamburger className="w-5 h-5 icon" />
            }
            label={label}
            valueField="name"
            multiple
            size="xl"
            hidden="mobile"
            type={label !== 'Topics' ? 'status' : 'default'}
            onReset={handleReset}
          />
        </div>
      )}
      {selectedItems?.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {selectedOptions.map((item) =>
            label !== 'Topics' ? (
              <StatusBadge name={item.name} key={item._id} color={item.color} />
            ) : (
              <TopicBadges key={item._id} badgeName={item.name} />
            )
          )}
        </div>
      )}
    </div>
  );
}
