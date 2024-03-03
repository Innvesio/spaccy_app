import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../context/AuthContext";

const MessageCard = ({ sender, message, sentAt, status }) => {
  const { user } = useContext(AuthContext);
  const isMe = sender !== user.data._id;
  return (
    <View
      className={`w-full space-y-2  ${
        isMe ? "justify-end items-start " : "items-end"
      }`}
    >
      <View
        className={`p-2 px-3 ${
          isMe
            ? "bg-[#BBCBC5] rounded-2xl rounded-bl-none"
            : "bg-white border-[1px] border-[#6D8E82] rounded-2xl rounded-br-none "
        }`}
      >
        <Text className="text-base font-normal text-left">{message}</Text>
      </View>
      <Text className="text-xs">{sentAt}</Text>
    </View>
  );
};

export default MessageCard;
