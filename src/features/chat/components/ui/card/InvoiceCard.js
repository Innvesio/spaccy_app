import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { formatNumber } from "../../../../../utils/funcs/helpers.js";
import { ChatContext } from "../../../../../context/ChatContext.jsx";
import moment from "moment";

const InvoiceCard = ({ details }) => {
  const { currentConversation } = useContext(ChatContext);
  return (
    <View className="max-w-[70%] w-full p-3">
      <View className="-full space-y-4 p-4 bg-white border rounded-lg border-black text-left">
        {details.invoiceDetails.yourServices.length >= 1 && (
          <View className="w-full bg-stone-200 overflow-hidden rounded-lg">
            <Text className="font-semibold bg-stone-300 p-1 px-2">
              Services
            </Text>
            <View className="p-2">
              {details.invoiceDetails.yourServices?.map((service, index) => (
                <View
                  key={index}
                  className="w-full  flex-row justify-between p-1"
                >
                  <Text className="text-[#504B44] text-[13px] font-xs">
                    {service.name} ({service.plan})
                  </Text>

                  <Text className="text-[#504B44] font-semibold text-[14px]">
                    {service.price
                      ? formatNumber(service.price)
                      : "Price not stated"}

                    {/* N100,000 */}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {/*  */}
        {details.invoiceDetails.additionalCost >= 1 && (
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-[#504B44] text-[14px] font-semibold">
              Additional Cost
            </Text>
            <View className="w-4 h-[1px] rounded-full bg-[#22201D]"></View>
            <Text className="font-semibold">
              {formatNumber(details.invoiceDetails.additionalCost)}
            </Text>
          </View>
        )}
        <View className="w-full justify-between flex-row items-center">
          <Text className="text-[#504B44] text-[14px] font-semibold">
            Final Cost
          </Text>
          <View className="w-4 h-[1px] rounded-full bg-[#22201D]"></View>
          <Text className="text-[#504B44] text-[14px] font-semibold">
            {formatNumber(details.invoiceDetails?.cost)}
          </Text>
        </View>
        <Text className="text-sm font-normal truncate text-[#504B44]">
          {details.invoiceDetails?.comment}
        </Text>
        {/* Clip Card */}
        <View
          style={{ gap: 10 }}
          className="flex-row justify-start items-start flex-wrap"
        >
          <View className="px-2 py-1.5  rounded-full bg-gray-200">
            <Text className="text-xs font-medium">
              {currentConversation.bookingDetails?.eventType}
            </Text>
          </View>
          <View className="px-2 py-1.5 rounded-full bg-gray-200">
            <Text className="text-xs font-medium">
              {`${currentConversation.bookingDetails?.numberOfGuests} guests`}
            </Text>
          </View>
        </View>
        {/*  */}
        <View
          style={{ gap: 10 }}
          className="pt-3 flex-wrap  border-t border-gray-200"
        >
          <Pressable className=" w-full px-6 py-3 bg-[#F3EAEA] rounded justify-center items-center disabled:bg-opacity-85">
            <Text className="text-center text-[#7D272C] text-xs font-semibold ">
              Decline
            </Text>
          </Pressable>
          <Pressable className="px-6 py-3 w-full bg-stone-700 rounded justify-center items-center disabled:bg-opacity-85">
            <Text className="text-center text-white truncate text-xs font-semibold ">
              Proceed to Checkout
            </Text>
          </Pressable>
        </View>
      </View>
      <Text className="text-xs mt-2">
        {moment(details.createdAt).format("hh:mm A")}
      </Text>
    </View>
  );
};

export default InvoiceCard;
