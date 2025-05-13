import { useState } from "react";
import { Modal, Text, TouchableOpacity, View, ScrollView } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import HeaderBar from "@/components/HeaderBar";
import BottomNavTab from "@/components/BottomNavTab";
import FilterFold from "@/components/FilterFold";

import styles from "@/assets/styles/Home";
import Dropdown from "@/components/Dropdown";
import { InputType } from "@/components/FilterFold";
import { Pressable } from "react-native";

const HomeScreen = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([
    "id",
    "date",
    "time",
    "category",
    "subCategory",
    "amount",
    "remarks",
  ]);
  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };
  const columns = [
    { accessor: "date", inputType: "date", label: "Date" },
    { accessor: "time", inputType: "time", label: "Time" },
    { accessor: "amount", inputType: "numeric", label: "Amount" },
    { accessor: "category", inputType: "multiselect", label: "Category" },
    { accessor: "subCategory", inputType: "multiselect", label: "Sub-Category" },
  ];
  return (
    <View style={styles.container}>
      <HeaderBar />

      <TouchableOpacity
        onPress={() => setShowFilterModal(true)}
        style={{
          padding: 10,
          margin: "auto",
          marginTop: 10,
          backgroundColor: "green",
        }}
      >
        <Text>Apply Filter</Text>
      </TouchableOpacity>
      <View></View>
      <Modal visible={showFilterModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.modalTitle}>Select Filters:</Text>
              <MaterialIcons
                name="close"
                size={24}
                color="#007bff"
                onPress={() => setShowFilterModal(false)}
              />
            </View>
            <ScrollView>
              {columns.map((col) => (
                <View key={col.accessor}>
                  <Pressable
                    style={styles.filterOption}
                    // onPress={() => toggleFilter(col.accessor)}
                  >
                    <FilterFold label={col.label} inputType={col.inputType as InputType} isRangeFilter={true}/>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.closeButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <BottomNavTab />
    </View>
  );
};
export default HomeScreen;
