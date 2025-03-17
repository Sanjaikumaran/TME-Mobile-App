import { View, Text, Image, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import styles from "@/assets/styles/LoginSignup";

import { PLACEHOLDER } from "../variable";

export default function App() {
  return (
    
    <View style={styles.container}>
      <View style={styles.gradientBackground}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>{PLACEHOLDER.welcome}!</Text>

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
