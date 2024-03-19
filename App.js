import { StyleSheet, Text, View, Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "./src/screens";
import BottomNavigation from "./src/navigations/BottomNavigation";
import {
  BookingDetails,
  ChatsScreen,
  EditProfile,
  EnquireScreen,
  EnquireVendorScreen,
  FullDetailsScreen,
  HomeScreen,
  MessagesScreen,
  NotificationScreen,
  SavedScreen,
  SupportScreen,
  VendorFullDetailsScreen,
} from "./src/features";
import { SpaceProvider } from "./src/context/SpaceContext";
import { ChatProvider } from "./src/context/ChatContext";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider } from "./src/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BookingProvider } from "./src/context/BookingContext";
import { CartProvider } from "./src/context/CartContext";
import { NotificationProvider } from "./src/context/NotificationContext";
import * as Notifications from "expo-notifications";
import Terms from "./src/screens/Terms";
import DeleteScreen from "./src/screens/DeleteScreen";

// Stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <SpaceProvider>
          <BookingProvider>
            <ChatProvider>
              <CartProvider>
                <NotificationProvider>
                  <BottomSheetModalProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                      <NavigationContainer>
                        <Stack.Navigator
                          screenOptions={{ headerShadowVisible: false }}
                        >
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
                          <Stack.Screen
                            options={{ headerShown: false }}
                            name="DeleteScreen"
                            component={DeleteScreen}
                          />
                          <Stack.Screen
                            name="FullDetails"
                            component={FullDetailsScreen}
                          />
                          <Stack.Screen
                            name="VendorFullDetailsScreen"
                            component={VendorFullDetailsScreen}
                          />
                          <Stack.Screen
                            name="Enquire"
                            component={EnquireScreen}
                          />
                          <Stack.Screen
                            name="EnquireVendor"
                            component={EnquireVendorScreen}
                          />
                          <Stack.Screen
                            name="EditProfile"
                            component={EditProfile}
                          />
                          <Stack.Screen name="Terms" component={Terms} />
                          <Stack.Screen
                            name="Support"
                            component={SupportScreen}
                          />
                          <Stack.Screen name="Saved" component={SavedScreen} />
                          {/* <Stack.Screen name="Cart" component={Cart} /> */}
                          <Stack.Screen name="Spaccy" component={HomeScreen} />
                          <Stack.Screen
                            name="BookingDetails"
                            component={BookingDetails}
                          />
                          <Stack.Screen
                            name="Messages"
                            component={MessagesScreen}
                          />
                          <Stack.Screen name="Chats" component={ChatsScreen} />
                          <Stack.Screen
                            name="Notifications"
                            component={NotificationScreen}
                          />

                          <Stack.Screen
                            options={{ headerShown: false }}
                            name="Main"
                            component={BottomNavigation}
                          />
                        </Stack.Navigator>
                      </NavigationContainer>
                    </GestureHandlerRootView>
                  </BottomSheetModalProvider>
                </NotificationProvider>
              </CartProvider>
            </ChatProvider>
          </BookingProvider>
        </SpaceProvider>
      </AuthProvider>
    </ToastProvider>
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
