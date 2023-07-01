import * as React from 'react';

const DEFAULT_SIZE = 20;

const StartStruckSmiley = ({ width = DEFAULT_SIZE, height = DEFAULT_SIZE }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 2048 2048"
    width={width}
    height={height}
  >
    <linearGradient
      id="a"
      x1={280.28}
      x2={1767.72}
      y1={1024}
      y2={1024}
      gradientUnits="userSpaceOnUse"
    >
      <stop
        offset={0}
        style={{
          stopColor: '#fedc52',
        }}
      />
      <stop
        offset={0.995}
        style={{
          stopColor: '#fcb117',
        }}
      />
    </linearGradient>
    <circle
      cx={1024}
      cy={1024}
      r={743.72}
      style={{
        fill: 'url(#a)',
      }}
    />
    <radialGradient
      id="b"
      cx={1026.759}
      cy={1311.786}
      r={352.316}
      gradientUnits="userSpaceOnUse"
    >
      <stop
        offset={0.005}
        style={{
          stopColor: '#fff',
        }}
      />
      <stop
        offset={0.328}
        style={{
          stopColor: '#f9f9f9',
        }}
      />
      <stop
        offset={0.612}
        style={{
          stopColor: '#ededed',
        }}
      />
      <stop
        offset={0.879}
        style={{
          stopColor: '#dcdddd',
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: '#d2d3d4',
        }}
      />
    </radialGradient>
    <path
      d="M1476.14 1126.98c-488.34-68.11-898.76 0-898.76 0s-1.71 44.41 12.98 103.75c30.26 118.18 128.88 296.12 436.4 296.12 305.78 0 404.95-175.53 435.79-293.67 15.35-60.56 13.59-106.2 13.59-106.2z"
      style={{
        fill: 'url(#b)',
        stroke: '#542a19',
        strokeWidth: 8,
        strokeMiterlimit: 10,
      }}
    />
    <linearGradient
      id="c"
      x1={440.28}
      x2={929.855}
      y1={750.423}
      y2={750.423}
      gradientUnits="userSpaceOnUse"
    >
      <stop
        offset={0.004}
        style={{
          stopColor: '#e42326',
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: '#ea3d3d',
        }}
      />
    </linearGradient>
    <path
      d="m685.07 517.62 75.64 153.27 169.15 24.57-122.4 119.31 28.89 168.46-151.28-79.54-151.29 79.54 28.89-168.46-122.39-119.31 169.14-24.57z"
      style={{
        fill: 'url(#c)',
      }}
    />
    <linearGradient
      id="d"
      x1={1119.105}
      x2={1608.68}
      y1={750.423}
      y2={750.423}
      gradientUnits="userSpaceOnUse"
    >
      <stop
        offset={0.004}
        style={{
          stopColor: '#e42326',
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: '#ea3d3d',
        }}
      />
    </linearGradient>
    <path
      d="m1363.89 517.62 75.65 153.27 169.14 24.57-122.39 119.31 28.89 168.46-151.29-79.54-151.28 79.54 28.89-168.46-122.4-119.31 169.15-24.57z"
      style={{
        fill: 'url(#d)',
      }}
    />
  </svg>
);
export { StartStruckSmiley };
