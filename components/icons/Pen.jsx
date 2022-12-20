import * as React from 'react';

function SvgPen(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="m2.083 17.917 4.624-1.779c.296-.114.444-.17.582-.245.123-.066.24-.142.35-.228.125-.096.237-.208.46-.432l9.4-9.4A2.357 2.357 0 1 0 14.167 2.5l-9.4 9.4c-.224.224-.336.336-.432.46a2.5 2.5 0 0 0-.227.35c-.075.138-.132.286-.245.582l-1.779 4.625Zm0 0 1.715-4.46c.123-.319.184-.478.29-.551a.417.417 0 0 1 .315-.067c.126.024.247.145.489.386l1.882 1.883c.242.242.363.362.387.488a.417.417 0 0 1-.067.316c-.073.105-.233.167-.552.29l-4.459 1.715Z"
        stroke="currentColor"
        strokeWidth={1.667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgPen;
