import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Table from "@/components/Table";

import { MaterialIcons } from "@expo/vector-icons";
import HeaderBar from "@/components/HeaderBar";
import BottomNavTab from "@/components/BottomNavTab";

import { getDataFromTable } from "@/utils/database/database";
import { formatDateTime, getUserId } from "@/utils/helpers";

import styles from "@/assets/styles/MyTransaction";

interface CardViewProps {
  data: any[];
  searchTerm: string;
}
const CardView = ({ data, searchTerm }: CardViewProps) => {
  if (data.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>
          {searchTerm
            ? "No matching results found. Try refining your search."
            : "No transactions available. Add a transaction to get started."}
        </Text>
      </View>
    );
  }

  const [visibleData, setVisibleData] = useState(data.slice(0, 30));
  const [loadedCount, setLoadedCount] = useState(30);

  const loadMore = () => {
    const newCount = loadedCount + 10;
    setVisibleData(data.slice(0, newCount));
    setLoadedCount(newCount);
  };

  return (
    <FlatList
      style={styles.flatList}
      data={visibleData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.title}>S.No: {index + 1}</Text>
            <Text style={styles.title}>Transaction ID: {item.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.dateTime}>
              Date: {formatDateTime(item.date, "date")}
            </Text>
            <Text style={styles.dateTime}>
              Time: {formatDateTime(item.time, "time")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.category}>Category: {item.category}</Text>
            <Text style={styles.subCategory}>
              Sub-Category: {item.subCategory}
            </Text>
          </View>
          <Text style={styles.amount}>
            Amount: ₹ {new Intl.NumberFormat("en-IN").format(item.amount)}
          </Text>
          <Text style={styles.remarks}>Remarks: {item.remarks}</Text>
        </View>
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const MyTransactionScreen = () => {
  const columns = [
    { accessor: "id", label: "Transaction ID" },
    { accessor: "date", label: "Date" },
    { accessor: "time", label: "Time" },
    { accessor: "amount", label: "Amount" },
    { accessor: "category", label: "Category" },
    { accessor: "subCategory", label: "Sub-Category" },
    { accessor: "remarks", label: "Remarks" },
  ];
  
  const [tableData, setTableData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([
    "id",
    "date",
    "time",
    "category",
    "subCategory",
    "amount",
    "remarks",
  ]);
  const getTransactions = async () => {
    const response = await getDataFromTable(
      "Transactions",
      ["*"],
      `userId='${await getUserId()}'`
    );
    if (response.flag) {
      setTableData(response.data);
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);
  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text === "") {
      setFilteredData(tableData);
      return;
    }
    const filtered = tableData.filter((item) =>
      selectedFilters.some((key) =>
        item[key]?.toString().toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <HeaderBar headerText="My Transactions" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="filter-list" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        {/*<Table data={tableData} columns={columns} />*/}
        <CardView
          data={searchTerm === "" ? tableData : filteredData}
          searchTerm={searchTerm}
        />
      </SafeAreaView>

      <BottomNavTab />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Fields to Search:</Text>
            <ScrollView>
              {columns.map((col) => (
                <TouchableOpacity
                  key={col.accessor}
                  style={styles.filterOption}
                  onPress={() => toggleFilter(col.accessor)}
                >
                  <MaterialIcons
                    name={
                      selectedFilters.includes(col.accessor)
                        ? "check-box"
                        : "check-box-outline-blank"
                    }
                    size={24}
                    color="#007bff"
                  />
                  <Text style={styles.filterText}>{col.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const MyTransaction = () => {
  return <MyTransactionScreen />;
};

export default MyTransaction;
