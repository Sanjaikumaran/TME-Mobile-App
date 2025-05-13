import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ToastProvider, useToast } from "react-native-toast-notifications";

import HeaderBar from "@/components/HeaderBar";
import BottomNavTab from "@/components/BottomNavTab";
import Dropdown from "@/components/Dropdown";

import { insertIntoTable, getDataFromTable } from "@/utils/database/database";
import { formatDateTime, getUserId } from "@/utils/helpers";

import { PLACEHOLDER, LABEL } from "@/constants/variable";

import CloseIcon from "@/assets/icons/CloseIcon";
import DownIcon from "@/assets/icons/ChevronDownIcon";

import styles from "@/assets/styles/AddTransaction";

const AddTransactionScreen = () => {
  const flatListRef = useRef<FlatList<any> | null>(null);

  const toast = useToast();

  const [transactions, setTransactions] = useState([
    {
      id: `${Date.now()}${Math.random().toString(36).substring(2, 15)}`,
      date: new Date(),
      time: new Date(),
      amount: "",
      category: "",
      subCategory: "",
      remarks: "",
    },
  ]);
  const [showPicker, setShowPicker] = useState<{
    flag: boolean;
    mode: "date" | "time";
    id: string;
  }>({
    flag: false,
    mode: "date",
    id: "",
  });
  const [isAtBottom, setIsAtBottom] = useState(true);

  const [categories, setCategories] = useState<Array<string>>([]);
  const [subCategories, setSubCategories] = useState<Array<string>>([]);

  const getTransactions = async () => {
    const response = await getDataFromTable(
      "Transactions",
      ["category", "subCategory"],
      `userId='${await getUserId()}'`
    );
    if (response.flag) {
      const categories = Array.from(
        new Set(response.data.map((t) => t.category))
      );
      const subCategories = Array.from(
        new Set(response.data.map((t) => t.subCategory))
      );
      setCategories(categories);
      setSubCategories(subCategories);
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);
  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
    setIsAtBottom(isBottom);
  };

  const handleDateTimeChange = (
    selectedDate: Date,
    mode: "date" | "time",
    id: string
  ) => {
    setShowPicker({ flag: false, mode, id: "" });
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
        id: `${Date.now()}${Math.random().toString(36).substring(2, 15)}`,
        date: new Date(),
        time: new Date(),
        amount: "",
        category: "",
        subCategory: "",
        remarks: "",
      },
    ]);
    toast.hideAll();
    toast.show("Transaction form added!", {
      type: "display",
      placement: "bottom",
      duration: 1500,
      animationType: "slide-in",
      style: { marginLeft: 20 },
    });
  };

  const deleteTransaction = (id: string) => {
    toast.hideAll();
    const deleteIndex = transactions.findIndex((t) => t.id === id);

    setTransactions(transactions.filter((t) => t.id !== id));

    toast.show(`Transaction ${deleteIndex + 1} removed!`, {
      type: "display",
      placement: "bottom",
      duration: 1500,
      animationType: "slide-in",
      style: { marginLeft: 20 },
    });
  };

  const addTransaction = async () => {
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
    const transactionsToInsert = transactions.map(({ id, ...rest }) => ({
      ...rest,
      date: new Date().toISOString(),
      time: new Date().toISOString(),
    }));

    const response = await insertIntoTable(
      "Transactions",
      transactionsToInsert
    );
    if (response.flag) {
      toast.show("Transaction Added Successfully!", {
        type: "success",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      setTransactions([
        {
          id: `${Date.now()}${Math.random().toString(36).substring(2, 15)}`,
          date: new Date(),
          time: new Date(),
          amount: "",
          category: "",
          subCategory: "",
          remarks: "",
        },
      ]);
      getTransactions();
    } else {
      toast.show("Could not add transaction", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar headerText="New Transaction" />
      <View>
        <FlatList
          ref={flatListRef}
          onScroll={handleScroll}
          style={styles.flatList}
          data={transactions}
          collapsable={false}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
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
                <TouchableOpacity
                  style={styles.input}
                  onPress={() =>
                    setShowPicker({ flag: true, mode: "time", id: item.id })
                  }
                >
                  <Text>{formatDateTime(item.date, "date")}</Text>
                  <Text>📅</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{LABEL.transactionTime}</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() =>
                    setShowPicker({ flag: true, mode: "time", id: item.id })
                  }
                >
                  <Text>{formatDateTime(item.time, "time")}</Text>
                  <Text>⏰</Text>
                </TouchableOpacity>
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
                <Dropdown
                  label={LABEL.category}
                  placeholder={PLACEHOLDER.category + PLACEHOLDER.mandatoryStar}
                  value={item.category}
                  options={categories}
                  onOptionSelect={(text) => {
                    setTransactions(
                      transactions.map((t) =>
                        t.id === item.id ? { ...t, category: text } : t
                      )
                    );
                  }}
                  onChangeText={(text) => {
                    setTransactions(
                      transactions.map((t) =>
                        t.id === item.id ? { ...t, category: text } : t
                      )
                    );
                  }}
                />
              </View>
            
              <View style={styles.inputContainer}>
                <Dropdown
                  label={LABEL.subCategory}
                  placeholder={PLACEHOLDER.subCategory}
                  value={item.subCategory}
                  options={subCategories}
                  onOptionSelect={(text) => {
                    setTransactions(
                      transactions.map((t) =>
                        t.id === item.id ? { ...t, subCategory: text } : t
                      )
                    );
                  }}
                  onChangeText={(text) => {
                    setTransactions(
                      transactions.map((t) =>
                        t.id === item.id ? { ...t, subCategory: text } : t
                      )
                    );
                  }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{LABEL.remarks}</Text>
                <TextInput
                  style={[styles.textArea, styles.input]}
                  placeholder={PLACEHOLDER.remarks + PLACEHOLDER.mandatoryStar}
                  value={item.remarks}
                  multiline
                  onFocus={() => setTimeout(() => {}, 5000)}
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
      <BottomNavTab />
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
