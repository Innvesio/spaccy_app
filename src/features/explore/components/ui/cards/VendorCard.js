import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "react-native-svg";
import { Star1 } from "iconsax-react-native";

const VendorCard = ({ details, navigation, index }) => {
  // console.log(
  //   details.businessInfo[0].images?.filter((image) => image.isCoverPhoto)[0]
  //     ?.url || details.businessInfo[0].images[0]?.url
  // );
  return (
    <Pressable
      onPress={() => navigation.navigate("VendorFullDetailsScreen", details)}
      key={details._id}
    >
      <View className="bg-blue-300 w-full relative object-cover overflow-hidden border border-stone-200  h-[230px] rounded-xl ">
        <Image
          className="w-full h-full object-cover absolute rounded-xl"
          source={{
            uri:
              details.businessInfo[index].images?.filter(
                (image) => image.isCoverPhoto
              )[0]?.url || details.businessInfo[0].images[0]?.url,
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
              {details.businessInfo[index].businessName}
            </Text>
            <View className="text-[#DB743D]">
              <Star1 variant="Bold" color="gold" size={14} />
            </View>
            <Text className="text-white">0</Text>
          </View>
          <Text className="text-white font-bold text-left text-xs">
            {details.vendorProfile[index].vendorLocation.city +
              " " +
              details.vendorProfile[index].vendorLocation.state}
          </Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

export default VendorCard;
