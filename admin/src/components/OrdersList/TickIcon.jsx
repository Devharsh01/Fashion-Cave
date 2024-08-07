import React from 'react';

const TickIcon = ({ fill = '#000000', width = '32px', height = '32px' }) => (
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
        <path d="M9 16.17l-3.88-3.88-1.41 1.41L9 19 20.29 7.71l-1.41-1.41z"></path>
      </g>
    </g>
  </svg>
);

export default TickIcon;
