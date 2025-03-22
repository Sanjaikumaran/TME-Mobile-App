import { StyleSheet } from "react-native";

const HeaderBarStyles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f5f5f5",
    paddingVertical: 0,
  },
  headerBar: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    // backgroundColor: "#9261F3",
    backgroundColor: "#4B0082",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  menuTab: {
    height: '100%',
    zIndex:1,
    // backgroundColor: "#C0C0C0",
    backgroundColor: "#E6E6FA",
    alignItems: "flex-start",
  
  },
});

export default HeaderBarStyles;
