import React, { useEffect, useState } from 'react';
import useShowAnimatedRequest from "../hooks/hooks"
import './Server.css';

function Server({nodeKey,getNodeInfo,liveTraffic}) {
  const animatedRequests = useShowAnimatedRequest(liveTraffic,nodeKey,getNodeInfo)
  return (
    <>
      <div className="server-component-wrapper" style={{ left: `${getNodeInfo(nodeKey).coords[0]}px`, top: `${getNodeInfo(nodeKey).coords[1]}px` }}>
      Server
      {animatedRequests}
      </div>
    </>
    
  );
}

export default Server;