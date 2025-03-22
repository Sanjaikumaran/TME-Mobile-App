import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LogoutButtonProps {
  onPress: () => void;
  size?: number;
  color?: string;
direction?:string;  
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress, size = 24, color = "red" ,direction="down" }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
     <Ionicons name={`chevron-${direction}` as keyof typeof Ionicons.glyphMap} size={size} color={color} />

    </TouchableOpacity>
  );
};

export default LogoutButton;
