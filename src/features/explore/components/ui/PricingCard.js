import { View, Text } from "react-native";
import React from "react";
import { ArrowRight } from "iconsax-react-native";
import { appColors } from "../../../../constants/colors";

const PricingCard = ({ details }) => {
  return (
    <View className="mt-5 space-y-3">
      <Text className="font-bold text-lg truncate mt-5">PRICE </Text>
      <View className="rounded-xl bg-stone-100 p-7">
        <View className="w-full flex-row items-center justify-between">
          <Text>{details.pricing.for}</Text>
          <ArrowRight color={appColors.primaryColor} />
          <Text className="font-semibold">
            Starting from {details.pricing.fee}
          </Text>
        </View>
        {Object.keys(details.pricing.days).map((key) => (
          <View
            key={Math.floor(Math.random() * 20000000)}
            className="py-3 flex-row justify-between items-center border-b border-stone-300"
          >
            <Text className="font-medium capitalize">{key}</Text>
            <View className="flex-row space-x-2 font-medium">
              <Text className="font-medium">
                {details.pricing.days[key].start}
              </Text>
              <Text className="font-medium">-</Text>
              <Text className="font-medium">
                {details.pricing.days[key].end}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PricingCard;
