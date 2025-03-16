import { View, Text, Image, TouchableOpacity } from "react-native";

import { router } from "expo-router";
import styles from "../../assets/styles/Login";
export default function App() {
  return (
    
    <View style={styles.container}>
      <View style={styles.gradientBackground}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Welcome!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("./screens/LoginScreen");
        }}
      >
        <Text style={styles.buttonText}>Get Started →</Text>
      </TouchableOpacity>
    </View>
  );
}
