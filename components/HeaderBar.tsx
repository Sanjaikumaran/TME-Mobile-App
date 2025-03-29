import { useState, useRef, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";

import { getDataFromTable } from "@/app/database/database";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import ThreeBarIcon from "@/assets/icons/ThreeBarIcon";
import CloseIcon from "@/assets/icons/CloseIcon";

import styles from "@/assets/styles/HeaderBar";
import { PLACEHOLDER } from "@/constants/variable";

export default function App() {
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

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        {isMenuOpen ? (
          <CloseIcon onPress={toggleMenu} color="#fff" />
        ) : (
          <ThreeBarIcon onPress={toggleMenu} color="#fff" />
        )}

        <Text style={styles.title}>{PLACEHOLDER.trackMEase}</Text>
        <LogoutIcon onPress={() => console.log("logOut")} color="#fff" />
      </View>

      <Animated.View
        style={[{ width: widthAnim }, styles.menuTab]}
      >
        {}
      </Animated.View>
    </View>
  );
}
