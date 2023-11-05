import React, { useState } from 'react';
import Client from "./Components/Client/Client";
import Server from "./Components/Server/Server";
import Backend from "./Components/Backend/Backend";
import { useSelector } from "react-redux";
import AppBarMain from './Components/Layout/AppBarMain/AppBarMain';

export default function App() {
  // const trafficCounts = useSelector((state) => state.traffic.traffic);
  const [componentList, setComponentList] = useState(
    {
      "0": {type: "client", coords: [200, 300], parentIds: [], childIds: ["1"]},
      "1": {type: "server", coords: [600, 100], parentIds: ["0"], childIds: ["2"]},
      "2": {type: "backend", coords: [600, 300], parentIds: ["1"], childIds: []},
    }
  );

  const updateComponentState = (id,newX,newY) => {
    setComponentList({
      ...componentList,
      [id]: {
        ...componentList[id], // Copy the existing object inside keyToBeUpdated
          coords: [newX,newY], // Update the specific array key
      },
    });
  }

  const liveRequests = useSelector(state => state.traffic.traffic.requests)
  const liveResponses = useSelector(state => state.traffic.traffic.responses)
  const ingressLoad = useSelector(state => state.traffic.traffic.ingressLoad)

  

  function getNodeComponent(nodeKey) {
    const {type} = getNodeInfo(nodeKey);
    switch (type) {
        case "client":
            return <Client nodeKey={nodeKey} liveRequests={liveRequests[nodeKey]} liveResponses={liveResponses[nodeKey]} getNodeInfo={getNodeInfo} updateComponentState={updateComponentState}></Client>
        case "server":
            return <Server nodeKey={nodeKey} liveRequests={liveRequests[nodeKey]} liveResponses={liveResponses[nodeKey]} ingressLoad={ingressLoad[nodeKey]} getNodeInfo={getNodeInfo} updateComponentState={updateComponentState}></Server>
        case "backend":
          return <Backend nodeKey={nodeKey} liveRequests={liveRequests[nodeKey]} liveResponses={liveResponses[nodeKey]} getNodeInfo={getNodeInfo} updateComponentState={updateComponentState}></Backend>
        default:
            return null;
      }
  }

  const getNodeInfo = (nodeKey) => {
    return componentList[nodeKey]
  }

  return (
    <div className="app-main">
      <AppBarMain/>
      
    
      <div className="component-workspace-main">

        {Object.keys(componentList).map((nodeKey,id)=>{
          return <div key={id}>
            {getNodeComponent(nodeKey)}
          </div>
        })}
      </div>
    
    </div>
    
  )
}
