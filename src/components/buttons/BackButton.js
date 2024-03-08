import { TouchableOpacity } from "react-native";
import React from "react";
import { appColors } from "../../constants/colors";
import { ArrowLeft2 } from "iconsax-react-native";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // style={{ backgroundColor: appColors.primaryColor }}
      className=" rounded-full"
    >
      <ArrowLeft2 size={25} strokeWidth={200} color={appColors.primaryColor} />
    </TouchableOpacity>
  );
};

export default BackButton;
