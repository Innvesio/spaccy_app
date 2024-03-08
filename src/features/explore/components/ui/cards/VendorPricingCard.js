import { View, Text } from "react-native";
import React from "react";
import { ArrowRight } from "iconsax-react-native";
import { appColors } from "../../../../../constants/colors";

const VendorPricingCard = ({ details }) => {
  const { fullDay, hourly, perHead, perItem, other } = details.paymentPlan;
  // console.log(details);
  return (
    <View className="mt-5 space-y-3">
      <Text className="font-bold text-lg truncate mt-5">PRICES</Text>
      <View className="rounded-xl bg-stone-100 p-7">
        <View className="w-full flex-row items-center justify-between">
          <Text>Payment plan</Text>
          <ArrowRight color={appColors.primaryColor} />
          <Text className="font-semibold">
            Starting from{" "}
            {fullDay.price ||
              hourly.price ||
              other.price ||
              perHead.price ||
              perItem.price}
          </Text>
        </View>
        {Object.keys(details.opening).map((key) => (
          <View
            key={Math.floor(Math.random() * 20000000)}
            className="py-3 flex-row justify-between items-center border-b border-stone-300"
          >
            <Text className="font-medium capitalize">{key}</Text>
            {details.opening[key].start ? (
              <View className="flex-row space-x-2 font-medium">
                <Text className="font-semibold">
                  {details.opening[key].start}
                </Text>
                <Text className="font-semibold">-</Text>
                <Text className="font-semibold">
                  {details.opening[key].end}
                </Text>
              </View>
            ) : (
              <Text className="font-semibold">Closed</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default VendorPricingCard;
