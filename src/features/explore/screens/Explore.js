import { View, Text } from "react-native";
import React from "react";
import { SearchNormal, Setting4 } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import { InputWithIcon } from "../../../components";
import { SimpleGrid } from "react-native-super-grid";

const Explore = ({ navigation }) => {
  navigation.setOptions({
    headerTitleAlign: "center",
    headerRight: () => (
      <View className="flex flex-row px-[18px] space-x-6">
        <Setting4 size={23} color={appColors.primaryColor} />
      </View>
    ),
  });
  return (
    <View className="bg-white flex-1 p-[24px]">
      <View className="w-full">
        <InputWithIcon
          icon={<SearchNormal color={appColors.primaryColor} />}
          placeholder="Event / Vendor type"
        />
      </View>
      <View className="w-full bg">
        <SimpleGrid
          className="space-x-6"
          // style={{shadowOpacity }: 80}}
          spacing={20}
          itemDimension={130}
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({ item }) => (
            <View className="bg-slate-500 w-full  h-[200px] rounded-xl "></View>
          )}
        />
      </View>
    </View>
  );
};

export default Explore;
