import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LogoutButtonProps {
  onPress: () => void;
  size?: number;
  color?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress, size = 24, color = "red" }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
      <Ionicons name="close" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default LogoutButton;
