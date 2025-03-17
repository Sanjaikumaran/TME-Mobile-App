import { View, Text } from "react-native";

import LogoutIcon from "@/assets/icons/LogoutIcon";
import ThreeBarIcon from "@/assets/icons/ThreeBarIcon";

import styles from "@/assets/styles/HeaderBar";
import { PLACEHOLDER } from "@/app/variable";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <ThreeBarIcon onPress={() => console.log("logOut")} color="#fff" />
        <Text style={styles.title}>{PLACEHOLDER.trackMEase}</Text>
        <LogoutIcon onPress={() => console.log("logOut")} color="#fff" />
      </View>
      <View style={styles.menuTab}></View>
    </View>
  );
}
