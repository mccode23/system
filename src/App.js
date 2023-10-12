import React, { useEffect, useState } from 'react';
import BaseComponent from "./Components/BaseComponent"

export default function App() {
  const [componentList, setComponentList] = useState(
    {
      "0": {type: "client", coords: [300, 300], parentIds: [], childIds: ["1","2","3"]},
      "1": {type: "server", coords: [100, 100], parentIds: ["0"], childIds: []},
      "2": {type: "server", coords: [900, 500], parentIds: ["0"], childIds: []},
      "3": {type: "server", coords: [100, 900], parentIds: ["0"], childIds: []},
      "4": {type: "server", coords: [900, 500], parentIds: ["0"], childIds: []},
    }
  );

  const updateComponentIdMapping = (id,newData) => {
     // Create a copy of the current state
     const updatedData = { ...componentList };
    
     // Update the specific key's value
     updatedData[id] = newData;
 
     // Set the updated data as the new state
     setComponentList(updatedData);
  }

  const getNodeInfo = (nodeKey) => {
    return componentList[nodeKey]
  }

  return (
    <>
    {Object.keys(componentList).map((nodeKey,id)=>{
      return <div key={id}>
        <BaseComponent nodeKey={nodeKey} getNodeInfo={getNodeInfo}></BaseComponent>
      </div>
    })}

    </>
  )
}
