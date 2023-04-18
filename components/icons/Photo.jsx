import * as React from 'react';

function SvgPhoto(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="photo_svg__icon photo_svg__icon-tabler photo_svg__icon-tabler-photo"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M15 8h.01" />
      <rect x={4} y={4} width={16} height={16} rx={3} />
      <path d="m4 15 4-4a3 5 0 0 1 3 0l5 5" />
      <path d="m14 14 1-1a3 5 0 0 1 3 0l2 2" />
    </svg>
  );
}
export default SvgPhoto;
