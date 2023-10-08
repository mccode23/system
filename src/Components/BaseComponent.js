import React from 'react'
import Client from "./Client/Client"
import Server from "./Server/Server"

export default function BaseComponent({type,coords,parent,qps,children}) {
  function getBaseComponent() {
    switch (type) {
        case "client":
            return <Client coords={coords} parent={parent} qps={qps} children={children}></Client>
        case "server":
            return <Server coords={coords} parent={parent} qps={qps} children={children}></Server>
        default:
            return null;
      }
  }
  
  
  return (
    <>
      {getBaseComponent()}
      {
      children.map((childComp, index) => (
        <BaseComponent key={index} type={childComp.type} coords={childComp.coords} parent={childComp.parent} qps={qps} children={childComp.children}></BaseComponent>
      ))}
    </>
  )
}
