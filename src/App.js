import React, { useEffect, useState } from 'react';
import Client from "./Components/Client/Client";
import Server from "./Components/Server/Server";
import Backend from "./Components/Backend/Backend";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  // const trafficCounts = useSelector((state) => state.traffic.traffic);
  const dispatch = useDispatch();
  const [componentList, setComponentList] = useState(
    {
      "0": {type: "client", coords: [100, 100], parentIds: [], childIds: ["1"]},
      "1": {type: "server", coords: [500, 100], parentIds: ["0"], childIds: ["2"]},
      "2": {type: "backend", coords: [700, 100], parentIds: ["1"], childIds: []},
    }
  );

  const liveTraffic = useSelector(state => state.traffic.traffic)
  console.log(liveTraffic)

  function getNodeComponent(nodeKey) {
    const {type, coords,childIds, parentIds} = getNodeInfo(nodeKey);
    switch (type) {
        case "client":
            return <Client nodeKey={nodeKey} liveTraffic={liveTraffic[nodeKey]} getNodeInfo={getNodeInfo}></Client>
        case "server":
            return <Server nodeKey={nodeKey} liveTraffic={liveTraffic[nodeKey]} getNodeInfo={getNodeInfo}></Server>
        case "backend":
          return <Backend nodeKey={nodeKey} liveTraffic={liveTraffic[nodeKey]} getNodeInfo={getNodeInfo}></Backend>
        default:
            return null;
      }
  }

  const getNodeInfo = (nodeKey) => {
    return componentList[nodeKey]
  }

  return (
    <>
    {Object.keys(componentList).map((nodeKey,id)=>{
      return <div key={id}>
        {getNodeComponent(nodeKey)}
      </div>
    })}

    </>
  )
}
