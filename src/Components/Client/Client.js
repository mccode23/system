import React, { useEffect } from 'react';
import './Client.css';
import { useDispatch } from "react-redux";
import { sendRequest } from "../../Redux/slices/trafficSlice";
import useShowAnimatedRequest from "../hooks/hooks";
import { generateIndex } from '../hooks/loadBalancers'


function Client({nodeKey,getNodeInfo,liveRequests, liveResponses}) {
  const dispatch = useDispatch();

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

  return (
    <>
      <div className="client-component-wrapper" style={{ left: `${getNodeInfo(nodeKey).coords[0]}px`, top: `${getNodeInfo(nodeKey).coords[1]}px` }}>
        Client
      </div>
      {animatedRequests}
      {animatedResponses}
    </>
    
  );
}

export default Client;