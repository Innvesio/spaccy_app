import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BackButton, CustomInput, Primarybutton } from "../../../components";
import { SelectList } from "react-native-dropdown-select-list";
import { appColors } from "../../../constants/colors";
import { Profile2User } from "iconsax-react-native";
import moment from "moment";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import { BookingContext } from "../../../context/BookingContext";
import { ChatContext } from "../../../context/ChatContext";
import { SpaceContext } from "../../../context/SpaceContext";
import { AuthContext } from "../../../context/AuthContext";

const EnquireVendor = ({ route, navigation }) => {
  const [showModal, setShowModal] = useState("none");
  const {
    enquireNowDetails,
    bookaVendor,
    setEnquireNowDetails,
    bookingSuccess,
  } = useContext(BookingContext);
  const { setNewMessage, createConvasation } = useContext(ChatContext);
  const { searchValue } = useContext(SpaceContext);
  const { user } = useContext(AuthContext);
  const details = route.params;

  navigation.setOptions({
    headerTitleAlign: "left",
    headerTitle: (props) => (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text className="font-bold text-xl capitalize">Enquire</Text>
      </View>
    ),
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  //   const [dates, setDates] = useState({
  //     startDate: null,
  //     endDate: null,
  //     displayedDate: moment(),
  //   });
  //   const { startDate, endDate, displayedDate } = dates;

  //   const handleDateChange = (newDates) => {
  //     setDates({ ...dates, ...newDates });
  //   };

  const data = [
    { key: "0", value: "Dining" },
    { key: "1", value: "Standing" },
    { key: "2", value: "Class Room" },
    { key: "3", value: "Theatre" },
    { key: "4", value: "U-Shaped" },
    { key: "5", value: "Board Products" },
  ];

  const dateOption = {
    textHeaderColor: appColors.mainColor,
    textDefaultColor: appColors.mainColor,
    selectedTextColor: "rgba(122, 146, 165, 0.5)",
    mainColor: appColors.mainColor,
    textSecondaryColor: appColors.mainColor,
    borderColor: "rgba(122, 146, 165, 0.1)",
  };
  const timeOption = {
    textDefaultColor: appColors.mainColor,
    selectedTextColor: "#fff",
    mainColor: "#44403C",
    textSecondaryColor: appColors.mainColor,
  };

  const showPicker = () => {
    switch (showModal) {
      case "date":
        return (
          <DatePicker
            // options={dateOption}
            // minimumDate={new Date()}
            selected={enquireNowDetails.dateAndTime.date}
            mode="calendar"
            onDateChange={(date) => {
              //   console.log("hello");
              setEnquireNowDetails((prev) => ({
                ...prev,
                dateAndTime: {
                  ...prev.dateAndTime,
                  date: date,
                },
              }));
            }}
          />
        );
        break;
      case "from":
        return (
          <DatePicker
            selected={enquireNowDetails.dateAndTime.startTime}
            onTimeChange={(time) => {
              setEnquireNowDetails((prev) => ({
                ...prev,
                dateAndTime: {
                  ...prev.dateAndTime,
                  startTime: time,
                },
              }));
            }}
            options={timeOption}
            mode="time"
          />
        );
        break;
      case "to":
        return (
          <DatePicker
            selected={enquireNowDetails.dateAndTime.endTime}
            onTimeChange={(time) =>
              setEnquireNowDetails((prev) => ({
                ...prev,
                dateAndTime: {
                  ...prev.dateAndTime,
                  endTime: time,
                },
              }))
            }
            options={timeOption}
            mode="time"
          />
        );
        break;

      default:
        break;
    }
  };

  const enquireNow = () => {
    bookaVendor(details, searchValue);
    if (bookingSuccess) {
      createConvasation(
        "vendor",
        details._id,
        details.userId,
        {
          eventStartTime: enquireNowDetails.dateAndTime.startTime,
          eventEndTime: enquireNowDetails.dateAndTime.endTime,
          numberOfGuests: enquireNowDetails.people,
          eventDate: enquireNowDetails.dateAndTime.date,
          eventType: searchValue,
          eventTitle: user?.data.firstName,
        },
        details.businessName,
        navigation
      );
    }
  };
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        alwaysBounceVertical
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets={true}
        className="p-3 pt-7 space-y-6"
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal !== "none"}
        >
          <Pressable
            onPress={() => setShowModal("none")}
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            className="flex-1 justify-center items-center p-5"
          >
            <View className="p-4 space-y-5 rounded-xl bg-white w-full">
              <View className="justify-between items-center flex-row">
                {showPicker()}
              </View>

              <View className="pt-5">
                <Primarybutton
                  onPress={() => setShowModal("none")}
                  title="Done"
                />
              </View>
            </View>
          </Pressable>
        </Modal>

        {/*  */}
        <CustomInput
          onChangeText={(val) =>
            setEnquireNowDetails((prev) => ({
              ...prev,
              people: val,
            }))
          }
          label="Number of people"
          placeholder="100"
        />
        <View className="space-y-4 bg-stone-200 p-4 rounded">
          <View className="flex-row justify-between items-center">
            <Text className="text-stone-800 font-medium">Date</Text>
            <Pressable
              onPress={() => setShowModal("date")}
              className="p-3 px-4 bg-stone-600 rounded-lg"
            >
              <Text className="text-white font-medium">
                {enquireNowDetails.dateAndTime.date
                  ? moment(
                      enquireNowDetails.dateAndTime.date,
                      "YYYY/MM/DD"
                    ).format("MMMM DD, YYYY")
                  : "Select Date"}
              </Text>
            </Pressable>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-stone-800 font-medium">From</Text>
            <Pressable
              onPress={() => setShowModal("from")}
              className="p-3 px-4 bg-stone-600 rounded-lg"
            >
              <Text className="text-white font-medium">
                {enquireNowDetails.dateAndTime.startTime
                  ? enquireNowDetails.dateAndTime.startTime
                  : "Select Time"}
              </Text>
            </Pressable>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-stone-800 font-medium">To</Text>
            <Pressable
              onPress={() => setShowModal("to")}
              className="p-3 px-4 bg-stone-600 rounded-lg"
            >
              <Text className="text-white font-medium">
                {" "}
                {enquireNowDetails.dateAndTime.endTime
                  ? enquireNowDetails.dateAndTime.endTime
                  : "Select Time"}
              </Text>
            </Pressable>
          </View>
        </View>
        <View className="space-y-1">
          <Text className="text-lg font-semibold">Message to Venue Owner</Text>
          <View className="border rounded  overflow-hidden">
            <TextInput
              className="h-36 p-3"
              multiline={true}
              numberOfLines={10}
              underlineColorAndroid="transparent"
              placeholder="Please write what you will like to use the space for and any question you might have"
              onChangeText={(text) => {
                setEnquireNowDetails((prev) => ({
                  ...prev,
                  message: text,
                }));
                setNewMessage((prev) => ({ ...prev, message: text }));
              }}
              // value={this.state.text}
            />
          </View>
        </View>
      </ScrollView>
      <View className="px-3 py-8 ">
        <Primarybutton onPress={() => enquireNow()} title="Enquire Now" />
      </View>
    </View>
  );
};

export default EnquireVendor;
