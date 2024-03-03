import { View, Text, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import env from "../../../../../constants/env";
import axios from "axios";
import { ChatContext } from "../../../../../context/ChatContext";

const ChatCard = ({ details, navigation }) => {
  const { user } = useContext(AuthContext);
  const { getAllConvoChats, setCurrentConversation } = useContext(ChatContext);
  const ID = details.item?.members.find((id) => id !== user.data._id);

  const [receiver, setReceiver] = useState({});
  useEffect(() => {
    const getUser = () => {
      const apiEndPoint = `${env.API_URL}/auth/${ID}`;
      axios
        .get(apiEndPoint, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setReceiver(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (ID) {
      getUser();
    }
  }, [ID]);
  return (
    <Pressable
      onPress={() => {
        setCurrentConversation(details.item);
        getAllConvoChats(details.item._id);
        navigation.navigate("Chats", {
          details: details.item,
          receiverDetails: receiver,
        });
      }}
      className="mt-3 w-full py-1 space-x-3 flex-row items-center"
    >
      <View className="w-14 h-14 rounded-full grid overflow-hidden  bg-[#A0C6AB]">
        {receiver?.profilePhoto?.length >= 0 ? (
          <Image
            className="w-full h-full"
            source={{ uri: receiver.profilePhoto[0].url }}
            alt="image"
          />
        ) : (
          <Text className="text-2xl leading-[30px] capitalize  m-auto font-semibold">
            {receiver.firstName ? receiver.firstName[0] : null}
          </Text>
        )}
      </View>

      <View className="justify-center items-start">
        <Text className="font-semibold capitalize text-sm">
          {receiver.firstName + " " + receiver.lastName}
        </Text>
        <Text className="text-sm text-gray-400">How are you doing?</Text>
      </View>
      <View className="flex-1  p-3 items-end">
        <View className="w-6 h-6 rounded-full justify-center items-center bg-stone-700">
          <Text className="font-bold text-white">3</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatCard;
