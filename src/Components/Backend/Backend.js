import React, { useEffect, useState } from 'react';
import './Backend.css';

function Backend({nodeKey,getNodeInfo,liveTraffic}) {
  return (
    <>
      <div className="backend-component-wrapper" style={{ left: `${getNodeInfo(nodeKey).coords[0]}px`, top: `${getNodeInfo(nodeKey).coords[1]}px` }}>
      Backend
      </div>
    </>
    
  );
}

export default Backend;