import React, { useEffect, useState } from 'react';
import './Client.css';

function Client({coords,parent,qps,children}) {
  const [x,y] = [coords[0],coords[1]];
  return (
    <>
      <div className="client-component-wrapper" style={{ left: `${x}px`, top: `${y}px` }}>
        Client
      </div>
    </>
    
  );
}

export default Client;