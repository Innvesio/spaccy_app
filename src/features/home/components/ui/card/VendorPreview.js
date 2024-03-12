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
      <View className="w-[60px] justify-center  items-center h-[60px] object-cover rounded-full bg-[#A0C6AB]">
        {image ? (
          <Image source={{ uri: image }} />
        ) : (
          <Text className="font-semibold text-2xl">S</Text>
        )}
      </View>
      <View>
        <Text className="font-bold text-[16px]">{name}</Text>
        <Text className="text-gray-400 text-sm">{service}</Text>
      </View>
      <View className="flex-1 flex justify-center   items-end h-full">
        <View className="rounded-full px-3 py-2 bg-[#A0C6AB]/40">
          <Text className="m-auto font-medium">Service</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VendorPreview;
