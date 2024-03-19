import {
  View,
  Text,
  TextInput,
  image,
  ScrollView,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import { SpaceContext } from "../../../context/SpaceContext";
import SpacePreviewCard from "../components/ui/card/SpacePreviewCard";

const Home = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const { getAllSpaces, allSpaces, allVendors, fetchAllVendors } =
    useContext(SpaceContext);
  useEffect(() => {
    getAllSpaces();
    fetchAllVendors();
  }, []);

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

  const refresh = () => {
    getAllSpaces();
  };

  return (
    <View className=" bg-white flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refresh} />
        }
        showsVerticalScrollIndicator={false}
        className="pt-[24px]"
      >
        <View className="px-[10px]">
          <InputWithIcon
            icon={<SearchNormal color={appColors.primaryColor} />}
            placeholder="Search for space"
          />
        </View>
        <View className="mt-5 ">
          {/* Card */}

          {/*End of Card */}
          <View className="w-full mt-10 space-y-2">
            <View className="px-[10px]">
              <Text className="font-bold">Vendors</Text>
            </View>
            <View className=" h-[100px]  py-1 ">
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                className="pl-3"
                data={allVendors}
                renderItem={(item) => (
                  <View
                    style={{ width: screenWidth / 1.3 }}
                    className="w-[400px] mr-4"
                    key={item.index}
                  >
                    <VendorPreview
                      navigation={navigation}
                      image={item.item?.images}
                      name={item.item.businessName}
                      service="Service"
                      details={item.item}
                    />
                  </View>
                )}
              />
            </View>
          </View>
        </View>
        <View className="mt-10">
          <View className="px-[10px] mb-5">
            <Text className="font-bold">Spaces</Text>
          </View>
          <View className="space-y-10">
            {allSpaces.map((item, index) => (
              <View key={index}>
                <SpacePreviewCard navigation={navigation} details={item} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
