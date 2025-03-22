import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ToastProvider, useToast } from "react-native-toast-notifications";

import BottomNavTab from "@/components/BottomNavTab";
import CloseIcon from "@/assets/icons/CloseIcon";
import DownIcon from "@/assets/icons/ChevronDownIcon";

import { PLACEHOLDER, LABEL } from "@/constants/variable";
import styles from "@/assets/styles/AddTransaction";

const AddTransactionScreen = () => {
  const flatListRef = useRef<FlatList<any> | null>(null);

  const toast = useToast();

  const [transactions, setTransactions] = useState([
    {
      id: Date.now(),
      date: new Date(),
      time: new Date(),
      amount: "",
      category: "",
      remarks: "",
    },
  ]);
  const [showPicker, setShowPicker] = useState<{
    flag: boolean;
    mode: "date" | "time";
    id: number | null;
  }>({
    flag: false,
    mode: "date",
    id: null,
  });
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
    setIsAtBottom(isBottom);
  };
  const formatDateTime = (date: Date, mode: "date" | "time"): string => {
    return mode === "date"
      ? `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`
      : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleDateTimeChange = (
    selectedDate: Date,
    mode: "date" | "time",
    id: number
  ) => {
    setShowPicker({ flag: false, mode, id: null });
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, [mode]: selectedDate } : t
      )
    );
  };

  const addTransactionContainer = () => {
    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: new Date(),
        time: new Date(),
        amount: "",
        category: "",
        remarks: "",
      },
    ]);
    toast.hideAll();
    toast.show("Transaction form added!", {
      type: "display",
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
      style: { marginLeft: 20 },
    });
  };

  const deleteTransaction = (id: number) => {
    toast.hideAll();
    const deleteIndex = transactions.findIndex((t) => t.id === id);

    setTransactions(transactions.filter((t) => t.id !== id));

    toast.show(`Transaction ${deleteIndex + 1} removed!`, {
      type: "display",
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
      style: { marginLeft: 20 },
    });
  };

  const addTransaction = () => {
    const emptyIndex = transactions.findIndex(
      (t) => t.amount === "" || t.category === ""
    );
    toast.hideAll();

    if (emptyIndex !== -1) {
      toast.show(`Please fill all fields in Transaction ${emptyIndex + 1}!`, {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      return;
    }

    console.log(transactions);
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          ref={flatListRef}
          onScroll={handleScroll}
          style={styles.flatList}
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.addTransactionContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.transactionHeader}>
                  Transaction {index + 1}
                </Text>
                {transactions.length > 1 && (
                  <CloseIcon
                    onPress={() => deleteTransaction(item.id)}
                    color="black"
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{LABEL.transactionDate}</Text>
                <View style={styles.input}>
                  <Text>{formatDateTime(item.date, "date")}</Text>
                  <Text
                    onPress={() =>
                      setShowPicker({ flag: true, mode: "date", id: item.id })
                    }
                  >
                    📅
                  </Text>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{LABEL.transactionTime}</Text>
                <View style={styles.input}>
                  <Text>{formatDateTime(item.time, "time")}</Text>
                  <Text
                    onPress={() =>
                      setShowPicker({ flag: true, mode: "time", id: item.id })
                    }
                  >
                    ⏰
                  </Text>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{LABEL.amount}</Text>

                <TextInput
                  style={styles.input}
                  placeholder={PLACEHOLDER.amount + PLACEHOLDER.mandatoryStar}
                  value={item.amount}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTransactions(
                      transactions.map((t) =>
                        t.id === item.id ? { ...t, amount: text } : t
                      )
                    )
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{LABEL.category}</Text>

                <TextInput
                  style={styles.input}
                  placeholder={PLACEHOLDER.category + PLACEHOLDER.mandatoryStar}
                  value={item.category}
                  onChangeText={(text) =>
                    setTransactions(
                      transactions.map((t) =>
                        t.id === item.id ? { ...t, category: text } : t
                      )
                    )
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{LABEL.remarks}</Text>

                <TextInput
                  style={[styles.textArea, styles.input]}
                  placeholder={PLACEHOLDER.remarks + PLACEHOLDER.mandatoryStar}
                  value={item.remarks}
                  multiline
                  numberOfLines={4}
                  onChangeText={(text) =>
                    setTransactions(
                      transactions.map((t) =>
                        t.id === item.id ? { ...t, remarks: text } : t
                      )
                    )
                  }
                />
              </View>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.flatListFooter}>
              <TouchableOpacity style={styles.button} onPress={addTransaction}>
                <Text style={styles.buttonText}>Add Transaction</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addTransactionBtn}
                onPress={addTransactionContainer}
              >
                <Text style={styles.addTransactionBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
      {transactions.length > 1 && (
        <TouchableOpacity style={styles.goToBottomBtn}>
          <DownIcon
            onPress={() => {
              isAtBottom
                ? flatListRef.current?.scrollToIndex({
                    animated: true,
                    index: 0,
                  })
                : flatListRef.current?.scrollToEnd({ animated: true });
            }}
            size={13}
            color="black"
            direction={isAtBottom ? "up" : "down"}
          />
        </TouchableOpacity>
      )}

      <BottomNavTab />
      {showPicker.flag && showPicker.id !== null && (
        <DateTimePicker
          value={
            transactions.find((t) => t.id === showPicker.id)?.[
              showPicker.mode
            ] || new Date()
          }
          mode={showPicker.mode}
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate)
              handleDateTimeChange(
                selectedDate,
                showPicker.mode,
                showPicker.id!
              );
          }}
        />
      )}
    </View>
  );
};
const AddTransaction = () => {
  return (
    <ToastProvider>
      <AddTransactionScreen />
    </ToastProvider>
  );
};
export default AddTransaction;
