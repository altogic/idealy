import * as React from 'react';

function SvgMerge(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      stroke="#2c3e50"
      fill="none"
      transform="rotate(270)"
      {...props}>
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M3 7h5l3.5 5H21M3 17h5l3.495-5" />
      <path d="m18 15 3-3-3-3" />
    </svg>
  );
}
export default SvgMerge;
