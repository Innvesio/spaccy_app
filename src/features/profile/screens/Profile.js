import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import {
  MessageQuestion,
  Notification,
  Save2,
  UserEdit,
} from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import { ProfilePicture } from "../../../components";
import { AuthContext } from "../../../context/AuthContext";

const Profile = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, []);

  const getAccountType = () => {
    switch (user.data.accountType) {
      case "venueOwner":
        return "Venue Owner";
        break;
      case "vendor":
        return "Vendor";
        break;
      case "eventEnthusiast":
        return "Event Enthusiast";
        break;

      default:
        break;
    }
  };
  const userProfileSettings = [
    {
      icon: (
        <UserEdit size="26" color={appColors.primaryColor} variant="Bold" />
      ),
      title: "My account",
      route: "EditProfile",
      description: "Manage your account to meet your standard.",
    },
    {
      icon: (
        <Notification size="26" color={appColors.primaryColor} variant="Bold" />
      ),
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
      icon: (
        <MessageQuestion
          size="26"
          color={appColors.primaryColor}
          variant="Bold"
        />
      ),
      title: "Help and support",
      route: "",
      description: "Get answers to questions you may have.",
    },
  ];
  return (
    <View className="flex-1 p-[24] bg-white">
      {/* Profile Image */}
      <View className="w-full flex items-center mt-7">
        <View className="w-40 h-40">
          <ProfilePicture
            image={user?.data.profilePhoto[0]?.url}
            firstLetter={user?.data.firstName[0]}
          />
        </View>
        <Text className="font-semibold text-xl mt-2">
          {user?.data.firstName + " " + user?.data.lastName}
        </Text>
        <Text className="font-medium text-gray-500 text-xs mt-1">
          {getAccountType()}
        </Text>
      </View>
      {/* End Profile Image */}
      <View className="bg-white  border-gray-200  rounded-xl space-y-3 relative w-full mt-8">
        {userProfileSettings.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(item.route);
              console.log(user);
            }}
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
