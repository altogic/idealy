import * as React from 'react';

function SvgFaceHappy(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="face-happy_svg__icon face-happy_svg__icon-tabler face-happy_svg__icon-tabler-mood-happy"
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
    <circle cx={12} cy={12} r={9} />
    <path d="M9 9h.01M15 9h.01M8 13a4 4 0 1 0 8 0m0 0H8" />
  </svg>
}
export default SvgFaceHappy;
