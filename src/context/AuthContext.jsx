import axios from "axios";
import { createContext, useEffect, useState } from "react";
import env from "../constants/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEditableInfo, setUserEditableInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: {
      id: "",
      url: "",
    },
  });

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${env.API_URL}/auth/${user?.data._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        console.log("User details", response.data);
        setUser(response.data);
        const jsonValue = JSON.stringify(response.data);
        await AsyncStorage.setItem("user", jsonValue);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getUserFromLocalstorage = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };
  useEffect(() => {
    getUserFromLocalstorage();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, getUser, setUserEditableInfo, userEditableInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
