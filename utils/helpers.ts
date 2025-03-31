import AsyncStorage from "@react-native-async-storage/async-storage";

const formatDateTime = (date: string, mode: "date" | "time"): string => {
  const dateObj = new Date(date);
  return mode === "date"
    ? `${dateObj.getDate().toString().padStart(2, "0")}-${(
        dateObj.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${dateObj.getFullYear()}`
    : dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
const getUserId = async () => {
  const loginInfo = await AsyncStorage.getItem("LoginInfo");
  const parsedLoginInfo = loginInfo ? JSON.parse(loginInfo) : null;

  return parsedLoginInfo ? parsedLoginInfo.userId : null;
};
export { formatDateTime, getUserId };
