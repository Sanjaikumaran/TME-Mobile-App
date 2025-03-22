import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import HeaderBar from "@/components/HeaderBar";
import BottomNavTab from "@/components/BottomNavTab";

import { PLACEHOLDER ,LABEL} from "@/constants/variable";

import styles from "@/assets/styles/AddTransaction";

export default function App() {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showPicker, setShowPicker] = useState({
    flag: false,
    mode: "date",
  });
  const formatDateTime = (date: Date, mode: string): string => {
    if (mode === "date") {
      return `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
    } else if (mode === "time") {
      return `${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    return "";
  };
  const handleDateTimeChange = (value: Date, mode: string) => {
    setShowPicker({ flag: false, mode: mode });
    if (value && mode === "date") {
      setDate(value);
    } else if (value && mode === "time") {
      setTime(value);
    }
  };
  const addTransaction = async () => {
    const data = {
      date,
      time,
      amount,
      category,
      remarks
    };

    console.log(data);
  };
  return (
    <View style={styles.container}>
      {/* <HeaderBar /> */}
      <View style={styles.addTransactionContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>{LABEL.transactionDate}</Text>
          <View style={styles.input}>
            <Text>{formatDateTime(date, "date")}</Text>
            <Text onPress={() => setShowPicker({ flag: true, mode: "date" })}>
              📅
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>{LABEL.transactionTime}</Text>

          <View style={styles.input}>
            <Text>{formatDateTime(time, "time")}</Text>
            <Text onPress={() => setShowPicker({ flag: true, mode: "time" })}>
              📅
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>{LABEL.amount}</Text>
          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.amount+PLACEHOLDER.mandatoryStar}
            value={amount}
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text.trim())}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>{LABEL.category}</Text>
          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER.category+PLACEHOLDER.mandatoryStar}
            value={category}
            onChangeText={(text) => setCategory(text.trim())}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>{LABEL.remarks}</Text>
          <TextInput
          style={[styles.textArea, styles.input]}

            placeholder={PLACEHOLDER.remarks+PLACEHOLDER.mandatoryStar}
            value={remarks}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setRemarks(text)}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={addTransaction}>
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
      <BottomNavTab />
      {showPicker.flag && (
        <DateTimePicker
          value={date}
          mode={showPicker.mode as "date" | "time"}
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              handleDateTimeChange(selectedDate, showPicker.mode);
            }
          }}
        />
      )}
    </View>
  );
}
