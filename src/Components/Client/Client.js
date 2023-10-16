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

  const [animatedRequests,animatedResponses] = useShowAnimatedRequest(nodeKey,getNodeInfo,liveRequests, liveResponses)

  const initClientRequests = () => {
    dispatch(sendRequest({"from": nodeKey, "to": getNodeInfo(nodeKey).childIds[0], "type": "request"}));
    setTimeout(initClientRequests, 7000); // 1 second
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