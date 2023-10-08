import React, { useEffect, useState,useRef } from 'react';
import './Client.css';
import Request from '../Request/Request';
import Response from '../Response/Response';

function Client({nodeKey,coords,childIds, parentIds,getNodeInfo}) {
  const [x,y] = [coords[0],coords[1]];
  const [requests, setRequests] = useState([]); // Array to store Request components
  const [responses, setResponses] = useState([]); // Array to store Request components
  const requestCounterRef = useRef(0);
  const responseCounterRef = useRef(0);

  useEffect(() => {
    // Start sending traffic to children
    sendRequests();
  }, []);

  const handleRequestReachedEnd = (from,to) => {
    // Remove Requests that have reached their destination
    setRequests((prevRequests) => prevRequests.slice(1));
    sendResponses(from,to)
  };

  const sendResponses = (from,to) => {
    const newResponses = []
    let node = getNodeInfo(to);
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
        startY={node.coords[1]+100}
        endX={endX}
        endY={endY+100}
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

  }

  const sendRequests = () => {
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

    // Schedule the next Request generation
    setTimeout(sendRequests, 1000); // Adjust the delay as needed
  };

  return (
    <>
      <div className="client-component-wrapper" style={{ left: `${x}px`, top: `${y}px` }}>
        Client
      </div>
      {requests}
      {responses}
    </>
    
  );
}

export default Client;