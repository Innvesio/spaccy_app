import { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [enquireNowDetails, setEnquireNowDetails] = useState({
    layout: "",
    people: 0,
    message: "",
    flexible: false,
    dateAndTime: {
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  const enquireNow = () => {
    console.log(enquireNowDetails);
  };
  return (
    <BookingContext.Provider
      value={{
        enquireNowDetails,
        setEnquireNowDetails,
        enquireNow,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
