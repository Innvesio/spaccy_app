import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Star1 } from "iconsax-react-native";
import { formatNumber } from "../../../../../utils/funcs/helpers";

const SpacePreviewCard = ({ details, navigation }) => {
  const data = {
    details: details._doc,
    venue: details.venue,
    reviews: details.reviews,
  };
  return (
    <Pressable
      onPress={() => navigation.navigate("FullDetails", data)}
      className="px-[10px]"
    >
      <View className="w-full bg-slate-400 relative h-[240px] overflow-hidden  rounded-xl ">
        <Image
          className="w-full absolute h-full"
          source={{ uri: details._doc.images[0].url }}
        />
        <View className="w-full p-4 items-start">
          <View className=" px-5 rounded-full bg-white/80 h-8">
            <Text className="m-auto font-medium">
              {details?.venue?.venueLocation?.state}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-between mt-4">
        <Text className="font-semibold">{details._doc.spaceName}</Text>
        <View className="flex flex-row justify-center items-center space-x-1">
          <Star1 size={20} variant="Bold" color="gold" />
          <Text>{details.reviews.length}.0</Text>
        </View>
      </View>
      <View>
        <Text className="font-medium text-xs text-stone-400">
          {details._doc.spaceType}
        </Text>
        <View className="flex-row items-center mt-2 space-x-1 ">
          <Text className="font-bold text-base">
            N{formatNumber(details._doc.pricing.fee)}
          </Text>
          <Text className=" text-stone-500 font-medium underline">
            {details._doc.pricing.for}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SpacePreviewCard;
