import { View, Text, Image, Pressable } from "react-native";
import React from "react";

const VendorPreview = ({ name, service, image, navigation, details }) => {
  const detail = {
    businessInfo: [details],
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("VendorFullDetailsScreen", detail)}
      className="rounded-xl w-auto border border-gray-200 p-3 flex flex-row items-center space-x-4"
    >
      <View className="w-[60px] overflow-hidden justify-center  items-center h-[60px] object-cover rounded-full bg-[#A0C6AB]">
        {image[0]?.url ? (
          <Image className="w-full h-full" source={{ uri: image[0]?.url }} />
        ) : (
          <Text className="font-semibold text-2xl">S</Text>
        )}
      </View>
      <View className="overflow-hidden">
        <Text
          numberOfLines={1}
          lineBreakMode="clip"
          className="font-bold w-[130px] text-[16px]"
        >
          {name}
        </Text>
        <Text className="text-gray-400 text-sm">{service}</Text>
      </View>
      <View className="flex-1 flex justify-center items-end h-full">
        <View className="rounded-full px-3 py-2 bg-[#A0C6AB]/40">
          <Text className="m-auto text-xs font-medium">Service</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VendorPreview;
