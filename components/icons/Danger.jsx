import * as React from 'react';

function SvgDanger(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="danger_svg__icon danger_svg__icon-tabler danger_svg__icon-tabler-alert-triangle"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#ff4500"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M12 9v2m0 4v.01M5 19h14a2 2 0 0 0 1.84-2.75L13.74 4a2 2 0 0 0-3.5 0l-7.1 12.25A2 2 0 0 0 4.89 19" />
  </svg>
}
export default SvgDanger;
