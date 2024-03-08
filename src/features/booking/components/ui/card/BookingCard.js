import { View, Text, Touchable, TouchableNativeFeedback } from "react-native";
import React from "react";

const BookingCard = ({
  status,
  eventDate,
  eventStartTime,
  eventEndTime,
  eventType,
  numberOfGuests,
  eventTitle,
}) => {
  return (
    <View>
      <View className="w-full p-4 bg-white rounded-lg border border-gray-200">
        <View
          className={`w-[100px] px-3 py-2 ${
            status === "confirmed"
              ? "bg-[#E9EEEC]"
              : status === "pending"
              ? "bg-[#FCF5F1]"
              : "bg-[#F3EAEA]"
          } rounded-full justify-center items-center  inline-flex`}
        >
          <Text
            className={`${
              status === "confirmed"
                ? "text-teal-00"
                : status === "pending"
                ? "text-[#DB743D]"
                : "text-[#892B30]"
            } text-[13px] font-bold leading-normal capitalize m-auto`}
          >
            {status}
          </Text>
        </View>
        {/*  */}
        <View className="mt-7 space-y-4">
          <View className="w-full text-left space-y-2">
            <Text className="max-w-[428px] w-full text-stone-900 text-sm font-bold leading-normal capitalize cursor-pointer">
              {eventTitle}
            </Text>
            <Text className="text-sm text-stone-600">
              Booking date: {eventDate}, {eventStartTime} - {eventEndTime}
            </Text>
          </View>

          <View className="text-xs flex flex-row space-x-3 mt-2">
            <View className="p-2 bg-gray-200 text-stone-600 font-semibold rounded-full px-3 capitalize">
              <Text>{eventType}</Text>
            </View>
            <View className="p-2 bg-gray-200 text-stone-600 font-semibold rounded-full px-3">
              <Text>{numberOfGuests} guests</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingCard;
