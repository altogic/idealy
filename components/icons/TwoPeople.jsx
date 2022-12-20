import * as React from 'react';

function SvgTwoPeople(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M15 13.197c1.213.61 2.254 1.588 3.013 2.811.15.242.225.363.251.531.053.34-.18.76-.497.895-.157.066-.332.066-.684.066m-3.75-7.89a3.75 3.75 0 0 0 0-6.72m-1.666 3.36a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Zm-9.534 9.532C3.46 13.787 5.558 12.5 7.917 12.5s4.455 1.287 5.784 3.282c.29.437.436.655.42.935a.924.924 0 0 1-.33.614c-.223.169-.53.169-1.143.169H3.185c-.613 0-.92 0-1.143-.169a.924.924 0 0 1-.329-.614c-.017-.28.129-.498.42-.935Z"
        stroke="currentColor"
        strokeWidth={1.667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgTwoPeople;
