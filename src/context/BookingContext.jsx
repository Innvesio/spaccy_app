import { createContext } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  return (
    <BookingContext.Provider value={{}}>{children}</BookingContext.Provider>
  );
};
