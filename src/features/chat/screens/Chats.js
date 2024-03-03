import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { BackButton, InputWithIcon } from "../../../components";
import { appColors } from "../../../constants/colors";
import { Add, Send2 } from "iconsax-react-native";
import { ChatContext } from "../../../context/ChatContext";
import MessageCard from "../components/ui/card/MessageCard";
import moment from "moment";
import InvoiceCard from "../components/ui/card/InvoiceCard";

const Chats = ({ route, navigation }) => {
  const {
    currentConvoMessages,
    sendMessage,
    setNewMessage,
    newMessage,
    messages,
    setMessages,
  } = useContext(ChatContext);
  const scrollViewRef = useRef(null);
  const { details, receiverDetails } = route.params;

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  navigation.setOptions({
    headerTitleAlign: "left",
    headerTitle: (props) => (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text className="font-semibold text-xl lowercase">
          {receiverDetails.firstName + " " + receiverDetails.lastName}
        </Text>
      </View>
    ),
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });
  return (
    <View className="flex-1 bg-stone-100">
      <View className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          className="space-y-3 p-4"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((item, index) => (
            <View>
              {item.messageType === "text" ? (
                <MessageCard
                  sender={item.senderId}
                  message={item.message}
                  key={index}
                  sentAt={moment(item.createdAt).format("hh:mm A")}
                />
              ) : (
                <InvoiceCard details={item} />
              )}
            </View>
          ))}
          <View className="w-full h-10"></View>
        </ScrollView>
      </View>
      <View className="flex-row items-start rounded-b-2xl h-20 w-full p-2 bg-white">
        <View className="flex-row items-center space-x-2">
          <View className="rounded-full justify-center items-center w-11 h-11 bg-stone-700">
            <Add color="#fff" />
          </View>
          <TextInput
            onChangeText={(val) => {
              setNewMessage(val);
            }}
            value={newMessage}
            className="bg-stone-100 flex-1 p-2 rounded-full border border-stone-200"
            placeholder="Type a message..."
          />
          <Pressable
            onPress={() => sendMessage()}
            className="rounded-full justify-center items-center w-11 h-11 bg-stone-700"
          >
            <Send2 color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Chats;
