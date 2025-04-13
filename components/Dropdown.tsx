import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";

import styles from "@/assets/styles/Dropdown";

interface DropdownProps {
  label: string;
  showLabel?: boolean;
  value: string;
  options: string[];
  placeholder?: string;
  onChangeText: (text: string) => void;
  onOptionSelect: (optionSelected: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Dropdown = ({
  label,
  showLabel = true,
  value,
  placeholder = "Select an option",
  onFocus,
  onBlur,
  onChangeText,
  onOptionSelect,
  options,
}: DropdownProps) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!value) {
      setFilteredOptions(
        options
          .map((option) => option.trim())
          .filter((option) => option.length > 0)
          .sort((a, b) => a.localeCompare(b))
      );
      return;
    }

    const matchingOptions = options
      .map((option) => option.trim())
      .filter(
        (option) =>
          option.length > 0 &&
          option.toLowerCase().includes(value.toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b));

    setFilteredOptions(
      matchingOptions.length > 0 ? matchingOptions : ["No matching options"]
    );
  }, [value, options]);
  return (
    <View style={styles.inputContainer}>
      {showLabel && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onFocus={() => {
          onFocus && onFocus();
          setShowDropDown(true);
        }}
        onBlur={() => {
          onBlur && onBlur();
          setShowDropDown(false);
        }}
        onChangeText={onChangeText}
      />
      {showDropDown && filteredOptions.length > 0 && (
        <ScrollView
          style={[styles.dropdownContainer,!showLabel && {top: 45}]}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          {filteredOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                if (option === "No matching options") {
                  setShowDropDown(false);
                  return;
                }
                Keyboard.dismiss();
                onOptionSelect(option);
                setShowDropDown(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Dropdown;
