import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ToastProvider, useToast } from "react-native-toast-notifications";

import HeaderBar from "@/components/HeaderBar";
import BottomNavTab from "@/components/BottomNavTab";
import CloseIcon from "@/assets/icons/CloseIcon";
import DownIcon from "@/assets/icons/ChevronDownIcon";

import { PLACEHOLDER, LABEL } from "@/constants/variable";
import styles from "@/assets/styles/AddTransaction";
import { insertIntoTable } from "@/app/database/database";

const AddTransactionScreen = () => {
  const categories = [
    { id: "1", name: "Optison 1" },
    { id: "2", name: "Option 2" },
    { id: "3", name: "Option 3" },
  ];
  const subCategories = [
    { id: "1", name: "dg 1" },
    { id: "2", name: " 2" },
    { id: "3", name: "dfgfdg 3" },
  ];
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

  const [focusedCategoryId, setFocusedCategoryId] = useState(null);
  const [focusedSubcategoryId, setFocusedSubcategoryId] = useState(null);
  const [dropdownData, setDropdownData] = useState<any>([]);

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
      duration: 2000,
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
      duration: 2000,
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
    const transactionsToInsert = transactions.map(({ id, ...rest }) => rest);
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

  const onCategorySelect = (id: any, text: any) => {
    const matchingCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(text.toLowerCase())
    );
    setDropdownData(matchingCategories);
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, category: text } : t))
    );
  };

  const onSubcategorySelect = (id: any, text: any) => {
    const matchingCategories = subCategories.filter((category) =>
      category.name.toLowerCase().includes(text.toLowerCase())
    );
    setDropdownData(matchingCategories);
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, subCategory: text } : t))
    );
  };
  return (
    <View style={styles.container}>
      <HeaderBar />
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
                <Text style={styles.inputLabel}>{LABEL.category}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={PLACEHOLDER.category + PLACEHOLDER.mandatoryStar}
                  value={item.category}
                  onFocus={() => {
                    onCategorySelect(item.id, item.category);
                    setFocusedCategoryId(item.id);
                  }}
                  onBlur={() => setFocusedCategoryId(null)}
                  onChangeText={(text) => {
                    onCategorySelect(item.id, text);
                    setTransactions(
                      transactions.map((t) =>
                        t.id === item.id ? { ...t, category: text } : t
                      )
                    );
                  }}
                />
                {focusedCategoryId === item.id && dropdownData.length > 0 && (
                  <FlatList
                    style={styles.dropdownContainer}
                    data={dropdownData}
                    keyExtractor={(dropdownItem: any) =>
                      dropdownItem.id.toString()
                    }
                    renderItem={({ item: dropdownItem }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          Keyboard.dismiss();

                          onCategorySelect(item.id, dropdownItem.name);
                          setDropdownData(categories);
                          setFocusedCategoryId(null);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>
                          {dropdownItem.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{LABEL.subCategory}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={
                    PLACEHOLDER.subCategory + PLACEHOLDER.mandatoryStar
                  }
                  value={item.subCategory}
                  onFocus={() => {
                    onSubcategorySelect(item.id, item.subCategory);
                    setFocusedSubcategoryId(item.id);
                  }}
                  onBlur={() => setFocusedSubcategoryId(null)}
                  onChangeText={(text) => {
                    onSubcategorySelect(item.id, text);
                    setTransactions(
                      transactions.map((t) =>
                        t.id === item.id ? { ...t, subCategory: text } : t
                      )
                    );
                  }}
                />
                {focusedSubcategoryId === item.id &&
                  dropdownData.length > 0 && (
                    <FlatList
                      style={styles.dropdownContainer}
                      data={dropdownData}
                      keyExtractor={(dropdownItem: any) =>
                        dropdownItem.id.toString()
                      }
                      renderItem={({ item: dropdownItem }) => (
                        <TouchableOpacity
                          style={styles.dropdownItem}
                          onPress={() => {
                            Keyboard.dismiss();

                            onSubcategorySelect(item.id, dropdownItem.name);
                            setDropdownData(subCategories);
                            setFocusedSubcategoryId(null);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>
                            {dropdownItem.name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  )}
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
