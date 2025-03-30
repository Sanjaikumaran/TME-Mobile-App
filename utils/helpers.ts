const formatDateTime = (date: Date, mode: "date" | "time"): string => {
  return mode === "date"
    ? `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export { formatDateTime };
