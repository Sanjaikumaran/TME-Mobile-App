import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system"; // remove

import { insertIntoTable } from "@/utils/database/database";
import { PLACEHOLDER } from "@/constants/variable";

import styles from "@/assets/styles/LoginSignup";

const dbName = "auth.db";
const dbPath = FileSystem.documentDirectory + "SQLite/" + dbName;
const deleteDatabase = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(dbPath);
      console.log(dbPath);

      console.log("✅ Database file deleted successfully!");
    } else {
      console.log("⚠️ Database file does not exist.");
    }
  } catch (error) {
    console.error("❌ Error deleting database:", error);
  }
};

//deleteDatabase();
const SignupScreen = () => {
  const [username, setUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [reNewPassword, setReNewPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");

  const toast = useToast();
  const router = useRouter();

  const handleSignup = async () => {
    Keyboard.dismiss();

    toast.hideAll();

    if (
      username.trim() === "" ||
      newPassword.trim() === "" ||
      reNewPassword.trim() === "" ||
      displayName.trim() === "" ||
      mobileNumber.trim() === "" ||
      emailAddress.trim() === ""
    ) {
      toast.show("Please fill all the mandatory fields", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      return;
    }

    if (newPassword !== reNewPassword) {
      toast.show("Passwords do not match", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      return;
    }
    if (mobileNumber.trim().length < 10) {
      toast.show("Please provide valid mobile number", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      return;
    }
    const response = await insertIntoTable("Users", [
      {
        username: username,
        password: btoa(newPassword),
        displayName: displayName,
        mobileNumber: mobileNumber,
        emailAddress: emailAddress,
        userId: emailAddress + mobileNumber,
        isAdmin: false,
      },
    ]);

    if (response.flag) {
      toast.show("Account created successfully!", {
        type: "success",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      setTimeout(() => {
        router.push("./LoginScreen");
      }, 400);
    } else {
      if (response.message.includes("UNIQUE constraint failed")) {
        toast.show("Username already exists", {
          type: "warning",
          placement: "bottom",
          duration: 4000,
          animationType: "slide-in",
          style: { marginLeft: 20 },
        });
      } else {
        toast.show("Uncaught Error: " + response.message, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          animationType: "slide-in",
          style: { marginLeft: 20 },
        });
      }

      return;
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

      <Text style={styles.title}>Welcome! Create Account</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.username + PLACEHOLDER.mandatoryStar}
            value={username}
            onChangeText={(text) => setUsername(text.trim())}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🔒</Text>

          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.password + PLACEHOLDER.mandatoryStar}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text.trim())}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🔑</Text>
          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.rePassword + PLACEHOLDER.mandatoryStar}
            value={reNewPassword}
            onChangeText={(text) => setReNewPassword(text.trim())}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>📝</Text>
          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.displayName + PLACEHOLDER.mandatoryStar}
            value={displayName}
            onChangeText={(text) => setDisplayName(text.trimStart())}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>📱</Text>
          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.mobileNumber + PLACEHOLDER.mandatoryStar}
            value={mobileNumber}
            keyboardType="numeric"
            onChangeText={(text) => {
              if (text.trim().length === 11) return;
              setMobileNumber(text.trim());
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>📧</Text>
          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.emailAddress + PLACEHOLDER.mandatoryStar}
            value={emailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setEmailAddress(text.trim())}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <Text onPress={() => router.push("./LoginScreen")}>
          <Text style={styles.questionText}>Already have account? &nbsp;</Text>
          <Text style={styles.boldText}>Log In</Text>
        </Text>
      </ScrollView>
    </View>
  );
};
const SignUp = () => {
  return (
    <ToastProvider>
      <SignupScreen />
    </ToastProvider>
  );
};
export default SignUp;
