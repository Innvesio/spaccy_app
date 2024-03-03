import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../context/AuthContext";

const MessageCard = ({ sender, message, sentAt, status }) => {
  const { user } = useContext(AuthContext);
  const isMe = sender !== user.data._id;
  return (
    <View
      className={`w-full space-y-2  ${
        isMe ? "justify-end items-end" : "items-start"
      }`}
    >
      <View
        className={`p-4 ${
          isMe
            ? "bg-[#BBCBC5] rounded-2xl rounded-br-none"
            : "bg-white border-[1px] border-[#6D8E82] rounded-2xl rounded-bl-none"
        }`}
      >
        <Text className="text-base font-medium text-left">{message}</Text>
      </View>
      <Text className="">{sentAt}</Text>
    </View>
  );
};

export default MessageCard;
