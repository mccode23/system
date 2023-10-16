import React, { useEffect } from 'react';
import './Client.css';
import { useDispatch } from "react-redux";
import { sendRequest } from "../../Redux/slices/trafficSlice";
import useShowAnimatedRequest from "../hooks/hooks";
import { generateUniqueId } from '../utils/utils';

function Client({nodeKey,getNodeInfo,liveRequests, liveResponses}) {
  const dispatch = useDispatch(); 

  useEffect(() => {
    initClientRequests();
  }, []);

  const animatedRequests = useShowAnimatedRequest(liveRequests,nodeKey,getNodeInfo)
  // const animatedResponses = useShowAnimatedRequest(liveRequests,nodeKey,getNodeInfo)

  const initClientRequests = () => {
    dispatch(sendRequest({"from": nodeKey, "to": getNodeInfo(nodeKey).childIds[0], "type": "request", requestKey: generateUniqueId()}));
    setTimeout(initClientRequests, 5000); // 1 second
  };

  return (
    <>
      <div className="client-component-wrapper" style={{ left: `${getNodeInfo(nodeKey).coords[0]}px`, top: `${getNodeInfo(nodeKey).coords[1]}px` }}>
        Client
      </div>
      {animatedRequests}
    </>
    
  );
}

export default Client;