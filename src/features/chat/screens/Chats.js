import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { BackButton } from "../../../components";
import { appColors } from "../../../constants/colors";
import { Add, Send2 } from "iconsax-react-native";
import { ChatContext } from "../../../context/ChatContext";
import MessageCard from "../components/ui/card/MessageCard";
import moment from "moment";
import InvoiceCard from "../components/ui/card/InvoiceCard";
import { AuthContext } from "../../../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const Chats = ({ route, navigation }) => {
  const {
    currentConvoMessages,
    currentConversation,
    sendMessage,
    setNewMessage,
    newMessage,
    messages,
    setMessages,
    arrivalMessage,
    setArrivalMessage,
    socket,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
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
  // Add message to the messages array and sets it as the state for this component's messages variable
  useEffect(() => {
    if (arrivalMessage) {
      if (currentConversation?.members.includes(arrivalMessage.senderId)) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
    }
  }, [arrivalMessage, currentConversation]);

  useEffect(() => {
    socket?.emit("addUser", user?.data._id);
  }, [user, socket]);

  useEffect(() => {
    socket?.on("get_message", (data) => {
      console.log("Get message");
      setArrivalMessage({
        message: data.message,
        senderId: data.senderId,
        messageType: data.messageType,
        invoiceDetails: data.invoiceDetails,
        bookingDetails: data.bookingDetails,
        createdAt: Date.now(),
      });
    });
  }, [socket, newMessage]);

  return (
    <SafeAreaView className="flex-1 bg-stone-100">
      {/* <View className="flex-1"> */}
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        // onContentSizeChange={() =>
        //   scrollViewRef.current.scrollToEnd({ animated: true })
        // }
        className="space-y-3 p-4 flex-1"
        // showsVerticalScrollIndicator={false}
      >
        {messages.map((item, index) => (
          <View key={index}>
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
      </KeyboardAwareScrollView>
      {/* </View> */}

      <View className="flex-row items-start rounded-b-2xl h-20 w-full p-2 bg-white">
        <View className="flex-row items-center space-x-2">
          {/* <View className="rounded-full justify-center items-center w-11 h-11 bg-stone-700">
            <Add color="#fff" />
          </View> */}
          <TextInput
            onChangeText={(val) => {
              setNewMessage((prev) => ({ ...prev, message: val }));
            }}
            value={newMessage.message}
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
    </SafeAreaView>
  );
};

export default Chats;
