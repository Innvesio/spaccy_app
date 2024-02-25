import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import {
  BackButton,
  CustomInput,
  Primarybutton,
  ProfilePicture,
} from "../../../components";
import { ArrowLeft2, Edit2 } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";

const EditProfile = ({ navigation }) => {
  navigation.setOptions({
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });
  return (
    <View className="bg-white  flex-1">
      <ScrollView
        style={{ flexGrow: 1 }}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="w-full flex-1  flex items-center">
          <View className="p-[24px] w-full">
            <View className="w-40 h-40 m-auto relative ">
              <ProfilePicture firstLetter={"S"} />
              <View className="p-3 rounded-full absolute bg-gray-200 bottom-3 right-0">
                <Edit2 size={20} color={appColors.primaryColor} />
              </View>
            </View>
          </View>
          <View className="w-full  space-y-4 mt-12 px-[24px]">
            {/* FirstName */}
            <View>
              <CustomInput placeholder="First Name" label="Full Name" />
            </View>
            {/* Fullname */}
            <View>
              <CustomInput placeholder="Last Name" label="Last Name" />
            </View>
            {/* Fullname */}
            <View>
              <CustomInput
                placeholder="example@gmail.com"
                label="Email Address"
              />
            </View>
            {/* Button */}
          </View>
          <View className=" h-full mt-20 px-[24px] flex justify-end flex-1 w-full">
            <Primarybutton title="Save Changes" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
