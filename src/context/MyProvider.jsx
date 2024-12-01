import { createContext, useState } from "react";

// Create the context
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MyContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </MyContext.Provider>
  );
};
