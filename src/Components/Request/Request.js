import React, { useState, useEffect } from 'react';
import './Request.css';

const Request = ({ startX, startY, endX, endY, onRequestReachEnd, sender, reciever }) => {
  const [position, setPosition] = useState({ left: startX, top: startY });
  const [display,setDisplay] = useState(true);

  useEffect(() => {
    const animateRequest = () => {
      const deltaX = endX - position.left;
      const deltaY = endY - position.top;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const speed = 5; // Adjust the speed as needed
      const step = (speed / distance) * Math.abs(deltaX);


      const animationInterval = setInterval(() => {
        const newPosition = { ...position };
        if (Math.abs(newPosition.left - endX) > Math.abs(step)) {
          newPosition.left = position.left + (speed * deltaX) / distance;
          newPosition.top = position.top + (speed * deltaY) / distance;
          setPosition(newPosition);
        } else {
          clearInterval(animationInterval);
          setDisplay(false);
          onRequestReachEnd(sender,reciever);
        }
      }, 16); // 60 frames per second

      return () => clearInterval(animationInterval);
    };

    const animationCleanup = animateRequest();
    return () => animationCleanup();
  }, [position, endX, endY, onRequestReachEnd]);

  return display ? <div className="request-component-wrapper" style={{ left: `${position.left}px`, top: `${position.top}px` }}></div> : <></>;
};

export default Request;
