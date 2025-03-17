import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { getDataFromTable } from "@/app/database/database";

import BottomNavTab from "@/components/BottomNavTab";
import styles from "@/assets/styles/HeaderBar";
import HeaderBar from "@/components/HeaderBar";

export default function App() {
  return (
    <View style={styles.container}>
      <HeaderBar />

      <BottomNavTab onTabChange={(tab: string) => console.log(tab)} />
    </View>
  );
}
