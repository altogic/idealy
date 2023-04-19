import * as React from 'react';

function SvgExclamation(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="exclamation_svg__icon exclamation_svg__icon-tabler exclamation_svg__icon-tabler-alert-circle"
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
      <circle cx={12} cy={12} r={9} />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
export default SvgExclamation;
