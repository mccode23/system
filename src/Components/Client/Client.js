import React, { useEffect, useState,useRef } from 'react';
import './Client.css';
import Request from '../Request/Request';

function Client({coords,parent,qps,children}) {
  const [x,y] = [coords[0],coords[1]];
  const [requests, setRequests] = useState([]); // Array to store Request components
  const requestCounterRef = useRef(0);

  useEffect(() => {
    // Start sending traffic to children
    sendRequests();
  }, []);

  const handleRequestReachedEnd = () => {
    // Remove Requests that have reached their destination
    setRequests((prevRequests) => prevRequests.slice(1));

    // tell redux so that the child component knows to do something

  };

  const sendRequests = () => {
    const newRequests = []
    for (let index = 0; index < children.length; index++) {
      const currChild = children[index]
      // Get ending position within the child component
      const endX = currChild.coords[0];
      const endY = currChild.coords[1];

    // Create a new Request component with a unique key and positions
    const uniqueKey = `request-${requestCounterRef.current}`;
    const newRequest = (
      <Request
        key={uniqueKey}
        startX={x}
        startY={y}
        endX={endX}
        endY={endY}
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
    </>
    
  );
}

export default Client;