import { View, Text, TextInput } from "react-native";
import React from "react";

export default function CustomInput({
  placeholder,
  label,
  icon,
  onChangeText,
}) {
  return (
    <View className="w-full flex">
      <Text className="text-stone-900 font-medium capitalize pb-[4px]">
        {label}
      </Text>
      <View className="rounded border flex flex-row justify-center items-center border-stone-300">
        {icon && <View className="text-[#504B44] ml-12">{icon}</View>}
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#d6d3d1"
          className="disabled:bg-stone-200 w-full font-semibold  bg-inherit py-4 px-2 focus:text-stone-900 text-stone-900 placeholder:text-stone-800 text-sm"
        />
      </View>
    </View>
  );
}
