import { useState,useEffect } from 'react';
import Request from '../Request/Request';
import { useDispatch } from "react-redux";
import { sendRequest, recievedRequest } from "../../Redux/slices/trafficSlice";
import { generateUniqueId } from '../utils/utils';

const useShowAnimatedRequest = (liveRequests,nodeKey, getNodeInfo) => {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState({}); // request state for component
  const [responses, setResponses] = useState({}); // response state for component
  
  // send animated request
  useEffect(() => {
    if(liveRequests != undefined) {
      let downstreamNodes = Object.keys(liveRequests)
      let newRequests = requests
      for (let index = 0; index < downstreamNodes.length; index++) {
        const downstreamNode = downstreamNodes[index]
        const downstreamNodeRequestIds = liveRequests[downstreamNode]
        const downstreamNodeMostRecentRequestId = downstreamNodeRequestIds[downstreamNodeRequestIds.length-1]
        if(newRequests[downstreamNode] == undefined) {
            newRequests[downstreamNode] = []
        }

        let requestObject = <Request
        key={downstreamNodeMostRecentRequestId}
        requestId={downstreamNodeMostRecentRequestId}
        startX={getNodeInfo(nodeKey).coords[0]}
        startY={getNodeInfo(nodeKey).coords[1]}
        endX={getNodeInfo(downstreamNode).coords[0]}
        endY={getNodeInfo(downstreamNode).coords[1]}
        sender={nodeKey}
        reciever={downstreamNode}
        onRequestReachEnd={handleRequestReachedEnd}
        />
        newRequests[downstreamNode].push(requestObject)
        }
      setRequests({...requests,...newRequests})
    }
  }, [liveRequests])

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

  const handleRequestReachedEnd = (from,to, type, requestId) => {
    if(type == "request") {
        const toNode = getNodeInfo(to)
        const child = toNode.childIds[0] // some way to determine which node gets request ie round robbin
        dispatch(recievedRequest({"from": to, "to": child, "type": "request", requestKey: requestId}));
        if(toNode.childIds.length === 0) {
            // diispatch an actinon tthat wlil updatte liveTraffic
            // last noode inn the list, retturn as a response (send reponse and sett type to response)
        } else {
            // more nodes to travel to
            dispatch(sendRequest({"from": to, "to": child, "type": "request", requestKey: generateUniqueId()}));
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