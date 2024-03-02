import { View, Text, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfilePicture = ({ image }) => {
  const { user } = useContext(AuthContext);

  return (
    <View className="flex-1 h-full w-full max-h-40 max-w-40 bg-white rounded-full mx-auto flex p-[2px] border border-[#C3B091] items-center justify-center">
      <View className="w-full h-full bg-[#A0C6AB] overflow-hidden flex justify-center items-center rounded-full">
        {image ? (
          <Image
            className="w-full h-full"
            source={{ uri: image || user?.data.profilePhoto[0].url }}
            alt="image"
          />
        ) : (
          <Text className="text-5xl font-bold capitalize mt-4  text-stone-900">
            {user?.data.firstName[0]}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProfilePicture;
