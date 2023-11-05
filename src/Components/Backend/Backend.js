import React from 'react';
import useShowAnimatedRequest from "../hooks/hooks"
import './Backend.css';
import Draggable from 'react-draggable';

function Backend({nodeKey,getNodeInfo,liveRequests, liveResponses,updateComponentState}) {
  const [animatedRequests,animatedResponses] = useShowAnimatedRequest(nodeKey,getNodeInfo,liveRequests, liveResponses)
  let {coords} = getNodeInfo(nodeKey)
  const position = coords === undefined ? {x: 0, y:0} : {x:coords[0],y:coords[1]}

  const handleStop = (e,data) => {
    updateComponentState(nodeKey,data.x,data.y)
  }

  return (
    <>
    <Draggable 
          defaultPosition={position}
          onStop={handleStop}>
        <div className="backend-component-wrapper">
        Backend
        </div>
      </Draggable>
      {animatedRequests}
      {animatedResponses}
    </>
    
  );
}

export default Backend;