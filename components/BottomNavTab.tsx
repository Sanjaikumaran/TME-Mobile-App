import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../assets/styles/BottomNavTab";

 export default function BottomNavTab({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const [activeTab, setActiveTab] = useState("Home");

  const handlePress = (tab:string) => {
    setActiveTab(tab);
    onTabChange(tab);
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
}

