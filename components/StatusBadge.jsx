import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { shadeHexColor } from '../utils';
import { Close as X } from './icons';

export default function StatusBadge({ name, color, onClose, className }) {
  const company = useSelector((state) => state.company.company);
  const [bgColor, setBgColor] = useState();
  console.log('company', color, bgColor);
  useEffect(() => {
    if (color) {
      switch (company?.theme) {
        case 'light':
          setBgColor(shadeHexColor(color, 0.85));
          break;
        case 'dark':
          setBgColor('#29323E');
          break;
        case 'theme-purple':
          setBgColor('#56508E');
          break;

        default:
          setBgColor(shadeHexColor(color, 0.85));
          break;
      }
    }
  }, [company, color]);

  return (
    <div
      style={{ backgroundColor: bgColor, color }}
      className={`${
        className || ''
      } inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full border border-transparent whitespace-nowrap`}>
      <svg className="-ml-1 mr-1.5 h-2 w-2" fill={color} viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
      <p>{name.length > 10 ? `${name.substring(0, 20)}...` : name}</p>
      {onClose && (
        <button className="ml-1.5" onClick={onClose} type="button">
          <span className="sr-only">Close</span>
          <X className="w-3 h-3 icon" />
        </button>
      )}
    </div>
  );
}
