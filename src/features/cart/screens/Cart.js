import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../../context/CartContext";
import { formatNumber } from "../../../utils/funcs/helpers";
import { Primarybutton } from "../../../components";
import { Trash } from "iconsax-react-native";
import { PayWithFlutterwave } from "flutterwave-react-native";
import axios from "axios";
import env from "../../../constants/env";
import * as Notifications from "expo-notifications";

const Cart = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [paymentData, setPaymentData] = useState({});
  const [fee, setFee] = useState(0);
  const {
    getCart,
    carts,
    getCartIsLoading,
    generateTransactionRef,
    removeCartItem,
    newData,
    cartTotal,
    setCartTotal,
  } = useContext(CartContext);
  useEffect(() => {
    getCart();
  }, []);

  const initializePayment = (func) => {
    const data = {
      amount: cartTotal,
      currency: "NGN",
      items: [],
    };

    newData.forEach((item) => {
      const { itemId, itemType, finalizedPrice } = item;

      const theItem = {
        id: itemId,
        type: itemType,
        fee: finalizedPrice,
      };
      data.items.push(theItem);
    });
    console.log("Items", data.items);

    axios
      .post(`${env.API_URL}/payment/initialize/mobile`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setPaymentData(res.data.data);
        setTimeout(() => {
          console.log("SUb!!", res.data.data.subaccounts);
        }, 2000);
        func();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  const serviceCharge = () => {
    if (newData) {
      let newTotal = 0;
      for (let i = 0; i < newData.length; i++) {
        const { finalizedPrice } = newData[i];

        newTotal += finalizedPrice;
      }

      if (typeof fee !== undefined && typeof setFee === "function") {
        let serviceFee = (7.5 / 100) * newTotal;
        setFee(serviceFee);
      }
      setCartTotal(newTotal + fee);
    }
  };

  useEffect(() => {
    const totalPrice = newData.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.finalizedPrice;
    }, 0);
    setCartTotal(totalPrice);
    serviceCharge();
  }, [newData]);
  /* An example function called when transaction is completed successfully or canceled */
  const handleOnRedirect = (data) => {
    console.log(data);
    // // console.log(transaction_id, tx_ref);
    axios
      .get(
        `${env.API_URL}/payment/verify/${data.transaction_id}?tx_ref=${data.tx_ref}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log("Verify", res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <View className="flex-1  bg-white">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getCartIsLoading}
            onRefresh={() => getCart()}
          />
        }
        className="pt-3"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-3 space-y-3">
          {newData.map((item, index) => (
            <View
              key={index}
              className="w-full h-[125px] space-x-4  py-3  flex-row "
            >
              <View className="rounded-xl w-[100px] overflow-hidden h-[100px] bg-slate-500">
                <Image
                  source={{ uri: item.coverPhoto }}
                  className="w-full h-full"
                />
              </View>
              <View className="justify-between flex-1 items-start">
                <View className="items-start space-y-1">
                  <Text className="font-semibold text-base capitalize">
                    {item.itemName}
                  </Text>
                  <View className="py-[2px] rounded-full px-2 bg-[#A0C6AB]">
                    <Text className="font-normal text-xs text-white">
                      {item.itemType}
                    </Text>
                  </View>
                </View>
                <View className="items-start">
                  <Text className="font-bold text-lg">
                    N{formatNumber(item.finalizedPrice)}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => removeCartItem(item._id)}
                className="p-2 justify-center items-center rounded-tr-xl rounded-br-xl h-full bg-stone-700"
              >
                <Trash variant="Bold" color="#fff" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="p-4">
        <View className="space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className="font-semibold text-stone-600">Items:</Text>
            <Text className="font-bold text-base text-stone-700">
              {carts.length}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="font-semibold text-stone-600">
              Service charge (7.5%):
            </Text>
            <Text className="font-bold text-base text-stone-700">
              ₦{formatNumber(fee.toFixed(0))}
            </Text>
          </View>
        </View>
        <View className="py-6  flex-row justify-between items-center ">
          <Text className="font-semibold text-stone-600">Total:</Text>
          <Text className="font-bold text-lg text-stone-700">
            ₦{formatNumber(cartTotal)}
          </Text>
        </View>

        <PayWithFlutterwave
          onRedirect={handleOnRedirect}
          options={{
            tx_ref: generateTransactionRef(10),
            authorization: "FLWPUBK_TEST-5f7d9b38263cfc7d8e3004763547d89a-X",
            customer: {
              email: user.data.email,
              phonenumber: user.data.phonenumber,
              name: `${user.data.firstName} ${user.data.lastName}`,
            },
            customizations: {
              title: "Spaccy",
              logo: "https://res.cloudinary.com/doomrxmb0/image/upload/v1704494707/Static/spaccy_-_dark_kp2aho.webp",
            },
            meta: {
              bookingIds: paymentData?.meta?.bookingIds,
            },
            amount: 14000,
            currency: "NGN",
            payment_options: "card, ussd",
            subaccounts: paymentData?.subaccounts,
          }}
          customButton={(props) => (
            <View>
              <Pressable
                className={`${
                  props.disabled ? "bg-stone-400" : "bg-stone-700"
                }  w-full px-6 py-5 rounded flex-col justify-center items-center`}
                onPress={() => {
                  initializePayment(props.onPress);
                }}
                isBusy={props.isInitializing}
                disabled={props.disabled}
              >
                <Text className="text-white font-semibold">
                  Pay ₦{formatNumber(cartTotal)}
                </Text>
              </Pressable>
            </View>
          )}
        />
      </View>

      {/* Flutterwave Payment */}
    </View>
  );
};

export default Cart;
