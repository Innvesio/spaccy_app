import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen, SignupScreen } from "../screens";
import * as Location from "expo-location";
import { useEffect } from "react";
import {
  Home,
  Profile,
  SearchNormal,
  ShoppingCart,
  Ticket2,
} from "iconsax-react-native";
import { BookingScreen,  ExploreScreen, HomeScreen, ProfileScreen } from "../features";
import { appColors } from "../constants/colors";
import { View } from "react-native";

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  //   const askForLocation = async () => {
  //    let {status} = await Location.requestForegroundPermissionsAsync();
  //   };
  const startBackgroundTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted") {
      await Location.requestBackgroundPermissionsAsync();
    }
  };

  useEffect(() => {
    startBackgroundTracking();
  }, [Location]);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: (props) => {},
        tabBarIcon: ({ focused, color, size }) => {
          let rn = route.name;
          let icon;

          if (rn === "Spaccy") {
            icon = focused ? (
              <Home variant="Bold" color={appColors.primaryColor} />
            ) : (
              <Home color={appColors.primaryColor} />
            );
          }
          if (rn === "Explore") {
            icon = focused ? (
              <SearchNormal variant="Bold" color={appColors.primaryColor} />
            ) : (
              <SearchNormal color={appColors.primaryColor} />
            );
          }
          if (rn === "Bookings") {
            icon = focused ? (
              <Ticket2 color={appColors.primaryColor} variant="Bold" />
            ) : (
              <Ticket2 color={appColors.primaryColor} />
            );
          }
          if (rn === "Cart") {
            icon = focused ? (
              <ShoppingCart variant="Bold" color={appColors.primaryColor} />
            ) : (
              <ShoppingCart color={appColors.primaryColor} />
            );
          }
          if (rn === "Profile") {
            icon = focused ? (
              <Profile variant="Bold" color={appColors.primaryColor} />
            ) : (
              <Profile color={appColors.primaryColor} />
            );
          }

          return icon;
        },
      })}
    >
      <Tab.Screen name="Spaccy" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Cart" component={SignupScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
