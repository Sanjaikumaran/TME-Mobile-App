import { StyleSheet } from "react-native";

const AddTransactionsStyles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    backgroundColor: "#f5f5f5",
    paddingVertical: 0,
  },
  addTransactionContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  inputIcon: {
    fontSize: 20,

    fontWeight: "400",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: "#4B0082",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",

    justifyContent: "space-between",
    width: "100%",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#4B0082",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 80,

    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddTransactionsStyles;
