import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen, SignupScreen } from "../screens";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  Home,
  Profile,
  SearchNormal,
  ShoppingCart,
  Ticket2,
} from "iconsax-react-native";
import {
  BookingScreen,
  CartScreen,
  ExploreScreen,
  HomeScreen,
  ProfileScreen,
} from "../features";
import { appColors } from "../constants/colors";
import { Platform, View } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState({});
  const notificationListener = useRef({});
  const responseListener = useRef({});

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
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received");
        setNotification(notification);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  console.log("Token: ", expoPushToken);
  console.log(notification);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

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
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "your-project-id",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default BottomNavigation;
