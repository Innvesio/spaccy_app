import { View, Text, Image } from "react-native";
import React from "react";

const VendorPreview = ({ name, service, image, navigation }) => {
  return (
    <View className="rounded-xl w-auto border border-gray-200 p-3 flex flex-row items-center space-x-4">
      <View className="w-[60px] h-[60px] object-cover rounded-full bg-slate-400">
        <Image
          className="w-full h-full rounded-full object-cover"
          source={image}
        />
      </View>
      <View>
        <Text className="font-bold text-[16px]">{name}</Text>
        <Text className="text-gray-400 text-sm">{service}</Text>
      </View>
      <View className="flex-1 flex justify-center items-center h-full">
        <View className="rounded-full px-3 py-2 bg-slate-200">
          <Text className="m-auto font-medium">Service</Text>
        </View>
      </View>
    </View>
  );
};

export default VendorPreview;
