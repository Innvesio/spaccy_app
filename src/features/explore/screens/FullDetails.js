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

// import { Standing } from "../../../../assets/shapes/shapes.js";

const FullDetails = ({ route, navigation }) => {
  const { enquireNow } = useContext(BookingContext);
  const details = route.params;
  // ref
  const bottomSheetRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  navigation.setOptions({
    title: details.spaceName + " — " + details.venueInfo.venueName,
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  // / callbacks
  const handleSheetChanges = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
    setModalIsOpen(true);
  }, []);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / screenWidth;
    setActiveIndex(index);
  };

  const screenWidth = Dimensions.get("window").width;
  const renderDotIndicator = () => {
    return details.images.map((dot, index) => {
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
        showsHorizontalScrollIndicator={false}
      >
        <View className=" relative items-center">
          <FlatList
            className="rounded-b-2xl"
            showsHorizontalScrollIndicator={false}
            data={details.images}
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
              {details?.venueInfo.venueLocation.nearestLandmark +
                " , " +
                details?.venueInfo.venueLocation.city +
                " " +
                details?.venueInfo.venueLocation.state}
            </Text>
          </View>
          <Text className="font-medium text-base mt-7 truncate">18+</Text>
          <View className="mt-5 space-y-3">
            <Text className="font-bold text-lg truncate">ABOUT THE SPACE</Text>
            <Text className="font-medium">{details?.spaceDescription}</Text>
          </View>
          {/* Pricing */}
          <PricingCard details={details} />
          {/*  */}
          <View>
            <Text className="font-bold text-lg truncate mt-5">CAPACITY</Text>
            <View>
              {/* <View>
                <Standing width={20} height={20} />
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <EnquireBottomSheet
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <View>
        <View className="px-3 py-8 bg-white">
          <Primarybutton onPress={() => enquireNow()} title="Enquire now" />
        </View>
      </View>
    </View>
  );
};

export default FullDetails;
