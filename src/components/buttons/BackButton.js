import { TouchableOpacity } from "react-native";
import React from "react";
import { appColors } from "../../constants/colors";
import { ArrowLeft2 } from "iconsax-react-native";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: appColors.primaryColor }}
      className="p-1 rounded-full"
    >
      <ArrowLeft2 size={18} color="#fff" />
    </TouchableOpacity>
  );
};

export default BackButton;
