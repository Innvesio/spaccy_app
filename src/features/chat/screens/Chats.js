import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { BackButton, InputWithIcon } from "../../../components";
import { appColors } from "../../../constants/colors";
import { Add, Send2 } from "iconsax-react-native";
import { ChatContext } from "../../../context/ChatContext";
import MessageCard from "../components/ui/card/MessageCard";
import moment from "moment";

const Chats = ({ route, navigation }) => {
  const { currentConvoMessages } = useContext(ChatContext);
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
          {currentConvoMessages.map((item, index) => (
            <View>
              <MessageCard
                sender={item.senderId}
                message={item.message}
                key={index}
                sentAt={moment(item.createdAt).format("hh:mm A")}
              />
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
            className="bg-stone-100 flex-1 p-2 rounded-full border border-stone-200"
            placeholder="Type a message..."
          />
          <View className="rounded-full justify-center items-center w-11 h-11 bg-stone-700">
            <Send2 color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Chats;
