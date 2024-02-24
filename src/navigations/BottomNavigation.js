import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen, SignupScreen } from "../screens";
import * as Location from "expo-location";
import { useEffect } from "react";
import { Home, Profile, SearchNormal, Ticket2 } from "iconsax-react-native";
import { ProfileScreen } from "../features";

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

          if (rn === "Home") {
            icon = focused ? (
              <Home variant="Bold" color="#44403C" />
            ) : (
              <Home color="#44403C" />
            );
          }
          if (rn === "Explore") {
            icon = focused ? (
              <SearchNormal variant="Bold" color="#44403C" />
            ) : (
              <SearchNormal color="#44403C" />
            );
          }
          if (rn === "Bookings") {
            icon = focused ? (
              <Ticket2 variant="Bold" color="#44403C" />
            ) : (
              <Ticket2 color="#44403C" />
            );
          }
          if (rn === "Profile") {
            icon = focused ? (
              <Profile variant="Bold" color="#44403C" />
            ) : (
              <Profile color="#44403C" />
            );
          }

          return icon;
        },
      })}
    >
      <Tab.Screen name="Home" component={LoginScreen} />
      <Tab.Screen name="Explore" component={SignupScreen} />
      <Tab.Screen name="Bookings" component={SignupScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
