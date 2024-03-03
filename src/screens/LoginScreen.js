import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Lock, Sms } from "iconsax-react-native";
import { CustomInput, Primarybutton } from "../components";
import axios from "axios";
import env from "../constants/env";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const submit = async () => {
    setLoading(true);
    navigation.navigate("Main");
    try {
      const response = await axios.post(`${env.API_URL}/auth/login`, loginData);
      if (response.data) {
        setLoading(false);
        console.log(response.data);
        const jsonValue = JSON.stringify(response.data);
        await AsyncStorage.setItem("user", jsonValue);
        navigation.navigate("Main");
      } else {
        console.log("not working");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.show(err.response ? err.response.data.error : "Could not login", {
        type: "danger",
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 flex justify-center w-full p-[24px]">
        <View className="w-full flex items-center justify-center">
          <Text className="text-2xl font-bold">Welcome to Sapccy</Text>
          <View className="w-full flex items-center justify-center mt-10 p-7 rounded-2xl border border-gray-200 bg-white">
            <View className="w-full flex justify-between items-center  space-y-8">
              <CustomInput
                onChangeText={(val) =>
                  setLoginData((prev) => ({ ...prev, email: val }))
                }
                icon={<Sms color="#504B44" />}
                placeholder="Email"
                label="Email Address"
              />
              <View className="w-full flex items-end gap-2">
                <CustomInput
                  secureTextEntry={showPass}
                  onChangeText={(val) =>
                    setLoginData((prev) => ({ ...prev, password: val }))
                  }
                  icon={<Lock color="#504B44" />}
                  placeholder="Enter Password"
                  label="Password"
                />
                <Text
                  onPress={() => setShowPass(!showPass)}
                  title="Show password"
                  className="font-semibold text-xs"
                >
                  {showPass ? "Show password" : "Hide password"}
                </Text>
              </View>
            </View>
            <View className="mt-10 w-full">
              <Primarybutton
                // disabled={loading}
                onPress={() => submit()}
                title="Login"
              />
            </View>
            <Text className="text-xs mt-5">
              Don't have an account?
              <Text
                onPress={() => navigation.navigate("Signup")}
                className="font-bold"
              >
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
