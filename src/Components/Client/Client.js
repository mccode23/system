import React, { useEffect, useState,useRef } from 'react';
import './Client.css';
import Request from '../Request/Request';
import Response from '../Response/Response';

function Client({nodeKey,coords,childIds, parentIds,getNodeInfo}) {
  const [x,y] = [coords[0],coords[1]];
  const [requests, setRequests] = useState([]); // Array to store Request components
  const [responses, setResponses] = useState([]); // Array to store Request components
  const [forwardRequests, setForwardRequest] = useState([]); // Array to store Request components
  const requestCounterRef = useRef(0);
  const forwardRequestCounterRef = useRef(0);
  const responseCounterRef = useRef(0);

  useEffect(() => {
    // Start sending traffic to children
    sendClientRequests();
  }, []);

  const handleRequestReachedEnd = (from,to, type) => {
    // Remove Requests that have reached their destination
    setRequests((prevRequests) => prevRequests.slice(1));
    if(type == "request") {
      let childNodes = getNodeInfo(to).childIds
      if(childNodes.length == 0) {
        sendResponses(from,to)
      } else {
        for (let index = 0; index < childNodes.length; index++) {
          forwardRequest(to,childNodes[index])
        }
      }
    } else {
      let parentNodes = getNodeInfo(to).parentIds
      if(parentNodes.length == 0) {
        // sendResponses(from,to)
        // we're done
        console.log("we ae done")
      } else {
        for (let index = 0; index < parentNodes.length; index++) {
          console.log("forward upstream to parent from ", to, "to ", parentNodes[index])
          sendResponses(to,parentNodes[index])
        }
      }
    }
  };

  const forwardRequest = (from,to) => {
    const newForwardedRequests = []
    let node = getNodeInfo(from);
    let destNode = getNodeInfo(to)

    // Create a new Request component with a unique key and positions
    forwardRequestCounterRef.current += 1;
    const uniqueKey = `response-${forwardRequestCounterRef.current*100}`;
    const newForwardRequest = (
      <Request
        key={uniqueKey}
        startX={node.coords[0]}
        startY={node.coords[1]}
        endX={destNode.coords[0]}
        endY={destNode.coords[1]}
        sender={from}
        reciever={to}
        onRequestReachEnd={handleRequestReachedEnd}
      />
    );
    
    newForwardedRequests.push(newForwardRequest);
  // Add the new Request components to the array of Request
  setForwardRequest((prevForwards) => [...prevForwards, ...newForwardedRequests]);
  }

  const sendResponses = (from,to) => {
    
    const newResponses = []
    let node = getNodeInfo(to);
    if(node.parentIds.length > 0) {
      for (let index = 0; index < node.parentIds.length; index++) {
        const parentNode = getNodeInfo(node.parentIds[index])
        const endX = parentNode.coords[0];
        const endY = parentNode.coords[1];
  
      // Create a new Request component with a unique key and positions
      const uniqueKey = `response-${responseCounterRef.current}`;
      const newResponse = (
        <Response
          key={uniqueKey}
          startX={node.coords[0]}
          startY={node.coords[1]}
          endX={endX}
          endY={endY}
          sender={nodeKey}
          reciever={childIds[index]}
          type={"response"}
          onRequestReachEnd={handleRequestReachedEnd}
        />
      );
      responseCounterRef.current += 1;
      newResponses.push(newResponse)
      };
    // Add the new Request components to the array of Request
    setResponses((prevResponses) => [...prevResponses, ...newResponses]);
    } else {
      // Create a new Request component with a unique key and positions
      const uniqueKey = `response-${responseCounterRef.current}`;
      const newResponse = (
        <Response
          key={uniqueKey}
          startX={getNodeInfo(from).coords[0]}
          startY={getNodeInfo(from).coords[1]}
          endX={getNodeInfo(to).coords[0]}
          endY={getNodeInfo(to).coords[1]}
          sender={from}
          reciever={to}
          type={"response"}
          onRequestReachEnd={handleRequestReachedEnd}
        />
      );
      responseCounterRef.current += 1;
      newResponses.push(newResponse)
      // Add the new Request components to the array of Request
      setResponses((prevResponses) => [...prevResponses, ...newResponses]);
    }
    

  }

  const sendClientRequests = () => {
    const newRequests = []
    for (let index = 0; index < childIds.length; index++) {
      const childNode = getNodeInfo(childIds[index])
      const endX = childNode.coords[0];
      const endY = childNode.coords[1];

    // Create a new Request component with a unique key and positions
    const uniqueKey = `request-${requestCounterRef.current}`;
    const newRequest = (
      <Request
        key={uniqueKey}
        startX={x}
        startY={y}
        endX={endX}
        endY={endY}
        sender={nodeKey}
        reciever={childIds[index]}
        onRequestReachEnd={handleRequestReachedEnd}
      />
    );
    requestCounterRef.current += 1;
    newRequests.push(newRequest)
    };

    // Add the new Request components to the array of Request
    setRequests((prevRequests) => [...prevRequests, ...newRequests]);

    // Schedule the next client Request generation
    setTimeout(sendClientRequests, 1000); // 1 second
  };

  return (
    <>
      <div className="client-component-wrapper" style={{ left: `${x}px`, top: `${y}px` }}>
        Client
      </div>
      {requests}
      {forwardRequests}
      {responses}
    </>
    
  );
}

export default Client;