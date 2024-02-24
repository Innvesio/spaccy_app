import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MyStatusBar = ({ backgroundColor, barStyle = "dark-content" }) => {
  const insets = useSafeAreaInsets();
  return (
    <View sstyle={{ height: insets.top, backgroundColor }} >
      <StatusBar
      translucent
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

export default MyStatusBar;
