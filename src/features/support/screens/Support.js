import { View, Text } from "react-native";
import React from "react";
import { BackButton } from "../../../components";
import { Sms } from "iconsax-react-native";

const Support = ({ navigation }) => {
  navigation.setOptions({
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  const data = [
    {
      name: "Spaccy@gmail.com",
      title: "email",
      icon: <Sms color="#504B44" />,
    },
    {
      name: "+2349055428342",
      title: "phone",
      icon: <Sms color="#504B44" />,
    },
  ];

  const socials = [
    {
      name: "Spaccy",
      title: "twitter",
      icon: <Sms color="#504B44" />,
    },
    {
      name: "Spaccy",
      title: "facebook",
      icon: <Sms color="#504B44" />,
    },
    {
      name: "Spaccy",
      title: "instagram",
      icon: <Sms color="#504B44" />,
    },
  ];
  return (
    <View className="flex-1 bg-white p-[10px]">
      <View className="items-center justify-center pt-5">
        <Text className="text-xl font-semibold">Spaccy Support</Text>
        <Text className="text-base font-medium text-stone-400">
          Having any issue or complain?
        </Text>
      </View>
      <View className="space-y-4 mt-6">
        <Text className="font-semibold text-lg">Contacts</Text>
        {data.map((item, index) => (
          <View className="flex-row justify-start items-center space-x-2">
            <View className="p-3 rounded-full bg-stone-200">{item.icon}</View>
            <Text className="font-semibold text-base">{item.name}</Text>
          </View>
        ))}
      </View>
      <View className="space-y-4 mt-9">
        <Text className="font-semibold text-lg">Socials</Text>
        {socials.map((item, index) => (
          <View className="flex-row justify-start items-center space-x-2">
            <View className="p-3 rounded-full bg-stone-200">{item.icon}</View>
            <Text className="font-semibold text-base">{item.name}</Text>
          </View>
        ))}
      </View>
      {/* <Text>Support</Text> */}
    </View>
  );
};

export default Support;
