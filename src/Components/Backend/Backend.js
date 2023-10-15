import React from 'react';
import useShowAnimatedRequest from "../hooks/hooks"
import './Backend.css';

function Backend({nodeKey,getNodeInfo,liveTraffic}) {
  const animatedRequests = useShowAnimatedRequest(liveTraffic,nodeKey,getNodeInfo)
  return (
    <>
      <div className="backend-component-wrapper" style={{ left: `${getNodeInfo(nodeKey).coords[0]}px`, top: `${getNodeInfo(nodeKey).coords[1]}px` }}>
      Backend
      </div>
      {animatedRequests}
    </>
    
  );
}

export default Backend;