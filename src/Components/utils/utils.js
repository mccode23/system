const createUniqueIdGenerator = () => {
    let idCounter = 0;
    
  
    return (prefix = 'id') => {
      idCounter += 1;
      return `${prefix}-${idCounter}`;
    };
  };
  
export const generateUniqueId = createUniqueIdGenerator();
  