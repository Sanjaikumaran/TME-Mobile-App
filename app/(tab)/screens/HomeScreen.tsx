import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { getDataFromTable } from "@/app/database/database";

import BottomNavTab from "@/components/BottomNavTab";
import styles from "@/assets/styles/HeaderBar";
import HeaderBar from "@/components/HeaderBar";

export default function App() {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <BottomNavTab />
    </View>
  );
}
