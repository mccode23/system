import React, { useEffect, useState } from 'react';
import './Server.css';

function Server({coords,parent,qps,children}) {
  const [x,y] = [coords[0],coords[1]];
  return (
    <>
      <div className="server-component-wrapper" style={{ left: `${x}px`, top: `${y}px` }}>
      Server
      </div>
    </>
    
  );
}

export default Server;