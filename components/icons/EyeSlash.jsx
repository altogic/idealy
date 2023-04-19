import * as React from 'react';

function SvgEyeSlash(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="eye-slash_svg__icon eye-slash_svg__icon-tabler eye-slash_svg__icon-tabler-eye-off"
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
    <path d="m3 3 18 18M10.584 10.587a2 2 0 0 0 2.828 2.83" />
    <path d="M9.363 5.365A9.466 9.466 0 0 1 12 5c4 0 7.333 2.333 10 7-.778 1.361-1.612 2.524-2.503 3.488m-2.14 1.861C15.726 18.449 13.942 19 12 19c-4 0-7.333-2.333-10-7 1.369-2.395 2.913-4.175 4.632-5.341" />
  </svg>
}
export default SvgEyeSlash;
