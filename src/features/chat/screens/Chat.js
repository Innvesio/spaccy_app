import { View, Text } from "react-native";
import React from "react";

const Chat = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="font-bold text-2xl">Messages</Text>
      <View></View>
    </View>
  );
};

export default Chat;
