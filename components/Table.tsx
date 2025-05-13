import { formatDateTime } from "@/utils/helpers";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DataTable } from "react-native-paper";

interface Column {
  label: string;
  accessor: string;
  width?: number;
}

interface DynamicTableProps {
  data: Record<string, any>[];
  columns: Column[];
  rowsPerPageOptions?: number[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  columns,
  rowsPerPageOptions = [5, 10, 20],
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0]);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(
    null
  );

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      row[col.accessor]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const from = currentPage * rowsPerPage;
  const to = Math.min(from + rowsPerPage, filteredData.length);

  if (selectedRow) {
    return (
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.title}>Full Details</Text>
        {Object.keys(selectedRow).map((key) => (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.label}>{key}:</Text>
            <Text style={styles.value}>{selectedRow[key]}</Text>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => setSelectedRow(null)}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back to Table</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text);
          setCurrentPage(0);
        }}
      />

      <ScrollView horizontal>
        <DataTable style={styles.table}>
          <DataTable.Header>
            {columns.map((col) => (
              <DataTable.Title
                key={col.accessor}
                style={[styles.columnHeader, { width: col.width || 100 }]}
              >
                {col.label}
              </DataTable.Title>
            ))}
          </DataTable.Header>
          {paginatedData.map((row, rowIndex) => (
            <TouchableOpacity
              key={rowIndex}
              onPress={() => setSelectedRow(row)}
            >
              <DataTable.Row>
                {columns.map((col) => (
                  <DataTable.Cell
                    key={col.accessor}
                    style={[styles.cell, { width: col.width || 100 }]}
                  >
                    <Text
                      style={styles.cellText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {col.accessor === "date" || col.accessor === "time"
                        ? formatDateTime(
                            row[col.accessor],
                            col.accessor === "date" ? "date" : "time"
                          )
                        : row[col.accessor]?.toString()}
                    </Text>
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            </TouchableOpacity>
          ))}

          <DataTable.Pagination
            page={currentPage}
            numberOfPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            label={`${from + 1}-${to} of ${filteredData.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={rowsPerPageOptions}
            numberOfItemsPerPage={rowsPerPage}
            onItemsPerPageChange={setRowsPerPage}
            selectPageDropdownLabel="Rows per page"
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  searchInput: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  columnHeader: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    fontWeight: "bold",
    textAlign: "left",
  },
  cell: {
    padding: 10,
    justifyContent: "center",
  },
  cellText: {
    fontSize: 14,
    textAlign: "left",
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#007bff",
    alignItems: "center",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DynamicTable;
