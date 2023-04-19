import * as React from 'react';

function SvgCopy(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="copy_svg__icon copy_svg__icon-tabler copy_svg__icon-tabler-copy"
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
    <rect x={8} y={8} width={12} height={12} rx={2} />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
}
export default SvgCopy;
