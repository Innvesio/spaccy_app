import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Heart, Location } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import PricingCard from "../components/ui/PricingCard";
import { BackButton, Primarybutton } from "../../../components";
import EnquireBottomSheet from "../components/modal/EnquireBottomSheet";
import { BookingContext } from "../../../context/BookingContext";
import { SpaceContext } from "../../../context/SpaceContext";

// import { Standing } from "../../../../assets/shapes/shapes.js";

const FullDetails = ({ route, navigation }) => {
  const { enquireNow } = useContext(BookingContext);
  const { isSaved, setIsSaved, addToSaved } = useContext(SpaceContext);
  const { details, venue } = route.params;
  // ref
  const bottomSheetRef = useRef(null);

  const [showMore, setShowMore] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    console.log(details);
  }, []);

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

  const capacity = [
    {
      icon: "shapes.standing",
      label: "Standing",
      number: details.spaceFeatures.capacity.standing,
    },
    {
      icon: "shapes.dinning",
      label: "Dining",
      number: details.spaceFeatures.capacity.dining,
    },
    {
      icon: "shapes.theatre",
      label: "Theatre",
      number: details.spaceFeatures.capacity.theatre,
    },
    {
      icon: "shapes.broom",
      label: "Board room",
      number: details.spaceFeatures.capacity.boardRoom,
    },
    {
      icon: "shapes.croom",
      label: "Class room",
      number: details.spaceFeatures.capacity.classRoom,
    },
    {
      icon: "shapes.uShape",
      label: "U-Shaped",
      number: details.spaceFeatures.capacity.uShaped,
    },
  ];

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
            showsVerticalScrollIndicator={false}
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
          <View className="flex-row space-x-2 items-center">
            <Location color={appColors.primaryColor} />
            <Text className="font-semibold text-base truncate">
              {venue?.venueLocation?.nearestLandmark +
                " , " +
                venue?.venueLocation?.city +
                " " +
                venue?.venueLocation?.state}
            </Text>
            <View className="flex-1 items-end">
              <Pressable
                onPress={() => (isSaved ? "" : addToSaved(details))}
                className="p-2 rounded-full bg-stone-200"
              >
                <Heart
                  variant={isSaved ? "Bold" : "Outline"}
                  color={appColors.primaryColor}
                />
              </Pressable>
            </View>
          </View>

          {/*  */}
          <View className="text-sm flex flex-row items-center mt-10 space-x-2">
            {details.additionalInfo.keywords.map((data, index) => {
              return (
                <Text className="bg-stone-200 rounded-md p-1 px-2" key={index}>
                  {data}
                </Text>
              );
            })}

            {/* under 18 */}
            {!details?.venueInfo?.aboutVenue?.features.some((str) =>
              str.includes("Under 18")
            ) ? (
              <Text className="font-semibold">18+</Text>
            ) : (
              <Text className="line-through font-semibold text-stone-400">
                18+
              </Text>
            )}
          </View>
          <View className="mt-5 space-y-3">
            <Text className="font-bold text-lg truncate">ABOUT THE SPACE</Text>
            <Text className="font-medium">{details?.spaceDescription}</Text>
          </View>
          {/* Pricing */}
          <PricingCard details={details} />
          {/*  */}
          <View className="mt-10">
            <Text className="uppercase font-bold">CAPACITY</Text>
            <View className="mt-3">
              {capacity?.map((data, index) => {
                return (
                  <View key={index} className="flex-row  space-x-3">
                    <Text className="">{data.label}</Text>
                    <Text className="font-bold">up to {data.number}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          {/*  */}
          <View className="mt-10">
            <Text className="uppercase font-bold">Music setup</Text>
            <View className="flex flex-wrap">
              <Text>
                {details?.sTextaceFeatures?.equipments.musicSetup.type}
              </Text>
              {details?.spaceFeatures?.equipments.musicSetup.clientDJ ? (
                <Text>Clients can bring their DJ</Text>
              ) : (
                <Text className="">Clients are not allowed to</Text>
              )}
            </View>
          </View>
          {/*  */}
          <View className="lg:px-5 mt-10 w-full md:w-[70%]">
            <Text className="uppercase font-bold">Amenities</Text>
            <View style={{ gap: 10 }} className="mt-5 flex flex-row flex-wrap">
              {details?.spaceFeatures?.equipments?.availableAmenities.map(
                (data, index) => {
                  return (
                    <View className="border border-stone-500 justify-center items-center w-fit rounded-full bg-stone-200">
                      <Text className=" text-sm  px-2 py-1" key={index}>
                        {data}
                      </Text>
                    </View>
                  );
                }
              )}
            </View>
          </View>
          {/*  */}
          <View className="lg:px-5 mt-10 w-full md:w-[70%]">
            <Text className="uppercase font-bold">Available cooling</Text>
            <View style={{ gap: 10 }} className="mt-5 flex flex-row flex-wrap">
              {details?.spaceFeatures?.cooling?.systemType.map(
                (data, index) => {
                  return (
                    <View className="border border-stone-500 justify-center items-center w-fit rounded-full bg-stone-200">
                      <Text className=" text-sm  px-2 py-1" key={index}>
                        {data}
                      </Text>
                    </View>
                  );
                }
              )}
            </View>
          </View>
          {/*  */}
          <View className="bg-[#E9EEEC] p-3 space-y-2 rounded-lg mt-6 w-full">
            <View className="flex space-x-1">
              {/* <Ac /> */}
              <Text className="font-medium">
                Total number of AC: {details?.spaceFeatures?.cooling?.ACs}
              </Text>
            </View>
            <View className="flex items- space-x-1">
              {/* <Fan /> */}
              <Text className="font-medium">
                Total number of fans: {details?.spaceFeatures?.cooling?.fans}
              </Text>
            </View>
          </View>
          {/* accessibility */}
          <View className="lg:px-5 mt-10 w-full md:w-[70%]">
            <Text className="uppercase font-bold">Accessibility</Text>
            <View className="mt-3 text-left">
              {details?.spaceFeatures?.equipments?.accessibilityFeatures?.map(
                (data, index) => {
                  return (
                    <Text className=" text-sm " key={index}>
                      {/* <View className="h-1 w-2 rounded-full bg-stone-900 mr-1" /> */}
                      - {data}
                    </Text>
                  );
                }
              )}
            </View>
          </View>
          {/*  */}
          {/* regulations */}
          <View className="bg-stone-200 p-3 rounded-lg mt-6 w-full md:w-[70%]">
            <Text className="font-bold mb-2">Space rules</Text>
            <Text className="whitespace-break-spaces">
              {details.regulations}
            </Text>
          </View>
          {/* //////////// */}
          <View className="lg:px-5 mt-10 w-full md:w-[70%] overflow-hidden">
            <Text className="uppercase font-bold">More about this space</Text>
            <Text className="mt-5 font-bold">Catering:</Text>
            <View className="text-left mt-2">
              <Text className="font-semibold">Policy:</Text>
              {details?.additionalInfo?.catering.policy.map((data, index) => {
                return (
                  <Text className=" text-sm " key={index}>
                    - {data}
                  </Text>
                );
              })}
            </View>

            {showMore ? (
              <>
                <View className="mt-2">
                  <Text className="font-semibold">Fee:</Text>
                  <Text>
                    N{details?.additionalInfo?.catering?.fee.toLocaleString()}
                  </Text>
                </View>
                <Text className="mt-5 font-bold">Drinks:</Text>
                <View className="text-left mt-2">
                  <Text className="font-semibold">Policy:</Text>
                  {details?.additionalInfo?.drinks?.policy.map(
                    (data, index) => {
                      return (
                        <Text className=" text-sm " key={index}>
                          - {data}
                        </Text>
                      );
                    }
                  )}
                </View>
                <View className="mt-2">
                  <Text className="font-semibold">Fee:</Text>
                  <Text>
                    N{details?.additionalInfo?.drinks?.fee.toLocaleString()}
                  </Text>
                </View>
                <Text className="mt-5 font-bold">Ceiling installation:</Text>
                <View className="text-left mt-2">
                  <Text className="font-semibold">Policy:</Text>
                  {details?.preEventAccess?.ceilingInstallation?.policy.map(
                    (data, index) => {
                      return (
                        <Text className=" text-sm " key={index}>
                          - {data}
                        </Text>
                      );
                    }
                  )}
                </View>
                <View className="mt-2">
                  <Text className="font-semibold">Fee:</Text>
                  <Text>
                    N
                    {details?.preEventAccess?.ceilingInstallation?.cost.toLocaleString()}
                  </Text>
                </View>
                <View className="mt-2">
                  <Text className="font-semibold">Setup access time:</Text>
                  {details?.preEventAccess?.time.map((data, index) => {
                    return (
                      <Text className=" text-sm " key={index}>
                        - {data}
                      </Text>
                    );
                  })}
                </View>
                <Text className="mt-5 font-bold">Stage platform:</Text>
                <View className="text-left mt-2">
                  <Text className="font-semibold">Setup type:</Text>
                  {details?.spaceFeatures?.stagePlatform?.setupType.map(
                    (data, index) => {
                      return (
                        <Text className=" text-sm " key={index}>
                          - {data}
                        </Text>
                      );
                    }
                  )}
                </View>
                <View className="mt-2">
                  <Text className="font-semibold">Stage dimension:</Text>
                  <View className="flex flex-row space-x-1">
                    <Text>Breath:</Text>
                    <Text>
                      {details.spaceFeatures?.stagePlatform?.dimension.breath}{" "}
                      ft.
                    </Text>
                  </View>

                  <View className="flex flex-row space-x-1">
                    <Text>Height:</Text>
                    <Text>
                      {details.spaceFeatures?.stagePlatform?.dimension.height}{" "}
                      ft.
                    </Text>
                  </View>

                  <View className="flex flex-row space-x-1">
                    <Text>Length:</Text>
                    <Text>
                      {details?.spaceFeatures?.stagePlatform?.dimension.length}{" "}
                      ft.
                    </Text>
                  </View>
                </View>
              </>
            ) : null}

            <View className="">
              <Pressable
                onPress={() =>
                  showMore ? setShowMore(false) : setShowMore(true)
                }
                className="font-bold pt-2 text-[#517869]"
              >
                {showMore ? (
                  <Text className="font-bold pt-2 text-[#517869]">
                    + Show less about space
                  </Text>
                ) : (
                  <Text className="font-bold pt-2 text-[#517869]">
                    + Show more about space
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
          {/* ///////////// */}
        </View>
      </ScrollView>
      <EnquireBottomSheet
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <View>
        <View className="px-3 py-8 relative bg-white">
          <Primarybutton
            onPress={() =>
              navigation.navigate("Enquire", {
                details,
                layoutCapacity: capacity,
              })
            }
            title="Enquire now"
          />
        </View>
      </View>
    </View>
  );
};

export default FullDetails;
