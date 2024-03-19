import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import env from "../constants/env";
import { getBookingIds } from "../utils/funcs/helpers";
import { View } from "react-native";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [getCartIsLoading, setGetCartIsLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const [isPaying, setIsPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [UIState, setUIState] = useState("cart");

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
  const removeCartItem = (cartId) => {
    const apiEndPoint = `${env.API_URL}/cart/${cartId}`;
    axios
      .delete(apiEndPoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setCarts(carts.filter((item) => item._id !== cartId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to create a new cart data to allow the implementation of discount prices
  const createNewData = async (cartItem) => {
    try {
      let data = [];

      const bookingIds = await getBookingIds(cartItem, user);

      for (let i = 0; i < carts.length; i++) {
        const { _id, itemId, itemType, itemName, venueName, coverPhoto } =
          carts[i];
        let finalizedPrice;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        };

        if (itemType === "vendor") {
          const res = await axios.get(`/business/${itemId}`, {
            baseURL: `${env.API_URL}`,
            headers,
          });

          const { discount, discountPercentage } =
            res?.data?.data?.business.additionalInformation;

          if (discount) {
            if (discountPercentage.includes("%")) {
              const discountAmount = discountPercentage.split("%")[0];

              if (!isNaN(parseInt(discountAmount))) {
                const number =
                  (parseInt(discountAmount) / 100) * carts[i].finalizedPrice;

                const theDiscount = carts[i].finalizedPrice - number;
                finalizedPrice = theDiscount;
              }
            } else {
              if (!isNaN(parseInt(discountPercentage))) {
                const number =
                  (parseInt(discountPercentage) / 100) *
                  carts[i].finalizedPrice;

                const theDiscount = carts[i].finalizedPrice - number;
                finalizedPrice = theDiscount;
              }
            }
          }
        } else {
          finalizedPrice = carts[i].finalizedPrice;
        }

        const thisData = {
          _id,
          itemId,
          itemType,
          itemName,
          venueName,
          coverPhoto,
          finalizedPrice,
          actualPrice: carts[i].finalizedPrice,
        };

        for (let j = 0; j < bookingIds.length; j++) {
          if (
            bookingIds[j].service.id === itemId &&
            bookingIds[j].status === "on hold"
          ) {
            thisData.itemStatus = bookingIds[j].status;
          }
        }

        if (!thisData.hasOwnProperty("itemStatus")) {
          thisData.itemStatus = "cart";
        }

        data.push(thisData);
      }

      setNewData(data);
      setIsPaying(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (carts.length) {
      createNewData();
    }
  }, [carts]);

  // useEffect(() => {
  //   if (user && newData.length) {
  //     const miscFunc = (res) => {
  //       console.log(res?.data);
  //       let localBookingIds = JSON.parse(sessionStorage.getItem("booking_ids"));

  //       // Extract the _id values from res.data.data
  //       const newIds = res?.data?.data.map((booking) => booking._id.toString());
  //       console.log(Array.isArray(localBookingIds));

  //       // If statement for "booking_ids"
  //       if (localBookingIds && Array.isArray(localBookingIds)) {
  //         const newLocalBookings = new Set([...localBookingIds, ...newIds]);

  //         sessionStorage.setItem(
  //           "booking_ids",
  //           JSON.stringify(newLocalBookings)
  //         );
  //       } else {
  //         sessionStorage.setItem("booking_ids", JSON.stringify(newIds));
  //       }
  //       // "booking_ids" if statement ends here
  //     };

  //     const arrayData = newData.filter((item) => item.itemStatus === UIState);
  //     getBookingIds(arrayData, user, miscFunc);
  //   }
  // }, [user, newData, UIState]);

  if (isLoading || isPaying) {
    console.log("Loading");
  }

  const checkoutPayment = () => {
    const details = {};
  };

  const generateTransactionRef = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        generateTransactionRef,
        setCarts,
        getCart,
        getCartIsLoading,
        setGetCartIsLoading,
        removeCartItem,
        newData,
        cartTotal,
        setCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
