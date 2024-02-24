import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Lock, Profile, Sms } from "iconsax-react-native";
import { CustomInput, Primarybutton } from "../components";
import CheckBox from "expo-checkbox";
import {  SafeAreaView } from "react-native";

const Signup = ({navigation}) => {
  const [terms, setTerms] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState("password");

  const handleChange = (e) => {
    setLoginData((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value };
    });
  };
  return (
    <SafeAreaView className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 flex justify-center w-full p-[24px] ">
          <ScrollView
            alwaysBounceVertical
            showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
            contentInsetAdjustmentBehavior="automatic"
            automaticallyAdjustKeyboardInsets={true}
          >
            <View className="w-full flex items-center justify-center">
              <Text className="text-2xl text-center font-bold">
                Join Spaccy – Where Event Spaces Awaits Discovery
              </Text>
              <Text className="text-center text-stone-900 mt-2 text-sm font-medium">
                Create your Spaccy account and uncover a world of simplified
                event Services
              </Text>
              <View className="w-full flex items-center justify-center mt-10 p-7 rounded-2xl border border-gray-200 bg-white">
                <View className="w-full flex justify-between items-center  space-y-5">
                  <CustomInput
                    icon={<Profile color="#504B44" />}
                    placeholder="John"
                    label="First Name"
                  />
                  <View className="w-full">
                    <CustomInput
                      icon={<Profile color="#504B44" />}
                      placeholder="Deo"
                      label="Last Name"
                    />
                  </View>
                  <View className="w-full">
                    <CustomInput
                      icon={<Sms color="#504B44" />}
                      placeholder="Email"
                      label="Email Address"
                    />
                  </View>
                  <View className="w-full flex items-end gap-2">
                    <CustomInput
                      icon={<Lock color="#504B44" />}
                      placeholder="Enter Password"
                    />
                    <Text className="font-semibold text-xs">Show password</Text>
                  </View>

                  <View className="w-full flex items-end gap-2">
                    <CustomInput
                      icon={<Lock color="#504B44" />}
                      placeholder="Confirm Password"
                    />
                  </View>
                </View>
                {/* terms */}
                <View className="flex flex-row w-full mt-10">
                  <View className="h-full">
                    <CheckBox
                      value={terms}
                      onValueChange={() => setTerms(!terms)}
                      // style={styles.checkbox}
                    />
                  </View>
                  <View className="text-xs ml-2 h-full">
                    <Text>
                      I have read, accepted and agreed to the
                      <Text href="/signup" className="font-bold underline">
                      {" "}
                      Terms and Conditions and Privacy Policy.
                    </Text>
                    </Text>
                  </View>
                </View>
                {/* End of Terms */}
                <View className="mt-5 w-full">
                  <Primarybutton title="Login" />
                </View>
                <Text className="text-xs mt-5">
                  Already have an account?
                  <Text onPress={() => navigation.navigate("Login")} className="font-bold">
                  {" "}
                  Log in here
                </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Signup;
