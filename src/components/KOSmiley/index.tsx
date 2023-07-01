import * as React from 'react';

const DEFAULT_SIZE = 20;

const KOSmiley = ({ width = DEFAULT_SIZE, height = DEFAULT_SIZE }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={width}
    height={height}
    style={{
      shapeRendering: 'geometricPrecision',
      textRendering: 'geometricPrecision',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    }}
    viewBox="0 0 2048 2048"
  >
    <defs>
      <style>{'.fil3{fill:none}.fil2{fill:#5d4037}'}</style>
    </defs>
    <g id="Layer_x0020_1">
      <path
        d="M1024 255.999c424.155 0 768.001 343.845 768.001 768.001 0 424.155-343.845 768.001-768.001 768.001-424.155 0-768.001-343.845-768.001-768.001 0-424.155 343.845-768.001 768.001-768.001z"
        style={{
          fill: '#ffd54f',
        }}
      />
      <path
        d="M1103.2 1280.8c-20.267-20.265-48.268-32.8-79.199-32.8-30.93 0-58.933 12.536-79.198 32.8-20.264 20.264-32.8 48.267-32.8 79.198 0 30.93 12.535 58.932 32.8 79.199 20.265 20.264 48.267 32.8 79.198 32.8 30.932 0 58.935-12.536 79.199-32.8 20.264-20.265 32.8-48.267 32.8-79.2 0-30.93-12.536-58.933-32.8-79.197z"
        style={{
          fill: '#424242',
        }}
      />
      <path
        d="M1024 1149.99c97.195 0 176.001 78.804 176.001 176 0 97.197-78.804 176.001-176.001 176.001-97.195 0-176-78.806-176-176.001 0-97.194 78.806-176 176-176z"
        className="fil2"
      />
      <g id="_395334048">
        <path
          id="_395334264"
          d="m623.311 786.068 60.254-32.699-60.254-32.698 34.256-63.177 101.336 54.991 101.335-54.991 34.256 63.177-60.254 32.698 60.254 32.699-34.256 63.177-101.335-54.992-101.336 54.992z"
          className="fil2"
        />
        <path
          id="_395334096"
          d="m1153.51 786.068 60.25-32.699-60.25-32.698 34.25-63.177 101.34 54.991 101.33-54.991 34.26 63.177-60.25 32.698 60.25 32.699-34.26 63.177-101.33-54.992-101.34 54.992z"
          className="fil2"
        />
      </g>
      <path d="M0 0h2048v2048H0z" className="fil3" />
      <path d="M255.999 255.999h1536v1536h-1536z" className="fil3" />
    </g>
  </svg>
);
export { KOSmiley };