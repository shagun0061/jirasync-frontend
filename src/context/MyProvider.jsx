import { createContext, useState } from "react";

// Create the context
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Update state function
  const updateState = (newState) => {
    setIsModalOpen(newState);
  };

  return (
    <MyContext.Provider value={{ isModalOpen, updateState }}>
      {children}
    </MyContext.Provider>
  );
};
