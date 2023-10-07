import React, { useEffect, useState } from 'react';
import BaseComponent from "./Components/BaseComponent"

export default function App() {
  const [nodes, setNodes] = useState([{"type": "client", "parent": null, "children": [{"type": "server","coords": [600,300], "children": []}], coords: [300,300], qps: 100}]); // Array to store Ball components

  return (
    <>
    {nodes.map((node,id)=>{
      return <div key={id}>
        <BaseComponent type={node.type} coords={node.coords} parent={node.parent} qps={node.qps} children={node.children}></BaseComponent>
      </div>
    })}

    </>
  )
}
