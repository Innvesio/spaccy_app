import {
  View,
  ScrollView,
  Image,
  Text,
  Touchable,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SearchNormal, Setting4, Star1 } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import { CustomInput, InputWithIcon } from "../../../components";
import { SimpleGrid } from "react-native-super-grid";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { SpaceContext } from "../../../context/SpaceContext";
import env from "../../../constants/env";
// import Skeleton from "react-native-reanimated-skeleton";

const Explore = ({ navigation }) => {
  const { spaces, setSpaces, eventTypes } = useContext(SpaceContext);
  const [searchOptions, setSearchOptions] = useState({
    eventType: "",
    capacity: 0,
    location: "",
  });
  const [showEventTypes, setShowEventTypes] = useState(false);
  navigation.setOptions({
    headerTitleAlign: "center",
    headerRight: () => (
      <View className="flex flex-row px-[18px] space-x-6">
        <Setting4 size={23} color={appColors.primaryColor} />
      </View>
    ),
  });

  const handleSearchChange = (val) => {
    setSearchOptions((prev) => ({ ...prev, eventType: val }));
  };

  useEffect(() => {
    const fetchSpaces = () => {
      axios
        .get(
          `${env.API_URL}/search/spaces?eventType=${searchOptions.eventType}&capacity=${searchOptions.capacity}&location=${searchOptions.location}`,
          {
            headers: {
              Authorization: `Bearer ${"0000000"}`,
            },
          }
        )
        .then((res) => {
          setSpaces(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchSpaces();
    console.log(eventTypes);
  }, [searchOptions.eventType]);

  return (
    <TouchableWithoutFeedback onPress={() => setShowEventTypes(false)}>
      <View className="bg-white flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ zIndex: 10, elevation: 5 }}
            className="w-full flex-1 relative p-[24px]"
          >
            <CustomInput
              onFocus={() => setShowEventTypes(true)}
              value={searchOptions.eventType}
              onChangeText={handleSearchChange}
              icon={<SearchNormal color={appColors.primaryColor} />}
              placeholder="Event / Vendor type"
            />
            {showEventTypes && (
              <View
                style={{ zIndex: 10, elevation: 5 }}
                className="w-full z-50 h-[200px] bg-white rounded-b-xl transition-all animate-bounce border border-gray-100 p-3 absolute right-[24px] -bottom-[175px]"
              >
                <ScrollView>
                  {eventTypes.map((item, index) => (
                    <View className="border-b py-4 border-gray-100" key={index}>
                      <Text className="text-left font-medium ">{item}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View style={{ zIndex: 5, elevation: 2 }} className="w-full  bg">
            {spaces.length <= 0 ? (
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
              <SimpleGrid
                className="space-x-6"
                itemDimension={130}
                data={spaces}
                renderItem={({ item }) => (
                  <TouchableNativeFeedback
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
                  </TouchableNativeFeedback>
                )}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Explore;
