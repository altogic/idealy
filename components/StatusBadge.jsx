import { useEffect, useState } from 'react';
import { shadeHexColor } from '../utils';

export default function StatusBadge({ name, color, className }) {
  const [bgColor, setBgColor] = useState();

  useEffect(() => {
    const bodyClasses = document.body.classList;
    if (color) {
      if (Object.values(bodyClasses).includes('light')) {
        setBgColor(shadeHexColor(color, 0.85));
      }

      if (Object.values(bodyClasses).includes('dark')) {
        setBgColor('#29323E');
      }

      if (Object.values(bodyClasses).includes('theme-purple')) {
        setBgColor('#6F67B7');
      }
    }
  }, [color]);

  return (
    <div
      className={
        className ||
        'inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded border'
      }
      style={{ backgroundColor: bgColor, color }}>
      <svg className="-ml-1 mr-1.5 h-2 w-2" fill={color} viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
      {name}
    </div>
  );
}
