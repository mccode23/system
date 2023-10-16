import React from 'react';
import useShowAnimatedRequest from "../hooks/hooks"
import './Backend.css';

function Backend({nodeKey,getNodeInfo,liveRequests, liveResponses}) {
  const [animatedRequests,animatedResponses] = useShowAnimatedRequest(nodeKey,getNodeInfo,liveRequests, liveResponses)
  return (
    <>
      <div className="backend-component-wrapper" style={{ left: `${getNodeInfo(nodeKey).coords[0]}px`, top: `${getNodeInfo(nodeKey).coords[1]}px` }}>
      Backend
      </div>
      {animatedRequests}
      {animatedResponses}
    </>
    
  );
}

export default Backend;