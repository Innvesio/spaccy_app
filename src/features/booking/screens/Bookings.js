import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SearchNormal, Setting4 } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import { BookingCard } from "../components";
import { CustomInput, InputWithIcon } from "../../../components";

const Bookings = ({ navigation }) => {
  navigation.setOptions({
    headerTitleAlign: "center",
    headerRight: () => (
      <View className="flex flex-row px-[18px] space-x-6">
        <Setting4 size={23} color={appColors.primaryColor} />
      </View>
    ),
  });
  return (
    <View className="flex-1 bg-white px-[24px]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-3 py-[24px]"
      >
        <View className="w-full mb-6">
          <CustomInput
            icon={<SearchNormal color={appColors.primaryColor} />}
            placeholder="Search for bookings"
          />
        </View>
        <View>
          <BookingCard
            onPress={() => navigation.navigate("BookingDetails")}
            eventTitle="Event Manager Event For Clarence Aigbuza"
            eventDate="Feb 12, 2024"
            eventStartTime="10:00 AM"
            eventEndTime="02:00 PM"
            status="pending"
            eventType="Event Manager"
            numberOfGuests="12 guests"
          />
        </View>
        <View>
          <BookingCard
            eventTitle="Event Manager Event For Clarence Aigbuza"
            eventDate="Feb 12, 2024"
            eventStartTime="10:00 AM"
            eventEndTime="02:00 PM"
            status="confirmed"
            eventType="Event Manager"
            numberOfGuests="12 guests"
          />
        </View>
        <View>
          <BookingCard
            eventTitle="Event Manager Event For Clarence Aigbuza"
            eventDate="Feb 12, 2024"
            eventStartTime="10:00 AM"
            eventEndTime="02:00 PM"
            status="pending"
            eventType="Event Manager"
            numberOfGuests="12 guests"
          />
        </View>
        <View>
          <BookingCard
            eventTitle="Event Manager Event For Clarence Aigbuza"
            eventDate="Feb 12, 2024"
            eventStartTime="10:00 AM"
            eventEndTime="02:00 PM"
            status="pending"
            eventType="Event Manager"
            numberOfGuests="12 guests"
          />
        </View>
        <View>
          <BookingCard
            eventTitle="Event Manager Event For Clarence Aigbuza"
            eventDate="Feb 12, 2024"
            eventStartTime="10:00 AM"
            eventEndTime="02:00 PM"
            status="pending"
            eventType="Event Manager"
            numberOfGuests="12 guests"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Bookings;
