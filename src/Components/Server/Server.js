import React, { useEffect, useState } from 'react';
import useShowAnimatedRequest from "../hooks/hooks"
import './Server.css';
import Draggable from 'react-draggable';

function Server({nodeKey,getNodeInfo,liveRequests,liveResponses,ingressLoad,updateComponentState}) {
  const [animatedRequests,animatedResponses] = useShowAnimatedRequest(nodeKey,getNodeInfo,liveRequests, liveResponses)
  const [inputCount, setInputCount] = useState(-1);
  const [averageInputRate, setAverageInputRate] = useState(0);
  const [startTime, setStartTime] = useState(null);
  let isOverloaded = averageInputRate.toFixed(2) > 100.5;
  let serverTitle = isOverloaded ? "Overloaded Server" : "Server"
  let renderedAnimatedRequests = isOverloaded ? null : animatedRequests
  let renderedAnimatedResponses = isOverloaded ? null : animatedResponses

  let {coords} = getNodeInfo(nodeKey)
  const position = coords === undefined ? {x: 0, y:0} : {x:coords[0],y:coords[1]}

  const handleStop = (e,data) => {
    updateComponentState(nodeKey,data.x,data.y)
  }
  
  // Update the inputCount when the prop 'inputData' changes
   useEffect(() => {
    setInputCount(inputCount + 1);

    // Set the start time if it's not already set
    if (startTime === null) {
      setStartTime(Date.now());
    }
  }, [ingressLoad]);


   // Calculate the input rate per second
   useEffect(() => {
    if (startTime !== null) {
      const currentTime = Date.now();
      const elapsedTimeInSeconds = (currentTime - startTime) / 1000;
      const rate = inputCount / elapsedTimeInSeconds;
      setAverageInputRate(rate);
    }
  }, [inputCount, startTime]);

  return (
    <>
    <Draggable 
          defaultPosition={position}
          onStop={handleStop}>
      <div className={isOverloaded ?  "server-component-wrapper-overloaded" : "server-component-wrapper"}>
      {serverTitle}
      </div>
      </Draggable>
      {renderedAnimatedRequests}
      {renderedAnimatedResponses}
    </>
    
  );
}

export default Server;