import * as React from 'react';

function SvgClose(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="close_svg__icon close_svg__icon-tabler close_svg__icon-tabler-x"
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
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
}
export default SvgClose;
