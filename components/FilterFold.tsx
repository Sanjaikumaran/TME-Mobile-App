import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  FlatList,
  Button,
  Platform,
  Keyboard,
  ViewComponent,
  Pressable,
} from "react-native";
import { ToastProvider, useToast } from "react-native-toast-notifications";

import styles from "@/assets/styles/FilterFold";
import { Ionicons } from "@expo/vector-icons";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatDateTime } from "@/utils/helpers";
export type InputType =
  | "text"
  | "numeric"
  | "date"
  | "time"
  | "multiselect"
  | "singleselect";

type ModeType = "Include" | "Exclude";

const dropdownOptions: InputType[] = ["text", "numeric", "date", "time"];
const modeOptions: ModeType[] = ["Include", "Exclude"];

const NativeComp = ({
  inputType,
  isRangeFilter = true,
}: {
  inputType: InputType;
  isRangeFilter?: boolean;
}) => {
  const toast = useToast();

  const [mode, setMode] = useState<ModeType>("Include");
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const isDateType = inputType === "date" || inputType === "time";

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
    type: "from" | "to"
  ) => {
    const currentDate = selectedDate || (type === "from" ? fromDate : toDate);

    if (currentDate) {
      // Ensure that the 'from' date is less than or equal to the 'to' date
      if (type === "from") {
        // Check if 'from' date is greater than 'to' date
        if (toDate && currentDate > toDate) {
          // Show error toast if 'from' date is greater than 'to' date
          toast.hideAll(); // Hide any existing toasts
          toast.show("Error: From date cannot be greater than To date.", {
            type: "error", // Type is 'error' for error messages
            placement: "bottom",
            duration: 2000,
            animationType: "slide-in",
            style: { marginLeft: 20 },
          });
          return; // Exit early without updating the 'from' date
        }
        setFromDate(currentDate);
        setShowFromPicker(Platform.OS === "ios");
      } else {
        // Check if 'to' date is less than 'from' date
        if (fromDate && currentDate < fromDate) {
          // Show error toast if 'to' date is less than 'from' date
          toast.hideAll(); // Hide any existing toasts
          toast.show("Error: To date cannot be earlier than From date.", {
            type: "error", // Type is 'error' for error messages
            placement: "bottom",
            duration: 2000,
            animationType: "slide-in",
            style: { marginLeft: 20 },
          });
          return; // Exit early without updating the 'to' date
        }
        setToDate(currentDate);
        setShowToPicker(Platform.OS === "ios");
      }
    }
  };

  return (
    <View>
      <View style={styles.modeContainer}>
        <Text style={styles.containerLabel}>Mode:</Text>
        <View style={styles.dropdownTrigger}>
          <Text onPress={() => setShowModeDropdown(!showModeDropdown)}>
            {mode}
          </Text>

          <Ionicons
            name={`chevron-${showModeDropdown ? "up" : "down"}`}
            size={15}
            color="#000"
            onPress={() => setShowModeDropdown(!showModeDropdown)}
          />
        </View>
        {showModeDropdown && (
          <ScrollView
            style={styles.dropdownContainer}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          >
            {modeOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  Keyboard.dismiss();
                  setMode(option);
                  setShowModeDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={[styles.comboInputContainer]}>
        <View style={{ flex: 1 }}>
          {isRangeFilter && (
            <Text style={styles.containerLabel}>
              {isDateType
                ? `From ${
                    inputType.charAt(0).toUpperCase() +
                    inputType.slice(1).toLowerCase()
                  }:`
                : "From Value:"}
            </Text>
          )}
          {isDateType ? (
            <>
              <TextInput
                style={styles.comboTextInput}
                onPress={() => setShowFromPicker(true)}
              >
                {fromDate
                  ? formatDateTime(fromDate.toString(), inputType)
                  : "Select " +
                    inputType.charAt(0).toUpperCase() +
                    inputType.slice(1).toLowerCase()}
              </TextInput>

              {showFromPicker && (
                <DateTimePicker
                  value={fromDate || new Date()}
                  mode={inputType}
                  display="default"
                  onChange={(event, date) =>
                    handleDateChange(event, date, "from")
                  }
                />
              )}
            </>
          ) : (
            <TextInput
              placeholder="Enter Value"
              value={fromValue}
              onChangeText={setFromValue}
              style={styles.comboTextInput}
              keyboardType={inputType === "numeric" ? "numeric" : "default"}
            />
          )}
        </View>
        {isRangeFilter && (
          <View style={{ flex: 1 }}>
            {isRangeFilter && (
              <Text style={styles.containerLabel}>
                {isDateType
                  ? `To ${
                      inputType.charAt(0).toUpperCase() +
                      inputType.slice(1).toLowerCase()
                    }:`
                  : "To Value"}
              </Text>
            )}
            {isDateType ? (
              <>
                <TextInput
                  style={styles.comboTextInput}
                  onPress={() => setShowToPicker(true)}
                >
                  {toDate
                    ? formatDateTime(toDate.toString(), inputType)
                    : "Select " +
                      inputType.charAt(0).toUpperCase() +
                      inputType.slice(1).toLowerCase()}
                </TextInput>

                {showToPicker && (
                  <DateTimePicker
                    value={toDate || new Date()}
                    mode={inputType}
                    display="default"
                    onChange={(event, date) =>
                      handleDateChange(event, date, "to")
                    }
                  />
                )}
              </>
            ) : (
              <TextInput
                placeholder="Enter Value"
                value={toValue}
                onChangeText={setToValue}
                style={styles.comboTextInput}
                keyboardType={inputType === "numeric" ? "numeric" : "default"}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

interface FilterFoldProps {
  label: string;
  component?: React.ReactNode;
  inputType?: InputType;
  isRangeFilter?: boolean;
}

const FilterFold = ({
  label,
  component,
  inputType,
  isRangeFilter = true,
}: FilterFoldProps) => {
  const [showFilterContainer, setShowFilterContainer] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.foldingContainer}
        onPress={() => {
          setShowFilterContainer(!showFilterContainer);
        }}
      >
        <Text style={styles.containerLabel}>{label}</Text>
        <Ionicons
          name={`chevron-${showFilterContainer ? "up" : "down"}`}
          size={18}
          color="#000"
        />
      </Pressable>
      <ToastProvider>
        {showFilterContainer && component
          ? component
          : showFilterContainer && (
              <NativeComp
                inputType={inputType || "text"}
                isRangeFilter={isRangeFilter}
              />
            )}
      </ToastProvider>
    </View>
  );
};

export default FilterFold;
