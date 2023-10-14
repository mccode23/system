import React, { useEffect, useState } from 'react';
import BaseComponent from "./Components/BaseComponent"

export default function App() {
  const [componentList, setComponentList] = useState(
    {
      "0": {type: "client", coords: [100, 100], parentIds: [], childIds: ["1"]},
      "1": {type: "server", coords: [900, 100], parentIds: ["0"], childIds: ["2"]},
      "2": {type: "backend", coords: [800, 500], parentIds: ["1"], childIds: []},       
    }
  );

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
