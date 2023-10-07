import React from 'react';
import './Square.css';

const Square = ({ x, y, type }) => {
  let color = type === "client" ? "green" : "yellow";
  let title = type === "client" ? "Client" : "Server";
  return <div className="square" style={{ left: `${x}px`, top: `${y}px`, backgroundColor: {color} }}>{title}</div>;
};

export default Square;
