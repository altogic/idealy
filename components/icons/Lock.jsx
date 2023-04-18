import * as React from 'react';

function SvgLock(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="lock_svg__icon lock_svg__icon-tabler lock_svg__icon-tabler-lock-off"
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
    <path d="m3 3 18 18M19 19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h4m4 0h2a2 2 0 0 1 2 2v2" />
    <circle cx={12} cy={16} r={1} />
    <path d="M8 11V8m.712-3.278A4 4 0 0 1 16 7v4" />
  </svg>
}
export default SvgLock;
