import { View, Text, Pressable, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import axios from "axios";
import env from "../../../../../constants/env";
import { LinearGradient } from "expo-linear-gradient";
import { Primarybutton } from "../../../../../components";
import { Modal } from "react-native";
import StarRating from "react-native-star-rating";
import { appColors } from "../../../../../constants/colors";
import { AuthContext } from "../../../../../context/AuthContext";

const ServiceCard = ({ id, type, ownerId, services }) => {
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState({});
  const [isReviewing, setIsReviewing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [review, setReview] = useState({
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    console.log(details);
  }, []);

  const getItem = () => {
    axios
      .get(`${env.API_URL}/${type === "space" ? "space" : "business"}/${id}`)
      .then((res) => {
        console.log(res.data);
        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Add review for this service
  const addReview = () => {
    setIsReviewing(true);

    // Create the data object with the rating, review, and type
    const data = {
      rating: parseInt(review.rating),
      review: review.comment,
      type: services?.filter((service) => service.id === id)[0].type,
    };
    console.log(data);

    // Send a POST request to add the review
    axios
      .post(`${env.API_URL}/review/new/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setModalIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ratingPress = (rating) => {
    setReview((prev) => ({ ...prev, rating: rating }));
  };

  useEffect(() => {
    getItem();
  }, []);
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={modalIsOpen}>
        <Pressable
          onPress={() => setModalIsOpen(false)}
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          className="flex-1 justify-center items-centers p-5"
        >
          <Pressable
            onPress={() => setModalIsOpen(true)}
            className="bg-stone-100 p-3 space-y-3 rounded-lg"
          >
            <View className="flex-row justify-center py-3">
              <StarRating
                fullStarColor="gold"
                halfStarColor="gold"
                disabled={false}
                maxStars={5}
                rating={review.rating}
                starSize={37}
                selectedStar={(rating) => ratingPress(rating)}
                containerStyle={{ gap: 10 }}
              />
            </View>
            <View className="border rounded-md">
              <TextInput
                onChangeText={(val) =>
                  setReview((prev) => ({ ...prev, comment: val }))
                }
                numberOfLines={10}
                multiline={true}
                cursorColor={appColors.primaryColor}
                selectionColor={appColors.primaryColor}
                underlineColorAndroid="transparent"
                className="p-3 border-stone-200"
                placeholder="Add a review"
              />
            </View>
            <View>
              <Primarybutton onPress={addReview} title="Share Feedback!" />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      <Pressable
        onPress={() => setModalIsOpen(true)}
        className="bg-white w-full max-w-[170px] relative object-cover overflow-hidden border border-stone-200  h-[230px] rounded-xl "
      >
        <Image
          className="w-full h-full object-cover absolute rounded-xl"
          source={{
            uri:
              details?._doc?.images?.filter((image) => image.isCoverPhoto)[0]
                ?.url || details?._doc?.images[0]?.url,
          }}
        />
        <LinearGradient
          className="h-full w-full justify-end"
          colors={["#00000000", "#000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 3 }}
        >
          <View className="px-3 justify-end flex-1">
            {type === "space" ? (
              <Text className="text-white text-base font-semibold">
                {details?._doc?.spaceName}
              </Text>
            ) : (
              <Text className="text-white">{details?._doc?.spaceName}</Text>
            )}
            <Text className="text-white">{details?._doc?.businessName}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    </>
  );
};

export default ServiceCard;
