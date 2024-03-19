import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedbackBase,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { BackButton, Primarybutton } from "../../../components";
import { Message } from "iconsax-react-native";
import { SpaceContext } from "../../../context/SpaceContext";
import moment from "moment";
import { AuthContext } from "../../../context/AuthContext";
import { appColors } from "../../../constants/colors";
import StarRating from "react-native-star-rating";
import ServiceCard from "../components/ui/card/ServiceCard";

const BookingDetails = ({ route, navigation }) => {
  const { getAllSpace } = useContext(SpaceContext);
  const { user } = useContext(AuthContext);

  const details = route.params;
  navigation.setOptions({
    title: "Details",
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  return (
    <View className="flex-1 bg-white px-[24px]">
      <ScrollView className="pt-[24px]" showsVerticalScrollIndicator={false}>
        {/*  Event Information */}
        <View className="space-y-9 border-b pb-11 border-[#C9C7C5]">
          <Text className="font-bold text-lg text-stone-400">
            Event Information
          </Text>
          {/*  */}
          <View className="w-full space-y-7">
            <View className="space-y-1">
              <Text>Event Name</Text>
              <Text className="font-bold text-xl text-stone-400">
                {details?.eventTitle}'s {details?.event?.type}
              </Text>
            </View>

            <View className="w-full flex-row space-x-4">
              <View className="space-y-1">
                <Text>Vendor</Text>
                <Text className="font-bold text-xl text-stone-400">
                  {details?.service?.type ||
                    details?.services?.filter(
                      (service) => service.ownerId === user?.data?._id
                    )[0]?.type}
                </Text>
              </View>
              <View className="space-y-1">
                <Text>Venue</Text>
                <Text className="font-bold text-xl text-stone-400">
                  {details?.serviceData?.venueInfo?.name}
                </Text>
              </View>
            </View>
            {/* Chat button */}
            <TouchableOpacity className=" mb-2 flex-row text-sm  space-x-3 items-center  bg-stone-700 text-white py-3 px-4 rounded-lg">
              <Message color="#fff" />
              <Text className="text-white text-sm font-medium">
                Continue chatting with Clarence
              </Text>
            </TouchableOpacity>
          </View>
          <View className="">
            {details.services.map((item, index) => (
              <ServiceCard
                services={details.services}
                id={item.id}
                type={item.type}
                ownerId={item.ownerId}
                key={index}
              />
            ))}
          </View>

          {/*  */}
        </View>
        {/*  Event Information End */}
        {/*  Date and Time */}
        <View className="space-y-9 border-b pb-11 mt-11 border-[#C9C7C5]">
          <Text className="font-bold text-lg text-stone-400">
            Date and Time
          </Text>
          {/*  */}
          <View className="w-full space-y-7">
            <View className="w-full flex-row space-x-4">
              <View className="space-y-1 flex-1">
                <Text>Date</Text>
                <Text className="font-bold text-xl text-stone-400">
                  {moment(details?.event?.date).format("MMMM DD, YYYY")}
                </Text>
              </View>
              <View className="space-y-1 flex-1">
                <Text>Time</Text>
                <Text className="font-bold text-xl text-stone-400">
                  {moment(details?.event?.startTime, "x").format("hh:mm A")} -{" "}
                  {moment(details?.event?.endTime, "x").format("hh:mm A")}{" "}
                </Text>
              </View>
            </View>
          </View>
          {/*  */}
        </View>
        {/*  Date and Time End */}
        {/*  Guest Information*/}
        <View className="space-y-9 border-b pb-11 mt-11 border-[#C9C7C5]">
          <Text className="font-bold text-lg text-stone-400">
            Guest Information
          </Text>
          {/*  */}
          <View className="w-full space-y-7">
            <View className="w-full flex-row space-x-4">
              <View className="space-y-1 flex-1">
                <Text>Guest Count</Text>
                <Text className="font-bold text-xl text-stone-400">
                  {details?.event.numberOfGuests} Gusets
                </Text>
              </View>
              <View className="space-y-1 flex-1">
                <Text>Attendees List</Text>
                <Text className="font-bold text-xl text-stone-400">Blank</Text>
              </View>
            </View>
          </View>
          <Text className="font-bold text-lg mt-9 text-stone-400">
            Pricing Details
          </Text>
          {/*  */}
          <View className="w-full space-y-7">
            <View className="w-full flex-row space-x-4">
              <View className="space-y-1 flex-1">
                <Text>Total Price</Text>
                <Text className="font-bold text-xl text-stone-400">
                  ₦
                  {details?.service?.price?.toLocaleString() ||
                    details?.paymentInfo?.amount?.toLocaleString()}
                </Text>
              </View>
              <View className="space-y-1 flex-1">
                <Text>Payment Status</Text>
                <Text className="font-bold text-xl text-stone-400">
                  {details?.status === "confirmed" ? "Paid" : "Not Paid"}
                </Text>
              </View>
            </View>
          </View>
          {/*  */}
        </View>
        {/*  Guest InformationEnd */}
        {/*  Date and Time */}
        <View className="space-y-9  pb-20 mt-11">
          <Text className="font-bold text-lg text-stone-400">
            Contact Information
          </Text>
          {/*  */}
          <View className="w-full space-y-7">
            <View className="w-full  space-y-9">
              <View className="space-y-1 flex-1">
                <Text>Event Organizer</Text>
                <Text className="font-bold text-xl text-stone-400">
                  {details?.client.name}
                </Text>
              </View>
              <View className="space-y-1 flex-1">
                <Text>Email</Text>
                <Text className="font-bold text-xl text-stone-400">
                  {details?.client.email}
                </Text>
              </View>
              <View className="space-y-1 flex-1">
                <Text>Phone</Text>
                <Text className="font-bold text-xl text-stone-400">
                  {details?.client.phoneNumber || "N/A"}
                </Text>
              </View>
            </View>
          </View>
          {/*  */}
        </View>
        {/*  Date and Time End */}
      </ScrollView>
    </View>
  );
};

export default BookingDetails;
