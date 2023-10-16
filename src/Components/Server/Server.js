import React from 'react';
import useShowAnimatedRequest from "../hooks/hooks"
import './Server.css';

function Server({nodeKey,getNodeInfo,liveRequests}) {
  const animatedRequests = useShowAnimatedRequest(liveRequests,nodeKey,getNodeInfo)
  return (
    <>
      <div className="server-component-wrapper" style={{ left: `${getNodeInfo(nodeKey).coords[0]}px`, top: `${getNodeInfo(nodeKey).coords[1]}px` }}>
      Server
      </div>
      {animatedRequests}
    </>
    
  );
}

export default Server;