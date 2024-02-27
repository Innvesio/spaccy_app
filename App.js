import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "./src/screens";
import BottomNavigation from "./src/navigations/BottomNavigation";
import {
  BookingDetails,
  Cart,
  ChatScreen,
  EditProfile,
  FullDetailsScreen,
  HomeScreen,
} from "./src/features";
import { SpaceProvider } from "./src/context/SpaceContext";

// Stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SpaceProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={SignupScreen}
          />
          <Stack.Screen name="FullDetails" component={FullDetailsScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Spaccy" component={HomeScreen} />
          <Stack.Screen name="BookingDetails" component={BookingDetails} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Main"
            component={BottomNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SpaceProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
