import React, {useRef} from 'react'
import Client from "./Client/Client"
import Server from "./Server/Server"
import Backend from "./Backend/Backend"


export default function BaseComponent({nodeKey, getNodeInfo}) {
  function getBaseComponent() {
    const {type, coords,childIds, parentIds} = getNodeInfo(nodeKey);
    switch (type) {
        case "client":
            return <Client nodeKey={nodeKey} coords={coords}  childIds={childIds} parentIds={parentIds} getNodeInfo={getNodeInfo}></Client>
        case "server":
            return <Server nodeKey={nodeKey} coords={coords} childIds={childIds} parentIds={parentIds} getNodeInfo={getNodeInfo}></Server>
        case "backend":
          return <Backend nodeKey={nodeKey} coords={coords} childIds={childIds} parentIds={parentIds} getNodeInfo={getNodeInfo}></Backend>
        default:
            return null;
      }
  }
  
  
  return (
    <>
      {getBaseComponent()}
      {
      getNodeInfo(nodeKey).childIds.map((childId, index) => (
        <BaseComponent key={index} nodeKey={childId} getNodeInfo={getNodeInfo}></BaseComponent>
      ))}
    </>
  )
}
