import { View, Text, Image, TouchableOpacity } from "react-native";

import { router } from "expo-router";
import styles from "../../../assets/styles/Login";
import { useEffect, useState } from "react";
import { getDataFromTable } from "@/app/database/database";
export default function App() {
  const [tableData, setTableData] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDataFromTable("users");
      if (response.flag) {
        setTableData(response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Welcome! Login Successfull</Text>
      {tableData.map((data, index) => (
        <View key={index}>
          <Text>
            {data.username} {data.displayName} {data.mobileNumber}{" "}
            {data.emailAddress} {data.password}
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("../");
        }}
      >
        <Text style={styles.buttonText}>Goto Home Page →</Text>
      </TouchableOpacity>
    </View>
  );
}
