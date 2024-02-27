import axios from "axios";
import { createContext, useEffect, useState } from "react";
import env from "../constants/env";

export const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  const allSpaces = () => {
    const endPoint = process.env.API_URL;
  };

  const getAllEventTypes = () => {
    axios
      .get(`${env.API_URL}/search/event_type`)
      .then((res) => {
        setEventTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllEventTypes();
  }, []);

  return (
    <SpaceContext.Provider
      value={{ spaces, setSpaces, eventTypes, setEventTypes, getAllEventTypes }}
    >
      {children}
    </SpaceContext.Provider>
  );
};
