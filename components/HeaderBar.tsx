import { useState, useRef, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { getDataFromTable } from "@/utils/database/database";

import { PLACEHOLDER } from "@/constants/variable";

import LogoutIcon from "@/assets/icons/LogoutIcon";
import ThreeBarIcon from "@/assets/icons/ThreeBarIcon";
import CloseIcon from "@/assets/icons/CloseIcon";

import styles from "@/assets/styles/HeaderBar";

interface HeaderBarProps {
  headerText?: string;
}
const HeaderBar = ({ headerText = PLACEHOLDER.trackMEase }: HeaderBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDataFromTable("users");
      console.log(res);
    };
    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    Animated.timing(widthAnim, {
      toValue: isMenuOpen ? 0 : 250,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      router.push("./LoginScreen");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          {isMenuOpen ? (
            <CloseIcon onPress={toggleMenu} color="#fff" />
          ) : (
            <ThreeBarIcon onPress={toggleMenu} color="#fff" />
          )}

          <Text style={styles.title}>{headerText}</Text>
          <LogoutIcon onPress={logOut} color="#fff" />
        </View>
      </View>
      <Animated.View style={[{ width: widthAnim }, styles.menuTab]}>
        {}
      </Animated.View>
    </>
  );
};
export default HeaderBar;
