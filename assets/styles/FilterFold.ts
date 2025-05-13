import { StyleSheet } from "react-native";

const DropdownStyles = StyleSheet.create({
  container:{
    // marginBottom: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  foldingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  containerLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  comboInputContainer: {
    flexDirection: "row",
    gap:10,
  },
  comboTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },  

  modeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
  }, 
  dropdownTrigger: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 6,
    gap: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
   marginBottom: 5,
  },
  dropdownContainer: {
    position: "absolute",
    top: 24,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxHeight: 175,
    width:"26%"
  },
  dropdownItem: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
 

});

export default DropdownStyles;
