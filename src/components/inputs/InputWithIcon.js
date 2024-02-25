import { TextInput, View } from "react-native";

const InputWithIcon = ({ icon, placeholder }) => {
  return (
    <View className="rounded-xl  space-x-3 border flex flex-row justify-center items-center overflow-hidden border-stone-300 focus:border-stone-700 p-4">
      <View className="t2">{icon}</View>
      <TextInput placeholder={placeholder} className="flex-1  h-full" />
    </View>
  );
};

export default InputWithIcon;
