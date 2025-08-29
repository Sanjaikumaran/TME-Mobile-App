import React, { useState } from "react";
import {
  Modal,
  View,
  Button,
  Alert,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import XLSX from "xlsx";
import { StorageAccessFramework } from "expo-file-system";
import { formatDateTime, getTodayDate } from "@/utils/helpers";
import { MaterialIcons } from "@expo/vector-icons";

export type TableData = {
  id?: number;
  date: string | Date;
  time: string | Date;
  amount: number;
  category: string;
  subCategory: string;
  remarks: string;
  timestamp?: string;
  userId?: string;
};

export type ExportTableProps = {
  exportData: TableData[];
};

const saveToPublicFolder = async (
  fileName: string,
  content: string,
  mimeType: string
) => {
  try {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      throw new Error("Permission to access storage denied");
    }

    const fileUri = await StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      fileName,
      mimeType
    );

    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding:
        mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ? FileSystem.EncodingType.Base64
          : FileSystem.EncodingType.UTF8,
    });

    return fileUri;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const useExport = ({ exportData }: ExportTableProps) => {
  const [showExportModal, setShowExportModal] = useState(false);

  const transformTableData = (data: TableData[]) => {
    if (!Array.isArray(data) || data.length === 0)
      return { headers: [], rows: [] };

    const keys = Object.keys(data[0]).filter(
      (key) => key !== "timestamp" && key !== "userId"
    );

    const headers = [
      ...keys.map((key) =>
        key === "id"
          ? "S.No"
          : key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())
      ),
    ];

    const rows = data.map((item, index) => {
      return [
        ...keys.map((key) => {
          if (key === "id") return index + 1;

          const value = item[key as keyof TableData];

          if (key.toLowerCase().includes("date") && value) {
            return formatDateTime(value, "date");
          }
          if (key.toLowerCase().includes("time") && value) {
            return formatDateTime(value, "time");
          }
          return value;
        }),
      ];
    });

    return { headers, rows };
  };

  const { headers, rows } = transformTableData(exportData);

  const exportCSV = async () => {
    try {
      let csv = headers.join(",") + "\n";
      rows.forEach((row) => {
        csv += row.join(",") + "\n";
      });

      const fileName = `Report_${getTodayDate()}.csv`;

      if (Platform.OS === "android") {
        const fileUri = await saveToPublicFolder(fileName, csv, "text/csv");
        Alert.alert("Success", `File saved in Documents folder`);
      } else {
        const fileUri = FileSystem.documentDirectory + fileName;
        await FileSystem.writeAsStringAsync(fileUri, csv, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        await Sharing.shareAsync(fileUri);
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to export CSV: " + error.message);
    }
  };

  const exportExcel = async () => {
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

      const fileName = `Report_${getTodayDate()}.xlsx`;

      if (Platform.OS === "android") {
        const fileUri = await saveToPublicFolder(
          fileName,
          wbout,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        Alert.alert("Success", `File saved in Documents folder`);
      } else {
        const fileUri = FileSystem.documentDirectory + fileName;
        await FileSystem.writeAsStringAsync(fileUri, wbout, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await Sharing.shareAsync(fileUri);
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to export Excel: " + error.message);
    }
  };

  const exportPDF = async () => {
    try {
      const html = `
      <html>
        <head>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (row) =>
                    `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

      // Generate the PDF
      const { uri } = await Print.printToFileAsync({ html });
      const fileName = `Report_${getTodayDate()}.pdf`;

      if (Platform.OS === "android") {
        const permissions =
          await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) {
          throw new Error("Permission to access storage denied");
        }

        const fileUri = await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "application/pdf"
        );

        // ✅ Read PDF as Base64 from the temp URI
        const pdfContent = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // ✅ Write to SAF using Base64
        await FileSystem.writeAsStringAsync(fileUri, pdfContent, {
          encoding: FileSystem.EncodingType.Base64,
        });

        Alert.alert("Success", "File saved in Documents folder");
      } else {
        await Sharing.shareAsync(uri);
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to export PDF: " + error.message);
    }
  };

  const ExportModal = () => {
    return (
      <Modal visible={showExportModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.modalTitle}>Select Filters:</Text>
              <MaterialIcons
                name="close"
                size={24}
                color="#000"
                onPress={() => setShowExportModal(false)}
              />
            </View>
            <View style={styles.modalContent}>
              <Button title="Export as CSV" onPress={exportCSV} />
              <Button title="Export as Excel" onPress={exportExcel} />
              {/* <Button title="Export as PDF" onPress={exportPDF} /> */}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  return { ExportModal, setShowExportModal };
};

export default useExport;

const styles = StyleSheet.create({
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalHeader: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalContent: {
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },
});
