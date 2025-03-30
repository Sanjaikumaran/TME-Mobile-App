import { View } from "react-native";

import HeaderBar from "@/components/HeaderBar";
import BottomNavTab from "@/components/BottomNavTab";

import styles from "@/assets/styles/HeaderBar";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <View></View>
      <BottomNavTab />
    </View>
  );
};
export default HomeScreen;
