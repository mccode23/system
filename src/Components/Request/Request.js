import React, { useState, useEffect } from 'react';
import './Request.css';

const Request = ({ startX, startY, endX, endY, onRequestReachEnd }) => {
  const [position, setPosition] = useState({ left: startX, top: startY });

  useEffect(() => {
    const animateRequest = () => {
      const deltaX = endX - position.left;
      const deltaY = endY - position.top;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const speed = 2; // Adjust the speed as needed
      const step = (speed / distance) * deltaX;

      const animationInterval = setInterval(() => {
        const newPosition = { ...position };
        if (Math.abs(newPosition.left - endX) > Math.abs(step)) {
          newPosition.left += step;
          newPosition.top += (deltaY / distance) * step;
          setPosition(newPosition);
        } else {
          clearInterval(animationInterval);
          onRequestReachEnd();
        }
      }, 16); // 60 frames per second

      return () => clearInterval(animationInterval);
    };

    const animationCleanup = animateRequest();
    return () => animationCleanup();
  }, [position, endX, endY, onRequestReachEnd]);

  return <div className="request-component-wrapper" style={{ left: `${position.left}px`, top: `${position.top}px` }}></div>;
};

export default Request;
