import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router, usePathname } from "expo-router";

import styles from "@/assets/styles/BottomNavTab";

const BottomNavTab = () => {
  const pathname = usePathname();
  const getActiveTab = () => {
    switch (pathname.split("/").pop()) {
      case "HomeScreen":
        return "Home";
      case "MyTransactionsScreen":
        return "My Transactions";
      case "AddTransactionScreen":
        return "Add Transaction";
      case "SettingsScreen":
        return "Settings";
      default:
        return "Home";
    }
  };

  const activeTab = getActiveTab();

  const handlePress = (tab: string) => {
    router.push(`./${tab.replace(" ", "")}Screen`);
  };

  return (
    <View style={styles.container}>
      {["Home", "My Transactions", "Add Transaction", "Settings"].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => handlePress(tab)}
        >
          <Text style={[styles.text, activeTab === tab && styles.activeText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavTab;
