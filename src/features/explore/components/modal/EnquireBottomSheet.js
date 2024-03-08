import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { SelectList } from "react-native-dropdown-select-list";
import { appColors } from "../../../../constants/colors";
import { Profile2User } from "iconsax-react-native";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Primarybutton } from "../../../../components";
import { AuthContext } from "../../../../context/AuthContext";
import { BookingContext } from "../../../../context/BookingContext";

const EnquireBottomSheet = ({
  modalIsOpen,
  setModalIsOpen,
  handleSheetChanges,
  bottomSheetRef,
}) => {
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState("none");

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  const data = [
    { key: "1", value: "Dining" },
    { key: "2", value: "Standing" },
    { key: "3", value: "Class Room" },
    { key: "4", value: "Theatre" },
    { key: "5", value: "U-Shaped" },
    { key: "6", value: "Board Products" },
  ];

  const showPicker = () => {
    switch (showModal) {
      case "date":
        return (
          <DatePicker
            options={dateOption}
            // minimumDate={new Date()}
            // selected={"2024-04-11"}
            mode="calendar"
            onSelectedChange={(date) =>
              setEnquireNowDetails((prev) => ({
                ...prev,
                dateAndTime: {
                  ...prev.dateAndTime,
                  date: date,
                },
              }))
            }
          />
        );
        break;
      case "from":
        return <DatePicker options={dateOption} mode="time" />;
        break;
      case "to":
        return <DatePicker options={dateOption} mode="time" />;
        break;

      default:
        break;
    }
  };
  return (
    <>
      <View>
        <View className="flex-1 bg-white space-y-3 ">
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
          <ScrollView className="space-y-5 px-5 pb-96 flex-1">
            <View>
              <SelectList
                search={false}
                className="bg-red-300"
                setSelected={(val) =>
                  setEnquireNowDetails((prev) => ({
                    ...prev,
                    layout: val,
                  }))
                }
                data={data}
                searchicon={
                  <View className="pr-2">
                    <Profile2User size="20" color={appColors.primaryColor} />
                  </View>
                }
                boxStyles={{
                  backgroundColor: "white",
                  height: 60,
                  alignItems: "center",
                }}
                inputStyles={{ backgroundColor: "white" }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: appColors.primaryColor }}
                searchPlaceholder="Select space layout"
                placeholder="Select space layout"
                save="value"
              />
            </View>
            <View>
              <SelectList
                search={false}
                className="bg-red-300"
                setSelected={(val) =>
                  setEnquireNowDetails((prev) => ({
                    ...prev,
                    people: val,
                  }))
                }
                data={[
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                  { value: 7 },
                ]}
                searchicon={
                  <View className="pr-2">
                    <Profile2User size="20" color={appColors.primaryColor} />
                  </View>
                }
                boxStyles={{
                  backgroundColor: "white",
                  height: 60,
                  alignItems: "center",
                }}
                inputStyles={{ backgroundColor: "white" }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: appColors.primaryColor }}
                searchPlaceholder="People"
                placeholder="People"
                save="value"
              />
            </View>
            <View className="space-y-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-stone-800 font-medium">Date</Text>
                <Pressable
                  onPress={() => setShowModal("date")}
                  className="p-3 px-4 bg-stone-600 rounded-lg"
                >
                  <Text className="text-white font-medium">Select Date</Text>
                </Pressable>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-stone-800 font-medium">From</Text>
                <Pressable
                  onPress={() => setShowModal("from")}
                  className="p-3 px-4 bg-stone-600 rounded-lg"
                >
                  <Text className="text-white font-medium">Select Time</Text>
                </Pressable>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-stone-800 font-medium">To</Text>
                <Pressable
                  onPress={() => setShowModal("to")}
                  className="p-3 px-4 bg-stone-600 rounded-lg"
                >
                  <Text className="text-white font-medium">Select Time</Text>
                </Pressable>
              </View>
            </View>

            <View className="space-y-3 pt-10 pb-60">
              <Text className="font-bold text-xl">
                Message to {user?.data.firstName} {user?.data.lastName}
              </Text>
              <View className="bg-white border h-40 rounded-xl overflow-hidden">
                <TextInput
                  onChangeText={(val) =>
                    setEnquireNowDetails((prev) => ({
                      ...prev,
                      message: val,
                    }))
                  }
                  placeholder="Please write what you will like to use the space for and any question you might have"
                  className="p-4"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default EnquireBottomSheet;
