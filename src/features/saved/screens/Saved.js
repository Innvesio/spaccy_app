import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BackButton } from "../../../components";
import axios from "axios";
import env from "../../../constants/env";
import { AuthContext } from "../../../context/AuthContext";
import { Star1, Trash } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import { SpaceContext } from "../../../context/SpaceContext";

const Saved = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { removeFromSaved } = useContext(SpaceContext);
  const [savedSpaces, setSavedSpaces] = useState([]);
  const [getSpacesIsLoading, setGetSpacesIsLoading] = useState(false);
  navigation.setOptions({
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  const getAllSavedSPaces = () => {
    setGetSpacesIsLoading(true);

    axios
      .get(`${env.API_URL}/venue/space/all/saved?page=${1}&pageSize=${10}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGetSpacesIsLoading(false);
        setSavedSpaces(res.data.data);
      })
      .catch((err) => {
        setGetSpacesIsLoading(false);
      });
  };
  useEffect(() => {
    getAllSavedSPaces();
  }, []);
  const rating = 3;
  const ratinglength = Array(rating).fill();
  const remainingRating = Array(5 - rating).fill();

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getAllSavedSPaces} />
        }
        showsVerticalScrollIndicator={false}
        className="px-3 pt-5"
      >
        {savedSpaces.map((item, index) => (
          <View index={index} className="flex-row space-x-4">
            <View className="bg-slate-400 overflow-hidden h-[100px] w-[100px] rounded-lg">
              <Image
                className="w-full h-full "
                source={{ uri: item.coverPhoto }}
              />
            </View>
            <View className="flex-1 justify-between">
              <View>
                <Text className="font-bold text-lg">{item.spaceName}</Text>
                <Text className="text-sm">{item.address}</Text>
              </View>
              <View className="flex-wrap justify-start flex-row">
                {item.features.map((item, index) => (
                  <View>
                    <View key={index} className="flex-row">
                      <Text className="text-[10px] flex  font-semibold">
                        {item}
                      </Text>
                      <Text>
                        {" "}
                        {/* {index !== item.features?.length - 1 ? "•" : ""}{" "} */}
                      </Text>
                    </View>
                    {/* <View className="flex items-start text-sm">
                      {Array(2)
                        .fill()
                        .map(() => (
                          <Star1 color="#ffaa00" />
                        ))}
                      {remainingRating.length
                        ? remainingRating.map(() => <Star1 color="#ff880055" />)
                        : null}
                      <Text className="text-xs font-semibold ml-2">
                        {rating.toFixed(1)} Rating
                      </Text>
                    </View> */}
                  </View>
                ))}
              </View>
            </View>
            <Pressable
              onPress={() => removeFromSaved(item._id)}
              className="justify-center rounded-r-lg bg-stone-700 px-1"
            >
              <Trash color="white" />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Saved;
