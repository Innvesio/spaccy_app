import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { SearchNormal, Setting4 } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import { BookingCard } from "../components";
import { CustomInput, InputWithIcon } from "../../../components";
import { BookingContext } from "../../../context/BookingContext";
import moment from "moment";

const Bookings = ({ navigation }) => {
  const { getBookingsIsLoading, getBookings, bookings } =
    useContext(BookingContext);
  navigation.setOptions({
    headerTitleAlign: "center",
    headerRight: () => (
      <View className="flex flex-row px-[18px] space-x-6">
        <Setting4 size={23} color={appColors.primaryColor} />
      </View>
    ),
  });

  useEffect(() => {
    getBookings();
  }, []);
  return (
    <View className="flex-1 bg-white px-3">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getBookingsIsLoading}
            onRefresh={getBookings}
          />
        }
        showsVerticalScrollIndicator={false}
        className="space-y-3 py-[24px]"
      >
        <View className="w-full mb-6">
          <CustomInput
            icon={<SearchNormal color={appColors.primaryColor} />}
            placeholder="Search for bookings"
          />
        </View>
        {bookings.length <= 0 ? (
          <View className="flex-1 justify-center pt-20 items-center">
            <Text className="text-xl font-bold text-stone-300">
              No Booking found
            </Text>
          </View>
        ) : (
          bookings?.map((item, index) => (
            <Pressable
              onPress={() => navigation.navigate("BookingDetails", item)}
              key={index}
            >
              <BookingCard
                eventTitle={`${item.event.type} event for ${item.eventTitle}`}
                eventDate={moment(item.event.date).format("MMM DD, YYYY")}
                eventStartTime={moment(item.event.startTime, "x").format(
                  "hh:mm A"
                )}
                eventEndTime={moment(item.event.endTime, "x").format("hh:mm A")}
                status={item.status}
                eventType={item.event.type}
                numberOfGuests={item.event.numberOfGuests}
              />
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Bookings;
