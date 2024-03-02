import { View, Text, TextInput } from "react-native";
import React from "react";
import { appColors } from "../../constants/colors";

export default function CustomInput({
  value,
  placeholder,
  label,
  icon,
  onChangeText,
  onFocus,
  secureTextEntry,
  id,
}) {
  return (
    <View className="w-full flex">
      {label && (
        <Text className="text-stone-900 font-medium capitalize pb-[4px]">
          {label}
        </Text>
      )}
      <View className="rounded border flex flex-row justify-center items-center border-stone-300">
        {icon && <View className="text-[#504B44] ml-12">{icon}</View>}
        <TextInput
          secureTextEntry={secureTextEntry}
          value={value}
          onFocus={onFocus}
          id={id}
          cursorColor={appColors.primaryColor}
          selectionColor={appColors.primaryColor}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#d6d3d1"
          className="disabled:bg-stone-200 w-full font-semibold  bg-inherit py-4 px-2 focus:text-stone-900 text-stone-900 placeholder:text-stone-800 text-sm"
        />
      </View>
    </View>
  );
}
