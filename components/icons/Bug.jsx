import * as React from 'react';

function SvgBug(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="#111" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <circle className="bug_svg__cls-1" cx={12.022} cy={14.25} r={9} />
        <path
          className="bug_svg__cls-1"
          d="M7.534 6.447C7.341 2.9 9.425 1.5 12.022 1.5S16.7 2.9 16.51 6.447M9.074 2.354 8.272.75M14.97 2.354 15.772.75M12.022 5.25v18"
        />
        <circle className="bug_svg__cls-1" cx={12.022} cy={14.25} r={3} />
        <path
          className="bug_svg__cls-1"
          d="M20.143 10.371A3 3 0 1 1 15.9 6.129M15.9 22.371a3 3 0 1 1 4.242-4.242M8.143 6.129A3 3 0 0 1 3.9 10.371M3.9 18.129a3 3 0 0 1 4.242 4.242M18.463 20.536 19.44 22a2.8 2.8 0 0 0 2.332 1.248M18.754 8.277l.686-1.029A2.8 2.8 0 0 1 21.772 6M20.76 12.087l2.512-.837M20.562 17.097l2.71.903M5.581 20.536 4.6 22a2.8 2.8 0 0 1-2.328 1.25M5.29 8.277 4.6 7.248A2.8 2.8 0 0 0 2.272 6M3.284 12.087.772 11.25M3.481 17.097.772 18"
        />
      </g>
    </svg>
  );
}
export default SvgBug;
