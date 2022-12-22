import * as React from 'react';

function SvgEye(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="#111" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <path
          className="eye_svg__a"
          d="M12 5.251C7.969 5.183 3.8 8 1.179 10.885a1.663 1.663 0 0 0 0 2.226C3.743 15.935 7.9 18.817 12 18.748c4.1.069 8.258-2.813 10.824-5.637a1.663 1.663 0 0 0 0-2.226C20.2 8 16.031 5.183 12 5.251z"
        />
        <path
          className="eye_svg__a"
          d="M15.75 12A3.75 3.75 0 1 1 12 8.249 3.749 3.749 0 0 1 15.75 12z"
        />
      </g>
    </svg>
  );
}
export default SvgEye;
