const roundRobinLB = (children) => {
    let idCounter = 0;
    
  
    return () => {
      idCounter += 1;
      return children[idCounter];
    };
};
  
export const roundRobinLoadBalancer = roundRobinLB();
  