const getIndex = () => {
  let idCounter = -1;
  

  return () => {
    idCounter += 1;
    return idCounter;
  };
};

export const generateIndex = getIndex();
