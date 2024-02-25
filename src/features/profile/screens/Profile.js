import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  MessageQuestion,
  Notification,
  ProfileCircle,
  Save2,
  UserEdit,
} from "iconsax-react-native";
import {appColors} from "../../../constants/colors"

const Profile = ({navigation}) => {
  const userProfileSettings = [
    {
      icon: <UserEdit size="26" color={appColors.primaryColor} variant="Bold" />,
      title: "My account",
      route: "EditProfile",
      description: "Manage your account to meet your standard.",
    },
    {
      icon: <Notification size="26" color={appColors.primaryColor} variant="Bold" />,
      title: "Notifications",
      route: `/notifications`,
      description: "Important information that we wouldn't want you to miss.",
    },
    {
      icon: <Save2 size="26" color={appColors.primaryColor} variant="Bold" />,
      title: "Saved spaces",
      route: `/profile/saved/spaces`,
      description: "A complete list of all the spaces you have saved.",
    },
    {
      icon: <MessageQuestion size="26" color={appColors.primaryColor} variant="Bold" />,
      title: "Help and support",
      route: "",
      description: "Get answers to questions you may have.",
    },
  ];
  return (
    <View className="flex-1 p-[24] bg-white">
      {/* Profile Image */}
      <View className="w-full flex items-center mt-7">
        <View className="w-40 h-40 bg-white rounded-full mx-auto flex p-[2px] border-2 border-[#C3B091] items-center justify-center">
          <View className="w-full h-full bg-[#A0C6AB] flex justify-center items-center rounded-full">
            <Text className="text-5xl font-bold  mt-4  text-stone-900">S</Text>
          </View>
        </View>
        <Text className="font-semibold text-xl mt-2">Shedrack Aigbe</Text>
        <Text className="font-medium text-gray-500 text-xs mt-1">
          Event Enthusiast
        </Text>
      </View>
      {/* End Profile Image */}
      <View className="bg-white  border-gray-200  rounded-xl space-y-3 relative w-full mt-8">
        {userProfileSettings.map((item, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.route)}
            key={index}
            className="h-20 w-full border rounded-md flex space-x-4 flex-row items-center px-5  border-gray-200"
          >
            <View className="bg">{item.icon}</View>
            <View className="text-gray-500  flex-1">
              <Text className="font-semibold text-base">{item.title}</Text>
              <Text className="font-medium  text-gray-400 text-xs">
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Profile;
