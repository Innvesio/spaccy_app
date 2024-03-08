import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SearchNormal1, Setting4, Star1 } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import { SimpleGrid } from "react-native-super-grid";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { SpaceContext } from "../../../context/SpaceContext";
import env from "../../../constants/env";
import { SelectList } from "react-native-dropdown-select-list";
import { BookingContext } from "../../../context/BookingContext";

import FilterModal from "../components/modal/FilterModal";
import { RefreshControl } from "react-native-gesture-handler";
import VendorCard from "../components/ui/cards/VendorCard";
// import Skeleton from "react-native-reanimated-skeleton";

const Explore = ({ navigation }) => {
  const {
    spaces,
    setSpaces,
    searchValue,
    searchResult,
    setSearchValue,
    eventTypes,
    fetchSpaces,
    searchOptions,
    setSearchOptions,
    fetchVendors,
    vendors,
    searchByType,
    searchIsLoading,
    serviceTypes,
  } = useContext(SpaceContext);

  const [showEventTypes, setShowEventTypes] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  navigation.setOptions({
    headerTitleAlign: "center",
    headerRight: () => (
      <Pressable
        onPress={() => setModalIsOpen(true)}
        className="flex flex-row px-[18px] space-x-6"
      >
        <Setting4 size={23} color={appColors.primaryColor} />
      </Pressable>
    ),
  });

  useEffect(() => {
    searchByType();
  }, []);

  return (
    <>
      <FilterModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
      />
      <TouchableWithoutFeedback onPress={() => setShowEventTypes(false)}>
        <View className="bg-white flex-1 px-1">
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={searchIsLoading}
                onRefresh={searchByType}
              />
            }
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{ zIndex: 10, elevation: 5 }}
              className="w-full flex-1 relative px-2 py-[24px]"
            >
              <SelectList
                className="bg-red-300"
                data={
                  searchOptions.searchType === "space"
                    ? eventTypes
                    : serviceTypes
                }
                onSelect={() => searchByType()}
                setSelected={(val) => setSearchValue(val)}
                searchicon={
                  <View className="pr-2">
                    <SearchNormal1 size="20" color={appColors.primaryColor} />
                  </View>
                }
                boxStyles={{
                  backgroundColor: "white",
                  height: 60,
                  alignItems: "center",
                }}
                inputStyles={{ backgroundColor: "white" }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: appColors.primaryColor }}
                searchPlaceholder="Event / Service type"
                placeholder="Event or Vendor type"
                save="value"
              />
            </View>
            <View style={{ zIndex: 5, elevation: 2 }} className="w-full">
              {searchIsLoading ? (
                <SimpleGrid
                  className="space-x-6"
                  // style={{shadowOpacity }: 80}}
                  // spacing={11}
                  itemDimension={130}
                  data={Array(15).fill()}
                  renderItem={({ item }) => (
                    <View className="bg-gray-100 w-full animate-pulse relative object-cover overflow-hidden rounded-lg h-[250px]  "></View>
                  )}
                />
              ) : searchResult.length <= 0 ? (
                <View className="flex-1 justify-center pt-20 items-center">
                  <Text className="text-xl font-bold text-stone-300">
                    No result found
                  </Text>
                </View>
              ) : (
                <SimpleGrid
                  className="space-x-6"
                  itemDimension={130}
                  data={searchOptions.searchType === "space" ? spaces : vendors}
                  renderItem={({ item }) =>
                    searchOptions.searchType === "space" ? (
                      <Pressable
                        onPress={() => navigation.navigate("FullDetails", item)}
                        key={item._id}
                      >
                        <View className="bg-white w-full relative object-cover overflow-hidden border border-stone-200  h-[230px] rounded-xl ">
                          <Image
                            className="w-full h-full object-cover absolute rounded-xl"
                            source={{
                              uri:
                                item.images?.filter(
                                  (image) => image.isCoverPhoto
                                )[0]?.url || item.images[0]?.url,
                            }}
                          />
                          <LinearGradient
                            className="h-full w-full justify-end p-4"
                            colors={["#00000000", "#000"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 3 }}
                          >
                            <View className="w-full flex-row items-center  space-x-2 mb-1">
                              <Text className="text-white text-xs  text-left font-bold  capitalize truncate">
                                {item.spaceName}
                              </Text>
                              <View className="text-[#DB743D]">
                                <Star1 variant="Bold" color="gold" size={14} />
                              </View>
                              <Text className="text-white">0</Text>
                            </View>
                            <Text className="text-white font-bold text-left text-xs">
                              {item.venueInfo.venueLocation.city +
                                " " +
                                item.venueInfo.venueLocation.state}
                            </Text>
                          </LinearGradient>
                        </View>
                      </Pressable>
                    ) : (
                      <VendorCard
                        key={item.businessInfo[0]._id}
                        details={item}
                        navigation={navigation}
                      />
                    )
                  }
                />
              )}
              {/* {spaces.length <= 0 ? (
                <SimpleGrid
                  className="space-x-6"
                  // style={{shadowOpacity }: 80}}
                  // spacing={11}
                  itemDimension={130}
                  data={Array(15).fill()}
                  renderItem={({ item }) => (
                    <View className="bg-gray-100 w-full animate-pulse relative object-cover overflow-hidden rounded-lg h-[250px]  "></View>
                  )}
                />
              ) : (
               
              )} */}
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Explore;
