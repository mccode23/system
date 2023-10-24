import React, { useEffect } from 'react';
import './Client.css';
import { useDispatch } from "react-redux";
import { sendRequest } from "../../Redux/slices/trafficSlice";
import useShowAnimatedRequest from "../hooks/hooks";
import { generateIndex } from '../hooks/loadBalancers'
import Draggable from 'react-draggable';


function Client({nodeKey,coords,getNodeInfo,liveRequests, liveResponses, updateComponentState}) {
  const dispatch = useDispatch();
  const position = coords === undefined ? {x: 0, y:0} : {x:coords[0],y:coords[1]}

  useEffect(() => {
    initClientRequests();
  }, []);

  const [animatedRequests,animatedResponses] = useShowAnimatedRequest(nodeKey,getNodeInfo,liveRequests, liveResponses)

  const initClientRequests = () => {
    let childrenIds = getNodeInfo(nodeKey).childIds
    let idx = generateIndex() % childrenIds.length    
    let nextChild = childrenIds[idx]    
    dispatch(sendRequest({"from": nodeKey, "to": nextChild, "type": "request"}));
    setTimeout(initClientRequests, 1000); // 1 second
  };

  const handleStop = (e,data) => {
    updateComponentState(nodeKey,data.x,data.y)
  }

  return (
    <>
    <Draggable
    defaultPosition={position}
    onStop={handleStop}>
      <div className="client-component-wrapper">
        Client
      </div>
    </Draggable>
      {animatedRequests}
      {animatedResponses}
    </>
    
  );
}

export default Client;