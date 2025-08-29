import { useCallback, useEffect, useState } from "react";
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
import { formatDateTime, getUserId } from "@/utils/helpers";
import Dropdown from "./Dropdown";
import { getDataFromTable } from "@/utils/database/database";
import { FilterType } from "@/app/(tab)/screens/HomeScreen";
export type InputType =
  | "text"
  | "numeric"
  | "date"
  | "time"
  | "multiselect"
  | "singleselect";

type ModeType = "Include" | "Exclude";

const dropdownOptions: InputType[] = ["text", "numeric", "date", "time"];
interface RangeFilterProps {
  value: FilterType;
  filterKey: string;
  inputType: InputType;
  isRangeFilter?: boolean;
  toggleFilter: (key: string, value: FilterType) => void;
}

const modeOptions: ModeType[] = ["Include", "Exclude"];

const RangeFilter: React.FC<RangeFilterProps> = ({
  value,
  filterKey,
  inputType,
  isRangeFilter = true,
  toggleFilter,
}) => {
  const toast = useToast();
  const isDateType = inputType === "date" || inputType === "time";

  const [mode, setMode] = useState<ModeType>(
    (value?.mode as ModeType) || "Include"
  );

  const [from, setFrom] = useState<Date | string>(
    isDateType && value?.from ? new Date(value?.from) : value?.from || ""
  );
  const [to, setTo] = useState<Date | string>(
    isDateType && value?.to ? new Date(value?.to) : value?.to || ""
  );

  // Pickers
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const updateFilter = (newFrom = from, newTo = to, newMode = mode) => {
    toggleFilter(filterKey, { mode: newMode, from: newFrom, to: newTo });
  };

  const validateRange = (date: Date, type: "from" | "to") => {
    if (type === "from" && to instanceof Date && date > to) {
      toast.hideAll();
      toast.show("Error: From date cannot be greater than To date.", {
        type: "error",
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      return false;
    }
    if (type === "to" && from instanceof Date && date < from) {
      toast.hideAll();
      toast.show("Error: To date cannot be earlier than From date.", {
        type: "error",
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in",
        style: { marginLeft: 20 },
      });
      return false;
    }
    return true;
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
    type: "from" | "to"
  ) => {
    if (!selectedDate) return;
    if (!validateRange(selectedDate, type)) return;

    if (type === "from") {
      setFrom(selectedDate);
      setShowFromPicker(Platform.OS === "ios");
      updateFilter(selectedDate, to);
    } else {
      setTo(selectedDate);
      setShowToPicker(Platform.OS === "ios");
      updateFilter(from, selectedDate);
    }
  };

  useEffect(() => {
    updateFilter(from, to, mode);
  }, [mode, from, to]);

  const renderTextInput = (
    label: string,
    value: string,
    setValue: (val: string) => void
  ) => (
    <>
      <Text style={styles.containerLabel}>{label}</Text>
      <TextInput
        placeholder="Enter Value"
        value={value}
        onChangeText={(val) => {
          setValue(val);
          updateFilter(val, to);
        }}
        style={styles.comboTextInput}
        keyboardType={inputType === "numeric" ? "numeric" : "default"}
      />
    </>
  );

  const renderDateInput = (
    label: string,
    date: Date | string,
    showPicker: boolean,
    setShowPicker: (v: boolean) => void,
    type: "from" | "to"
  ) => (
    <>
      <Text style={styles.containerLabel}>{label}</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.comboTextInput}>
          {date instanceof Date
            ? formatDateTime(date.toString(), inputType as "date" | "time")
            : `Select ${inputType}`}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date instanceof Date ? date : new Date()}
          mode={inputType as "date" | "time"}
          display="default"
          onChange={(e, d) => handleDateChange(e, d, type)}
        />
      )}
    </>
  );

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
            keyboardShouldPersistTaps="handled"
          >
            {modeOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.dropdownItem}
                onPress={() => {
                  Keyboard.dismiss();
                  setMode(option);
                  updateFilter(from, to, option);
                  setShowModeDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.comboInputContainer}>
        <View style={{ flex: 1 }}>
          {isDateType
            ? renderDateInput(
                `From ${inputType}:`,
                from,
                showFromPicker,
                setShowFromPicker,
                "from"
              )
            : renderTextInput("From Value:", from as string, (val) =>
                setFrom(val)
              )}
        </View>
        {isRangeFilter && (
          <View style={{ flex: 1 }}>
            {isDateType
              ? renderDateInput(
                  `To ${inputType}:`,
                  to,
                  showToPicker,
                  setShowToPicker,
                  "to"
                )
              : renderTextInput("To Value:", to as string, (val) => setTo(val))}
          </View>
        )}
      </View>
    </View>
  );
};

interface FilterFoldProps {
  value: FilterType;
  label: string;
  toggleFilter: (key: string, value: FilterType) => void;
  component?: React.ReactNode;
  inputType?: InputType;
  isRangeFilter?: boolean;
}

const FilterFold: React.FC<FilterFoldProps> = ({
  value,
  label,
  toggleFilter,
  component,
  inputType = "text",
  isRangeFilter = true,
}) => {
  const [showFilterContainer, setShowFilterContainer] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const key = label === "Category" ? "category" : "subCategory";
  const getTransactions = useCallback(async () => {
    try {
      const response = await getDataFromTable(
        "Transactions",
        [label === "Category" ? label.toLowerCase() : "subCategory"],
        `userId='${await getUserId()}'`
      );

      if (response.flag) {
        const categories = Array.from(
          new Set(response.data.map((t) => t[key]))
        );
        setOptions(categories);
      }
    } catch (err) {
      console.error(`Error fetching transactions for ${label}:`, err);
    }
  }, [label]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const renderFilterContent = () => {
    if (component) return component;

    if (isRangeFilter) {
      return (
        <ToastProvider>
          <RangeFilter
            value={value}
            filterKey={label.toLowerCase()}
            toggleFilter={toggleFilter}
            inputType={inputType}
          />
        </ToastProvider>
      );
    }

    return (
      <Dropdown
        value={value?.value || ""}
        onOptionSelect={(selected) =>
          toggleFilter(key, {
            mode: "include",
            value: selected,
          })
        }
        options={options}
        onChangeText={(text) =>
          toggleFilter(key, {
            mode: "include",
            value: text,
          })
        }
        searchable
      />
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.foldingContainer}
        onPress={() => setShowFilterContainer((prev) => !prev)}
      >
        <Text style={styles.containerLabel}>{label}</Text>
        <Ionicons
          name={`chevron-${showFilterContainer ? "up" : "down"}`}
          size={18}
          color="#000"
        />
      </Pressable>

      {showFilterContainer && renderFilterContent()}
    </View>
  );
};

export default FilterFold;
