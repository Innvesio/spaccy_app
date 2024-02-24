import { Text, TouchableOpacity } from "react-native";
import React from "react";

const Primarybutton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      className="bg-stone-700 w-full px-6 py-5 rounded flex-col justify-center items-center"
      title="Login"
    >
      <Text className="text-white font-medium" title="Login">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Primarybutton;
