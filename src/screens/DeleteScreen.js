import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { BackButton } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButtonItem } from "expo-radio-button";

const DeleteScreen = ({ navigation }) => {
  navigation.setOptions({
    headerTitleAlign: "left",
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  const deletionReasons = [
    {
      reason: "No Longer Hosting/Providing Services",
      details:
        "I am no longer offering events or services and would like to delete my account.",
      checked: false,
    },
    {
      reason: "Privacy Concerns",
      details: "I'm concerned about my privacy and data security.",
      checked: false,
    },
    {
      reason: "Inactive Account",
      details:
        "I don't use this platform anymore and want to remove my account.",
      checked: false,
    },
    {
      reason: "Event Already Booked",
      details:
        "I've already booked what I needed and don't require this account any longer.",
      checked: false,
    },
    {
      reason: "Unsatisfactory Experience",
      details: "I wasn't satisfied with the platform or the services offered.",
      checked: false,
    },
    {
      reason: "Data Management",
      details:
        "I'm concerned about how my data is being managed on this platform.",
      checked: false,
    },
    {
      reason: "Event Planning Completed",
      details:
        "My event planning is finished, and I don't need this account anymore.",
      checked: false,
    },
    {
      reason: "Personal Preference",
      details:
        "I prefer to keep a minimal online presence and want to delete unnecessary accounts.",
      checked: false,
    },
    {
      reason: "Other",
      details: "Please specify your reason for deletion.",
      checked: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-[10px]">
        <View className="mb-10">
          <Text className="text-xl font-semibold">
            We'er sorry to see you go.
          </Text>
          <Text className="text-base font-medium text-stone-400">
            Tell us why you're leaving.
          </Text>
        </View>
        <View className="space-y-3">
          {deletionReasons.map((item, index) => (
            <Pressable
              key={index}
              className="h-20 w-full border rounded-md flex space-x-4 flex-row items-center px-5  border-gray-200"
            >
              <RadioButtonItem value="test2" label="Example with string" />
              <View className="text-gray-500  flex-1">
                <Text className="font-semibold text-base">{item.reason}</Text>
                <Text className="font-medium  text-stone-400 text-xs">
                  {item.details}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeleteScreen;
