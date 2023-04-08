import * as React from 'react';

function SvgList(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="list_svg__icon list_svg__icon-tabler list_svg__icon-tabler-list"
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
      <path d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01" />
    </svg>
  );
}
export default SvgList;
