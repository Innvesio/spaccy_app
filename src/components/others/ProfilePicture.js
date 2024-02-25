import { View, Text } from "react-native";
import React from "react";

const ProfilePicture = ({ image, firstLetter }) => {
  return (
    <View className="flex-1 h-full w-full max-h-40 max-w-40 bg-white rounded-full mx-auto flex p-[2px] border border-[#C3B091] items-center justify-center">
      <View className="w-full h-full bg-[#A0C6AB] flex justify-center items-center rounded-full">
        <Text className="text-5xl font-bold  mt-4  text-stone-900">
          {firstLetter}
        </Text>
      </View>
    </View>
  );
};

export default ProfilePicture;
