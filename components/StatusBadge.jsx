import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { shadeHexColor } from '../utils';

export default function StatusBadge({ name, color, className }) {
  const company = useSelector((state) => state.company.company);
  const [bgColor, setBgColor] = useState();

  useEffect(() => {
    if (color) {
      if (company.theme === 'light') {
        setBgColor(shadeHexColor(color, 0.85));
      }

      if (company.theme === 'dark') {
        setBgColor('#29323E');
      }
      if (company.theme === 'theme-purple') {
        setBgColor('#56508E');
      }
    }
  }, [company]);

  return (
    <div
      style={{ backgroundColor: bgColor, color }}
      className={`${className} inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full border border-transparent`}>
      <svg className="-ml-1 mr-1.5 h-2 w-2" fill={color} viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
      {name}
    </div>
  );
}
