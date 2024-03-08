import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Location } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import PricingCard from "../components/ui/PricingCard";
import { BackButton, Primarybutton } from "../../../components";
import EnquireBottomSheet from "../components/modal/EnquireBottomSheet";
import { BookingContext } from "../../../context/BookingContext";
import VendorPricingCard from "../components/ui/cards/VendorPricingCard";
import { SpaceContext } from "../../../context/SpaceContext";

// import { Standing } from "../../../../assets/shapes/shapes.js";

const VendorFullDetails = ({ route, navigation }) => {
  const { enquireNow } = useContext(BookingContext);
  const { searchValue } = useContext(SpaceContext);
  const details = route.params;
  // ref
  const bottomSheetRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const businessInfo = details.businessInfo[0];
  const vendorProfile = details.vendorProfile[0];
  const { fullDay, hourly, perHead, perItem, other } = businessInfo.paymentPlan;

  navigation.setOptions({
    title:
      details.vendorProfile[0].businessName +
      " — " +
      details.businessInfo[0].businessName,

    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / screenWidth;
    setActiveIndex(index);
  };

  const screenWidth = Dimensions.get("window").width;
  const renderDotIndicator = () => {
    return details.businessInfo[0].images.map((dot, index) => {
      return (
        <View
          key={index}
          className={`w-2 h-2 mx-1 transition-all rounded-full ${
            activeIndex === index ? "bg-white" : "bg-gray-300"
          }`}
        ></View>
      );
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View className="overflow-hidden">
        <Image
          source={{ uri: item.url }}
          style={{ height: 250, width: screenWidth, objectFit: "cover" }}
        />
        <LinearGradient
          colors={["#00000000", "#000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 3 }}
          className="overflow-hidden absolute bg-slate-600 rounded-b-2xl h-full w-full"
        ></LinearGradient>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white ">
      <ScrollView
        // className="opacity-1"
        showsVerticalScrollIndicator={false}
      >
        <View className=" relative items-center">
          <FlatList
            className="rounded-b-2xl"
            showsHorizontalScrollIndicator={false}
            data={details.businessInfo[0].images}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            renderItem={renderItem}
            onScroll={handleScroll}
          />
          <View className="flex-row py-3 bottom-0 absolute justify-center">
            {renderDotIndicator()}
          </View>
        </View>
        <View className="px-3 pt-6 ">
          <View className="flex-row space-x-2">
            <Location color={appColors.primaryColor} />
            <Text className="font-semibold text-base truncate">
              {vendorProfile.vendorLocation.city +
                " " +
                vendorProfile.vendorLocation.state}
            </Text>
          </View>
          <View className="items-start justify-center mt-10">
            <View className="p-2 rounded-lg bg-gray-200">
              <Text className="font-semibold text-sm capitalize  truncate">
                {vendorProfile.serviceCategory}
              </Text>
            </View>
          </View>
          <View className="mt-5 space-y-3">
            <Text className="font-bold text-lg truncate">
              ABOUT THE SERVICE
            </Text>
            <Text className="font-medium">
              {businessInfo.serviceDescription}
            </Text>
          </View>
          <VendorPricingCard details={businessInfo} />
          {/*  */}
          <View className="py-6 space-y-4">
            <View className="flex-row space-x-5">
              <Text className="font-semibold truncate ">Price per hour</Text>
              <Text className="font-bold  truncate ">
                Starting from N{hourly.price}
              </Text>
            </View>
            <View className="flex-row space-x-5">
              <Text className="font-semibold truncate ">Price per day</Text>
              <Text className="font-bold  truncate ">
                Starting from N{fullDay.price}
              </Text>
            </View>
            <View className="flex-row space-x-5">
              <Text className="font-semibold truncate ">Price per item</Text>
              <Text className="font-bold  truncate ">
                Starting from N{perItem.price}
              </Text>
            </View>
            <View className="flex-row space-x-5">
              <Text className="font-semibold truncate ">Price per head</Text>
              <Text className="font-bold  truncate ">
                Starting from N{perHead.price}
              </Text>
            </View>
          </View>
          {/*  */}
        </View>
      </ScrollView>
      <EnquireBottomSheet
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <View>
        <View className="px-3 pb-8 pt-3 relative bg-white">
          <Primarybutton
            onPress={() =>
              navigation.navigate("EnquireVendor", details.businessInfo[0])
            }
            title="Enquire now"
          />
        </View>
      </View>
    </View>
  );
};

export default VendorFullDetails;
