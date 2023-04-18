import * as React from 'react';

function SvgLockOpen(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="lock-open_svg__icon lock-open_svg__icon-tabler lock-open_svg__icon-tabler-lock-open"
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
    <rect x={5} y={11} width={14} height={10} rx={2} />
    <circle cx={12} cy={16} r={1} />
    <path d="M8 11V6a4 4 0 0 1 8 0" />
  </svg>
}
export default SvgLockOpen;
