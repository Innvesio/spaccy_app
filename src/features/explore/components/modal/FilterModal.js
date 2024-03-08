import { View, Text, Modal, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { CustomInput } from "../../../../components";
import { SpaceContext } from "../../../../context/SpaceContext";

const FilterModal = ({
  searchOptions,
  setSearchOptions,
  modalIsOpen,
  setModalIsOpen,
}) => {
  const { searchByType } = useContext(SpaceContext);
  return (
    <Modal visible={modalIsOpen} animationType="fade" transparent={true}>
      <View
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        className="flex-1 justify-center items-centers p-5"
      >
        <View className="  space-y-5 rounded-xl overflow-hidden bg-white w-full">
          <Text className="text-center p-3 bg-stone-300 font-semibold">
            Filter Engine
          </Text>
          <View style={{ gap: 20 }} className="px-5 flex-row">
            <Pressable
              onPress={() =>
                setSearchOptions((prev) => ({
                  ...prev,
                  searchType: "service",
                }))
              }
              className={`p-3 justify-center items-center flex-1 rounded-lg border border-stone-500 checked:bg-slate-200 ${
                searchOptions.searchType === "service" ? "bg-stone-400" : ""
              }`}
            >
              <Text className="font-semibold ">Service</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                setSearchOptions((prev) => ({
                  ...prev,
                  searchType: "space",
                }))
              }
              className={`p-3 justify-center items-center flex-1 rounded-lg border border-stone-500 checked:bg-slate-200 ${
                searchOptions.searchType === "space" ? "bg-stone-400" : ""
              }`}
            >
              <Text className="font-semibold">Space</Text>
            </Pressable>
          </View>
          <View className="p-5 space-y-4">
            {searchOptions.searchType === "space" && (
              <View>
                <CustomInput
                  value={searchOptions.capacity}
                  onChangeText={(val) =>
                    setSearchOptions((prev) => ({ ...prev, capacity: val }))
                  }
                  label="Capacity"
                  placeholder="Capacity"
                />
              </View>
            )}
            <View>
              <CustomInput
                value={searchOptions.location}
                onChangeText={(val) =>
                  setSearchOptions((prev) => ({ ...prev, location: val }))
                }
                label="Location"
                placeholder="Abuja"
              />
            </View>
          </View>
          <View className="p-5 flex-row space-x-4 justify-end">
            <Pressable
              onPress={() => setModalIsOpen(false)}
              className="rounded border border-stone-400  px-6 py-4"
            >
              <Text className="font-medium">Close</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                searchByType();
                setModalIsOpen(false);
              }}
              className="rounded border border-stone-400 bg-stone-700   px-6 py-4"
            >
              <Text className="font-medium text-white">Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
