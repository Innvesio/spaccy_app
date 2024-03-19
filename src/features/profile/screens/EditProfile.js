import {
  Button,
  Image,
  View,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState, useTransition } from "react";
import {
  BackButton,
  CustomInput,
  Primarybutton,
  ProfilePicture,
} from "../../../components";
import { Edit2 } from "iconsax-react-native";
import { appColors } from "../../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import env from "../../../constants/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

const EditProfile = ({ navigation }) => {
  const toast = useToast();
  const { user, setUser, userEditableInfo, setUserEditableInfo } =
    useContext(AuthContext);
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserEditableInfo({
      firstName: user.data.firstName,
      lastName: user.data.lastName,
      email: user.data.email,
      profilePhoto: image,
    });
  }, []);
  navigation.setOptions({
    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const file = result.assets[0];

    if (!result.canceled) {
      setImage(file);
    }
  };

  const updateHandler = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "eketcwyc");

    console.log(formData._parts[0]);

    // axios
    //   .post(`https://api.cloudinary.com/v1_1/doomrxmb0/upload`, formData)
    //   .then((res) => {
    //     console.log(res.data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //     toast.show(
    //       err.response ? err.response.data.error : "Could not update account",
    //       {
    //         type: "danger",
    //       }
    //     );
    //     console.log(err);
    //   });
  };

  // upload image variable
  // const imageReq = {
  //   profilePhoto: [
  //     {
  //       id: data.public_url,
  //       url: data.secure_url,
  //     },
  //   ],
  // };

  // if (response.ok) {
  //   try {
  //     const response = await fetch(
  //       `${env.API_URL}/auth/updateAuth/${user?.data._id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${user?.token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(imageReq),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log("successful", data);
  //     if (response.ok) {
  //       setLoading(false);
  //       toast.show("Account has been updated!", {
  //         type: "success",
  //       });
  //       const jsonValue = JSON.stringify(response.data);
  //       await AsyncStorage.setItem("user", jsonValue);
  //       setUser(response.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <View className="bg-white  flex-1">
      <ScrollView
        alwaysBounceVertical
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="w-full flex-1  flex items-center">
          <View className="p-[24px] w-full">
            <View className="w-40 h-40 m-auto relative ">
              <ProfilePicture image={image?.uri} firstLetter={"S"} />
              <Pressable
                onPress={() => pickImage()}
                className="p-3 rounded-full absolute bg-gray-200 bottom-3 right-0"
              >
                <Edit2 size={20} color={appColors.primaryColor} />
              </Pressable>
            </View>
          </View>
          <View className="w-full  space-y-4 mt-12 px-[24px]">
            {/* FirstName */}
            <View>
              <CustomInput
                onChangeText={(val) =>
                  setUserEditableInfo((prev) => ({ ...prev, firstName: val }))
                }
                value={userEditableInfo.firstName}
                placeholder="First Name"
                label="Full Name"
              />
            </View>
            {/* Fullname */}
            <View>
              <CustomInput
                onChangeText={(val) =>
                  setUserEditableInfo((prev) => ({ ...prev, lastName: val }))
                }
                value={userEditableInfo.lastName}
                placeholder="Last Name"
                label="Last Name"
              />
            </View>
            {/* Fullname */}
            <View>
              <CustomInput
                onChangeText={(val) =>
                  setUserEditableInfo((prev) => ({ ...prev, email: val }))
                }
                value={userEditableInfo.email}
                placeholder="example@gmail.com"
                label="Email Address"
              />
            </View>
            {/* Button */}
          </View>
          <View className=" h-full mt-20 px-[24px] flex justify-end flex-1 w-full">
            <Primarybutton
              disabled={loading}
              onPress={updateHandler}
              title="Save Changes"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
