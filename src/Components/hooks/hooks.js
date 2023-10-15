import { useState,useEffect } from 'react';
import Request from '../Request/Request';
import { useDispatch } from "react-redux";
import { sendRequest } from "../../Redux/slices/trafficSlice";
import { generateUniqueId } from '../utils/utils';

const useShowAnimatedRequest = (liveTraffic,nodeKey, getNodeInfo) => {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState({}); // request state for component
  const [responses, setResponses] = useState({}); // response state for component
  
  // send animated request
  useEffect(() => {
    if(liveTraffic != undefined) {
      let currRequests = requests
      let downstreamNodes = Object.keys(liveTraffic)
      for (let index = 0; index < downstreamNodes.length; index++) {
        const downstreamNode = downstreamNodes[index];
        if(downstreamNode in currRequests === false) {
          currRequests[downstreamNode] = {}
        }
        let lastRequestId = liveTraffic[downstreamNode][0]
        if(lastRequestId in currRequests[downstreamNode] == false) {

        if(nodeKey == "1") {
            console.log("send req from ", getNodeInfo(nodeKey).coords[0], getNodeInfo(nodeKey).coords[1], " to ", getNodeInfo(downstreamNode).coords[0],getNodeInfo(downstreamNode).coords[1])
        }

          let requestObject = <Request
          key={lastRequestId}
          requestId={lastRequestId}
          startX={getNodeInfo(nodeKey).coords[0]}
          startY={getNodeInfo(nodeKey).coords[1]}
          endX={getNodeInfo(downstreamNode).coords[0]}
          endY={getNodeInfo(downstreamNode).coords[1]}
          sender={nodeKey}
          reciever={downstreamNode}
          onRequestReachEnd={handleRequestReachedEnd}
        />
          currRequests[downstreamNode][lastRequestId] = requestObject
        }
      }
      setRequests({...requests,...currRequests})
    }
  }, [liveTraffic])

  const renderRequests = () => {
    const list = []
    if(requests !== undefined) {
      for (let downstreamNode in requests) {
        for(let request in requests[downstreamNode]) {
          list.push(requests[downstreamNode][request])
        }
      }
      
    }
    
    return list
  }

  const handleRequestReachedEnd = (from,to, type) => {
    if(type == "request") {
        const fromNode = getNodeInfo(from)
        const toNode = getNodeInfo(to)
        if(toNode.childIds.length === 0) {
            // diispatch an actinon tthat wlil updatte liveTraffic
            // last noode inn the list, retturn as a response (send reponse and sett type to response)
            // also remooove the request from reduex and component state
            // console.log("time to send a resposne")
        } else {
            // more nodes to travel too
            const child = toNode.childIds[0] // some way to determine which node gets request ie round robbin
            // remove previousRequestId from the state todo
            dispatch(sendRequest({"from": to, "to": child, "type": "request", requestKey: generateUniqueId()}));
            
            // add new request to state
        }
    } else {
        // response
        console.log("response")
    }
  };

  return (
    renderRequests()
  )

};

export default useShowAnimatedRequest;