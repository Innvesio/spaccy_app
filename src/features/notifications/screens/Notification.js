import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useContext, useEffect } from "react";
import { BackButton } from "../../../components";
import { NotificationContext } from "../../../context/NotificationContext";
import { Ticket, Ticket2 } from "iconsax-react-native";
import moment from "moment";

const Notification = ({ navigation }) => {
  const { getUserNotifications, notifications, getNotficationsIsLoading } =
    useContext(NotificationContext);
  navigation.setOptions({
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  useEffect(() => {
    getUserNotifications();
  }, []);
  return (
    <View className="flex-1 bg-white p-4">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getNotficationsIsLoading}
            onRefresh={getUserNotifications}
          />
        }
        showsVerticalScrollIndicator={false}
        className="space-y-5"
      >
        {notifications.map((item, index) => (
          <View style={{ gap: 10 }} className=" flex-row items-center ">
            <View className="w-14 h-14 justify-center items-center rounded-full bg-[#f5905ecd]">
              <Ticket2 color="white" />
            </View>
            <View className="justify-center flex-1 items-start space-y-2">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-semibold text-xs w-full"
              >
                {item.message.split(".")[0]}
              </Text>
              <Text className="font-medium text-xs text-stone-300 text-left">
                {item.message.split(".")[1].trim()}
              </Text>
            </View>
            <Text className="text-[10px] mt-2">
              {moment(item.createdAt).format("hh:mm A")}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notification;
