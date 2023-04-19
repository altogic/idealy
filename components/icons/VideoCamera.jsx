import * as React from 'react';

function SvgVideoCamera(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="video-camera_svg__icon video-camera_svg__icon-tabler video-camera_svg__icon-tabler-video"
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
      <path d="m15 10 4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4z" />
      <rect x={3} y={6} width={12} height={12} rx={2} />
    </svg>
  );
}
export default SvgVideoCamera;
