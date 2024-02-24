import { View, Text, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import React, { useState } from "react";
import { Lock, Sms } from "iconsax-react-native";
import { CustomInput, Primarybutton } from "../components";

const Login = ({navigation}) => {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 flex justify-center w-full p-[24px]">
        <View className="w-full flex items-center justify-center">
          <Text className="text-2xl font-bold">Welcome to Sapccy</Text>
          <View className="w-full flex items-center justify-center mt-10 p-7 rounded-2xl border border-gray-200 bg-white">
            <View className="w-full flex justify-between items-center  space-y-8">
              <CustomInput
                icon={<Sms color="#504B44" />}
                placeholder="Email"
                label="Email Address"
              />
              <View className="w-full flex items-end gap-2">
                <CustomInput
                  icon={<Lock color="#504B44" />}
                  placeholder="Enter Password"
                  label="Password"
                />
                <Text className="font-semibold text-xs">Show password</Text>
              </View>
            </View>
            <View className="mt-10 w-full">
              <Primarybutton onPress={() => navigation.navigate("Home")} title="Login" />
            </View>
            <Text className="text-xs mt-5">
              Don't have an account?
              <Text onPress={() => navigation.navigate("Signup")} className="font-bold">
                {" "}
                Sign up here
              </Text>
            </Text>
            <Text className="text-xs font-bold mt-5">Forgot password?</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
