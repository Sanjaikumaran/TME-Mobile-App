import { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import { router } from "expo-router";

import { getDataFromTable } from "@/utils/database/database";

import { PLACEHOLDER } from "@/constants/variable";

import styles from "@/assets/styles/LoginSignup";

const LoginScreen = () => {
  const [username, setUsername] = useState("Hi");
  const [userPassword, setPassword] = useState("Hi");

  const toast = useToast();

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!username) {
      toast.show("Please enter username", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      return;
    }
    if (!userPassword) {
      toast.show("Please enter password", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      return;
    }
    const response = await getDataFromTable(
      "users",
      ["username", "password"],
      `username='${username}'`
    );

    if (response.flag && response.data.length > 0) {
      const data = response.data[0];

      if (btoa(userPassword) === data.password) {
        delete data.password;
        try {
          await AsyncStorage.setItem("LoginInfo", JSON.stringify(data));

          toast.show("Login Successful!", {
            type: "success",
            placement: "bottom",
            duration: 4000,
            animationType: "slide-in",
            style: { marginLeft: 20 },
          });

          router.push("./HomeScreen");
        } catch (error) {}
      } else {
        toast.show("Invalid Credentials", {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          animationType: "slide-in",
          style: { marginLeft: 20 },
        });
      }
    } else {
      toast.show("Invalid Credentials", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Welcome! Login</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.username}
            value={username}
            onChangeText={(text) => setUsername(text.trim())}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🔑</Text>
          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.password}
            value={userPassword}
            onChangeText={(text) => setPassword(text.trim())}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <Text onPress={() => router.push("./SignupScreen")}>
          <Text style={styles.questionText}> Don't have account? &nbsp;</Text>
          <Text style={styles.boldText}>Sign Up</Text>
        </Text>
      </ScrollView>
    </View>
  );
};
const Login = () => {
  return (
    <ToastProvider>
      <LoginScreen />
    </ToastProvider>
  );
};
export default Login;
