import * as React from 'react';

function SvgKey(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="key_svg__icon key_svg__icon-tabler key_svg__icon-tabler-key"
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
    <circle cx={8} cy={15} r={4} />
    <path d="M10.85 12.15 19 4M18 5l2 2M15 8l2 2" />
  </svg>
}
export default SvgKey;
