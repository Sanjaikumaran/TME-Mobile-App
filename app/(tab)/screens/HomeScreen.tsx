import { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import HeaderBar from "@/components/HeaderBar";
import BottomNavTab from "@/components/BottomNavTab";

import styles from "@/assets/styles/FilterComponent";
import useFilter from "@/components/FilterComponent";
export interface FilterType {
  mode: string;
  from?: Date | string;
  to?: Date | string;
  value?: string;
}
const HomeScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const { FilterComponent} = useFilter();

  return (
    <View style={styles.container}>
      <HeaderBar />
      <FilterComponent setData={setData} />
      <BottomNavTab />
    </View>
  );
};
export default HomeScreen;
