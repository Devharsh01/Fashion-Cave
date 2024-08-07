import React from 'react';

const CrossIcon = ({ fill = '#000000', width = '32px', height = '32px' }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    fill={fill} 
    stroke="#000000" 
    strokeWidth="0.00024"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <rect x="0" fill="none" width="24" height="24"></rect>
      <g>
        <path d="M17.705 7.705l-1.41-1.41L12 10.59 7.705 6.295l-1.41 1.41L10.59 12l-4.295 4.295 1.41 1.41L12 13.41l4.295 4.295 1.41-1.41L13.41 12l4.295-4.295z"></path>
      </g>
    </g>
  </svg>
);

export default CrossIcon;
