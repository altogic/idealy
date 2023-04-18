import * as React from 'react';

function SvgFilter(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="filter_svg__icon filter_svg__icon-tabler filter_svg__icon-tabler-filter"
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
      <path d="M5.5 5h13a1 1 0 0 1 .5 1.5L14 12v7l-4-3v-4L5 6.5A1 1 0 0 1 5.5 5" />
    </svg>
  );
}
export default SvgFilter;
