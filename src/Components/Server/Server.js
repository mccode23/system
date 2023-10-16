import React from 'react';
import useShowAnimatedRequest from "../hooks/hooks"
import './Server.css';

function Server({nodeKey,getNodeInfo,liveRequests,liveResponses}) {
  const [animatedRequests,animatedResponses] = useShowAnimatedRequest(nodeKey,getNodeInfo,liveRequests, liveResponses)
  return (
    <>
      <div className="server-component-wrapper" style={{ left: `${getNodeInfo(nodeKey).coords[0]}px`, top: `${getNodeInfo(nodeKey).coords[1]}px` }}>
      Server
      </div>
      {animatedRequests}
      {animatedResponses}
    </>
    
  );
}

export default Server;