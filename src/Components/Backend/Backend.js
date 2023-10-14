import React, { useEffect, useState } from 'react';
import './Backend.css';

function Backend({coords,parent,qps,children}) {
  const [x,y] = [coords[0],coords[1]];
  return (
    <>
      <div className="backend-component-wrapper" style={{ left: `${x}px`, top: `${y}px` }}>
      Backend
      </div>
    </>
    
  );
}

export default Backend;