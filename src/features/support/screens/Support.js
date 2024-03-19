import { View, Text, Pressable, Linking, Image } from "react-native";
import React from "react";
import { BackButton } from "../../../components";
import { Call, Facebook, Instagram, Sms } from "iconsax-react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

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
      icon: <Call color="#504B44" />,
    },
  ];

  const socials = [
    {
      name: "Spaccy",
      title: "twitter",
      icon: (
        <View className="w-5 h-5 p-[0.7px]">
          <Image
            className="w-full h-full"
            source={require("../../../../assets/x.png")}
          />
        </View>
      ),
      link: "spaccyofficial",
    },
    {
      name: "Spaccy",
      title: "facebook",
      icon: <Facebook color="#504B44" />,
      link: "spaccyofficial",
    },
    {
      name: "Spaccy",
      title: "instagram",
      icon: <Instagram color="#504B44" />,
      link: "spaccyofficial",
    },
  ];
  return (
    <View className="flex-1 bg-white p-[10px]">
      <View className="items-center justify-center pt-5">
        <Text className="text-xl font-semibold">Spaccy Support</Text>
        <Text className="text-base font-medium text-stone-400">
          Having any issue or complains?
        </Text>
      </View>
      <View className="space-y-4 mt-6">
        <Text className="font-semibold text-lg">Contacts</Text>
        {data.map((item, index) => (
          <Pressable
            onPress={() =>
              item.title === "email"
                ? Linking.openURL("mailto:support@example.com")
                : Linking.openURL("tel:090930394")
            }
            key={index}
            className="flex-row justify-start items-center space-x-2"
          >
            <View className="p-3 rounded-full w-12 h-12 justify-center items-center bg-stone-200">
              {item.icon}
            </View>
            <Text className="font-semibold text-base">{item.name}</Text>
          </Pressable>
        ))}
      </View>
      <View className="space-y-4 mt-9">
        <Text className="font-semibold text-lg">Socials</Text>
        {socials.map((item, index) => (
          <Pressable
            onPress={() =>
              Linking.openURL(`https://www.${item.title}.com/${item.link}`)
            }
            key={index}
            className="flex-row justify-start items-center  space-x-2"
          >
            <View className="p-3 rounded-full w-12 h-12 justify-center items-center bg-stone-200">
              {item.icon}
            </View>
            <Text className="font-semibold text-base">{item.name}</Text>
          </Pressable>
        ))}
      </View>
      {/* <Text>Support</Text> */}
    </View>
  );
};

export default Support;
