import { View, Text, TextInput, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  Message,
  Notification,
  SearchNormal,
  Star,
  Star1,
} from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import VendorPreview from "../components/ui/card/VendorPreview";
import { InputWithIcon } from "../../../components";

const Home = ({ navigation }) => {
  const [vendors, setVendors] = useState([
    {
      name: "Ella Malie",
      service: "Event Planner",
      image: require("../../../../assets/persons/image3.jpeg"),
    },

    {
      name: "Osen Waine",
      service: "DJ",
      image: require("../../../../assets/persons/image2.jpeg"),
    },
    {
      name: "Victor oden",
      service: "Lover Boy",
      image: require("../../../../assets/persons/image.jpeg"),
    },
  ]);
  navigation.setOptions({
    headerTitleAlign: "center",
    headerRight: () => (
      <View className="flex flex-row px-[18px] space-x-6">
        <View className="relative">
          <View
            style={{ zIndex: 900 }}
            className="w-2 h-2 right-1 bg-red-500 absolute rounded-full"
          ></View>
          <Notification
            onPress={() => navigation.navigate("Notifications")}
            color={appColors.primaryColor}
          />
        </View>
        <View className="relative">
          <View
            style={{ zIndex: 900 }}
            className="w-2 h-2 -right-[1px] bg-red-500 absolute rounded-full"
          ></View>

          <Message
            onPress={() => navigation.navigate("Messages")}
            color={appColors.primaryColor}
          />
        </View>
      </View>
    ),
  });

  return (
    <View className="py-[24px] bg-white flex-1">
      <View className="px-[24px]">
        {/* Search Bar */}
        <InputWithIcon
          icon={<SearchNormal color={appColors.primaryColor} />}
          placeholder="Search for space"
        />
        {/*End of Search Bar */}
      </View>
      <View className="mt-5 ">
        {/* Card */}
        <View className="px-[24px]">
          <View className="w-full bg-slate-400 relative h-[240px] overflow-hidden  rounded-xl ">
            <Image
              className="w-full absolute h-full"
              source={require("../../../../assets/R.jpeg")}
            />
            <View className="w-full p-4">
              <View className="w-28 rounded-full bg-white h-8">
                <Text className="m-auto font-medium">Nearby</Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row justify-between mt-4">
            <Text className="font-semibold">Declust bunny</Text>
            <View className="flex flex-row justify-center items-center space-x-1">
              <Star1 size={20} variant="Bold" color="gold" />
              <Text>5.0</Text>
            </View>
          </View>
        </View>
        {/*End of Card */}
        <View className="w-full mt-10 space-y-2">
          <View className="px-[24px]">
            <Text className="font-bold">Vendors</Text>
          </View>
          <View className=" h-[100px]  py-1">
            <ScrollView
              showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
              showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
              horizontal
              className="space-x-4 px-[24px]"
            >
              {vendors.map((item, index) => (
                <View>
                  <VendorPreview
                    image={item.image}
                    name={item.name}
                    service={item.service}
                    key={index}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;
