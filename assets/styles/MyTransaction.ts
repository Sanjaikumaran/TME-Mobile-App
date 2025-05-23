import { StyleSheet } from "react-native";

const MyTransactionsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    width: "80%",
    marginRight: 8,
  },
  flatList: {
    marginBottom: 200,
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: "#007bff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  dateTime: {
    fontSize: 14,
    color: "#6c757d",
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
    color: "#28a745",
  },
  subCategory: {
    fontSize: 16,
    fontWeight: "500",
    color: "#17a2b8",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc3545",
    marginVertical: 6,
  },
  remarks: {
    fontSize: 14,
    color: "#495057",
    fontStyle: "italic",
    marginTop: 6,
    backgroundColor: "#e9ecef",
    padding: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  filterText: { fontSize: 16, marginLeft: 10 },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: { color: "white", fontWeight: "bold" },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});

export default MyTransactionsStyles;
