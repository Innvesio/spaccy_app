import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../../context/CartContext";
import { formatNumber } from "../../../utils/funcs/helpers";
import { Primarybutton } from "../../../components";

const Cart = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { getCart, carts, getCartIsLoading } = useContext(CartContext);
  useEffect(() => {
    getCart();
  }, []);
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
        <View className="px-3">
          {carts.map((item, index) => (
            <View key={index} className="w-full space-x-4  py-3  flex-row ">
              <View className="rounded-xl w-[100px] overflow-hidden h-[100px] bg-slate-500">
                <Image
                  source={{ uri: item.coverPhoto }}
                  className="w-full h-full"
                />
              </View>
              <View className="justify-between items-start">
                <View className="items-start">
                  <Text className="font-semibold text-base capitalize">
                    {item.itemName}
                  </Text>
                  <View className="py-[2px] rounded-full px-4 bg-[#A0C6AB]">
                    <Text className="font-normal  text-sm  ">
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
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="p-4">
        <View className="space-y-3">
          <View>
            <Text className="font-semibold text-stone-600">Discount:</Text>
            <Text className="font-bold text-base text-stone-700">40%</Text>
          </View>
        </View>
        <View className="py-6  flex-row justify-between items-center ">
          <Text className="font-semibold text-stone-600">Total:</Text>
          <Text className="font-bold text-lg text-stone-700">N300,000</Text>
        </View>
        <Primarybutton title="Checkout" />
      </View>
    </View>
  );
};

export default Cart;
