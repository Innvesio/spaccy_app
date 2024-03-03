import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import env from "../constants/env";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [getCartIsLoading, setGetCartIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  // Get Cart
  const getCart = () => {
    setGetCartIsLoading(true);
    const apiEndPoint = `${env.API_URL}/cart/${user?.data._id}`;
    axios
      .get(apiEndPoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGetCartIsLoading(false);
        setCarts(res.data.data);
      })
      .catch((err) => {
        setGetCartIsLoading(false);
        console.log(err);
      });
  };

  // Get Cart
  const removeItem = (cartId) => {
    const apiEndPoint = `${env.API_URL}/cart/${user?.data._id}`;
    axios
      .delete(apiEndPoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCarts(res.data.data.filter((item) => item._id !== cartId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        setCarts,
        getCart,
        getCartIsLoading,
        setGetCartIsLoading,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
