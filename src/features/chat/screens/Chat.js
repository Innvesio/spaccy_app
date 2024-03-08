import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BackButton, CustomInput } from "../../../components";
import { AuthContext } from "../../../context/AuthContext";
import { SearchNormal } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import ChatCard from "../components/ui/card/ChatCard";
import { ChatContext } from "../../../context/ChatContext";

const Chat = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { conversations, getAllCoversations, getMessageIsLoading } =
    useContext(ChatContext);
  navigation.setOptions({
    headerTitleAlign: "left",
    headerTitle: (props) => (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text className="font-bold text-xl capitalize">Messages</Text>
      </View>
    ),
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  useEffect(() => {
    getAllCoversations();
  }, []);
  return (
    <View className="flex-1 bg-white p-4">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={getMessageIsLoading}
            onRefresh={getAllCoversations}
          />
        }
      >
        {/* <Text className="font-bold text-3xl">Chats</Text> */}
        <View>
          <View className="flex mt-3 bg-stone-100 flex-row justify-center rounded-xl items-center border border-stone-300">
            <View className="text-[#504B44] ml-12">
              <SearchNormal color={appColors.primaryColor} />
            </View>
            <TextInput
              placeholder="Search message"
              className="disabled:bg-stone-200  w-full font-semibold  bg-inherit p-3 focus:text-stone-900 text-stone-900 placeholder:text-stone-800 text-sm"
            />
          </View>
        </View>
        <View className="mt-5">
          {conversations.map((item, index) => (
            <View key={index} className="w-full ">
              <ChatCard navigation={navigation} details={item} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Chat;
