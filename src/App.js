import React, { useState } from 'react';
import Client from "./Components/Client/Client";
import Server from "./Components/Server/Server";
import Backend from "./Components/Backend/Backend";
import { useSelector } from "react-redux";

export default function App() {
  // const trafficCounts = useSelector((state) => state.traffic.traffic);
  const [componentList, setComponentList] = useState(
    {
      "0": {type: "client", coords: [200, 300], parentIds: [], childIds: ["1","2","3"]},
      "1": {type: "server", coords: [600, 100], parentIds: ["0"], childIds: ["4"]},
      "2": {type: "server", coords: [600, 300], parentIds: ["0"], childIds: ["5"]},
      "3": {type: "server", coords: [600, 500], parentIds: ["0"], childIds: ["6"]},
      "4": {type: "backend", coords: [900, 100], parentIds: ["2","3"], childIds: []},
      "5": {type: "backend", coords: [900, 300], parentIds: ["2"], childIds: []},
      "6": {type: "backend", coords: [900, 500], parentIds: ["3"], childIds: []},
    }
  );

  const liveRequests = useSelector(state => state.traffic.traffic.requests)
  const liveResponses = useSelector(state => state.traffic.traffic.responses)
  const ingressLoad = useSelector(state => state.traffic.traffic.ingressLoad)

  

  function getNodeComponent(nodeKey) {
    const {type} = getNodeInfo(nodeKey);
    switch (type) {
        case "client":
            return <Client nodeKey={nodeKey} liveRequests={liveRequests[nodeKey]} liveResponses={liveResponses[nodeKey]} getNodeInfo={getNodeInfo}></Client>
        case "server":
            return <Server nodeKey={nodeKey} liveRequests={liveRequests[nodeKey]} liveResponses={liveResponses[nodeKey]} ingressLoad={ingressLoad[nodeKey]} getNodeInfo={getNodeInfo}></Server>
        case "backend":
          return <Backend nodeKey={nodeKey} liveRequests={liveRequests[nodeKey]} liveResponses={liveResponses[nodeKey]} getNodeInfo={getNodeInfo}></Backend>
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
