const getIndex = () => {
  let idCounter = 0;
  

  return () => {
    idCounter += 1;
    return idCounter;
  };
};

export const generateIndex = getIndex();
