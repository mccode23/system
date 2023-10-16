import { useState,useEffect } from 'react';
import Request from '../Request/Request';
import { useDispatch } from "react-redux";
import { sendRequest, recievedRequest } from "../../Redux/slices/trafficSlice";
import { generateUniqueId } from '../utils/utils';

const useShowAnimatedRequest = (nodeKey,getNodeInfo,liveRequests, liveResponses) => {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState({}); // request state for component
  const [responses, setResponses] = useState({}); // response state for component
  
  // send animated request
  useEffect(() => {
    if(liveRequests != undefined) {
      let downstreamNodes = Object.keys(liveRequests)
      let newRequests = []

      for (let index = 0; index < downstreamNodes.length; index++) {
        const downstreamNode = downstreamNodes[index]
        const downstreamNodeRequests = liveRequests[downstreamNode]
        if(newRequests[downstreamNode] == undefined) {
                    newRequests[downstreamNode] = []
                }
        for (let y = 0; y < downstreamNodeRequests.length; y++) {
            let id = downstreamNodeRequests[y]
            let requestObject = <Request
            key={id}
            requestId={id}
            startX={getNodeInfo(nodeKey).coords[0]}
            startY={getNodeInfo(nodeKey).coords[1]}
            endX={getNodeInfo(downstreamNode).coords[0]}
            endY={getNodeInfo(downstreamNode).coords[1]}
            sender={nodeKey}
            reciever={downstreamNode}
            onRequestReachEnd={handleRequestReachedEnd}
            type="request"
            />
            newRequests[downstreamNode].push(requestObject)
            }
        } 

        
        
        setRequests({...requests,...newRequests})
    }
  }, [liveRequests])

  // send animated response
  useEffect(() => {
    if(liveResponses != undefined) {
      let upstreamNodes = Object.keys(liveResponses)
      let newResponses = []

      for (let index = 0; index < upstreamNodes.length; index++) {
        const upstreamNode = upstreamNodes[index]
        const upstreamNodeRequests = liveResponses[upstreamNode]
        if(newResponses[upstreamNode] == undefined) {
            newResponses[upstreamNode] = []
                }
        for (let y = 0; y < upstreamNodeRequests.length; y++) {
            const id = upstreamNodeRequests[y];
            let requestObject = <Request
            key={id}
            requestId={id}
            startX={getNodeInfo(nodeKey).coords[0]}
            startY={getNodeInfo(nodeKey).coords[1]+100}
            endX={getNodeInfo(upstreamNode).coords[0]}
            endY={getNodeInfo(upstreamNode).coords[1]+100}
            sender={nodeKey}
            reciever={upstreamNode}
            onRequestReachEnd={handleRequestReachedEnd}
            type="response"
            />
            newResponses[upstreamNode].push(requestObject)
            }
        } 

        
        
        setResponses({...responses,...newResponses})
    }
  }, [liveResponses])

  const renderRequestsAndResponses = () => {
    const requestList = []
    const responseList = []
    if(requests !== undefined) {
      for (let downstreamNode in requests) {
        for(let request in requests[downstreamNode]) {
            requestList.push(requests[downstreamNode][request])
        }
      }
      
    }

    if(responses !== undefined) {
        for (let upstreamNode in responses) {
          for(let request in responses[upstreamNode]) {
            responseList.push(responses[upstreamNode][request])
          }
        }
        
      }
    
    return [requestList,responseList]
  }

  const handleRequestReachedEnd = (from,to, type) => {
    const toNode = getNodeInfo(to)
    if(type == "request") {
        dispatch(recievedRequest({"from": from, "to": to, "type": "request"}));
        if(toNode.childIds.length === 0) {
            // start response flow
            dispatch(sendRequest({"from": to, "to": from, "type": "response"}));
        } else {
            const child = toNode.childIds[0] // some way to determine which node gets request ie round robbin
            // more nodes to travel to
            dispatch(sendRequest({"from": to, "to": child, "type": "request"}));
        }
    } else {
        dispatch(recievedRequest({"from": from, "to": to, "type": "response"}));
        if(toNode.parentIds.length === 0) {
            console.log("thatts tthe end")
        } else {
            console.log("go to my parent")
            const parent = toNode.parentIds[0] // some way to determine which node gets request ie pass in parent path
            dispatch(sendRequest({"from": to, "to": parent, "type": "response"}));
        }
    }
  };

  return (
    renderRequestsAndResponses()
  )

};

export default useShowAnimatedRequest;