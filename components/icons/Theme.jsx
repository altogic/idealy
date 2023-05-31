import * as React from 'react';

function SvgTheme(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="theme_svg__icon theme_svg__icon-tabler theme_svg__icon-tabler-brush"
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
      <path d="M3 21v-4a4 4 0 1 1 4 4H3" />
      <path d="M21 3A16 16 0 0 0 8.2 13.2M21 3a16 16 0 0 1-10.2 12.8" />
      <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
    </svg>
  );
}
export default SvgTheme;
