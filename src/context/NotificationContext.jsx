import axios from "axios";
import { createContext, useContext, useState } from "react";
import env from "../constants/env";
import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [getNotficationsIsLoading, setGetNotficationsIsLoading] =
    useState(false);
  const { user } = useContext(AuthContext);

  const getUserNotifications = () => {
    setGetNotficationsIsLoading(true);
    axios
      .get(`${env.API_URL}/notification/all`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log("Notifications", res.data);
        setNotifications(res.data.data);
        setGetNotficationsIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setGetNotficationsIsLoading(false);
      });
  };
  return (
    <NotificationContext.Provider
      value={{ getNotficationsIsLoading, getUserNotifications, notifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
