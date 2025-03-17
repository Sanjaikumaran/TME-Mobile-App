import { StyleSheet } from "react-native";

const BottomNavTabStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 10,
      backgroundColor: "#eee",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    tab: {
      padding: 10,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: "#9261F3",
    },
    text: {
      fontSize: 16,
      color: "black",
    },
    activeText: {
      fontWeight: "bold",
      color: "#9261F3",
      
    },
  });

  export default BottomNavTabStyles