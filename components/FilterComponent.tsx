import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

import { getDataFromTable } from "@/utils/database/database";
import { getUserId } from "@/utils/helpers";
import FilterFold, { InputType } from "@/components/FilterFold";
import styles from "@/assets/styles/FilterComponent";

export interface FilterType {
  mode: string;
  from?: Date | string;
  to?: Date | string;
  value?: string;
}

type FilterComponentProps = {
  setData: (data: any[]) => void;
  page?: string;
  showIcon?: boolean;
};

const useFilter = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultFilters = useMemo(
    () => ({
      date: { mode: "Include", from: "", to: "" },
      time: { mode: "Include", from: "", to: "" },
      amount: { mode: "Include", from: "", to: "" },
      category: { mode: "Include", value: "" },
      subCategory: { mode: "Include", value: "" },
    }),
    []
  );

  const columns = useMemo(
    () => [
      { accessor: "date", inputType: "date", label: "Date" },
      { accessor: "time", inputType: "time", label: "Time" },
      { accessor: "amount", inputType: "numeric", label: "Amount" },
      { accessor: "category", inputType: "multiselect", label: "Category" },
      {
        accessor: "subCategory",
        inputType: "multiselect",
        label: "Sub-Category",
      },
    ],
    []
  );

  const constructCondition = useCallback(
    (filters: { [key: string]: FilterType }) => {
      const conditions: string[] = [];

      Object.entries(filters).forEach(([key, filter]) => {
        if (!filter.mode) return;

        const isInclude = filter.mode === "Include";
        const prefix = isInclude ? "" : "NOT ";

        if (filter.from && filter.to) {
          const formattedFrom =
            key === "amount"
              ? filter.from
              : `'${new Date(filter.from).toISOString()}'`;
          const formattedTo =
            key === "amount"
              ? filter.to
              : `'${new Date(filter.to).toISOString()}'`;
          conditions.push(
            `${prefix}(${key} BETWEEN ${formattedFrom} AND ${formattedTo})`
          );
        } else if (filter.value) {
          if (Array.isArray(filter.value) && filter.value.length > 0) {
            const values = filter.value.map((v) => `'${v}'`).join(", ");
            conditions.push(
              `${prefix}(${key} ${isInclude ? "IN" : "NOT IN"} (${values}))`
            );
          } else {
            conditions.push(`${prefix}(${key} = '${filter.value}')`);
          }
        }
      });

      return conditions.join(" AND ");
    },
    []
  );

  const getTransactions = useCallback(
    async (
      setData: (data: any[]) => void,
      filters: { [key: string]: FilterType },
      page?: string
    ) => {
      setIsLoading(true);
      try {
        const userId = await getUserId();
        const filterCondition = constructCondition(filters);
        const whereClause = filterCondition
          ? `userId='${userId}' AND ${filterCondition}`
          : `userId='${userId}'`;

        const response = await getDataFromTable(
          "Transactions",
          ["*"],
          whereClause
        );

        await AsyncStorage.setItem(page + "filters", JSON.stringify(filters));

        if (response.flag) {
          setData(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setShowFilterModal(false);
        setIsLoading(false);
      }
    },
    [constructCondition]
  );

  const FilterModal = ({
    setData,
    page,
    showIcon = true,
  }: FilterComponentProps) => {
    const [selectedFilters, setSelectedFilters] = useState<{
      [key: string]: FilterType;
    }>(defaultFilters);

    const toggleFilter = useCallback((key: string, value: FilterType) => {
      setSelectedFilters((prev) => ({ ...prev, [key]: value }));
    }, []);

    useEffect(() => {
      (async () => {
        const savedFilters = await AsyncStorage.getItem(page + "filter");

        if (savedFilters) {
          const parsed = JSON.parse(savedFilters);
          setSelectedFilters(parsed);
        }
      })();
    }, []);

    return (
      <View style={styles.container}>
        {showIcon && (
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <MaterialIcons name="filter-list-alt" size={24} color="#007bff" />
          </TouchableOpacity>
        )}

        <Modal visible={showFilterModal} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
                  color="#007bff"
                  onPress={() => setShowFilterModal(false)}
                />
              </View>
              <ScrollView>
                {columns.map((col) => (
                  <View key={col.accessor} style={styles.filterOptions}>
                    <FilterFold
                      value={selectedFilters[col.accessor]}
                      label={col.label}
                      toggleFilter={toggleFilter}
                      inputType={col.inputType as InputType}
                      isRangeFilter={col.inputType !== "multiselect"}
                    />
                  </View>
                ))}
                <Button
                  color="#007bff"
                  title={isLoading ? "Loading..." : "Apply"}
                  disabled={isLoading}
                  onPress={() =>
                    getTransactions(setData, selectedFilters, page)
                  }
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return { FilterComponent: FilterModal, setShowFilterModal };
};

export default useFilter;
