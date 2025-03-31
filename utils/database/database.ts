import * as SQLite from "expo-sqlite";
import { getUserId } from "@/utils/helpers";

let db: SQLite.SQLiteDatabase | null = null;

const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("auth.db");
  }
  return db;
};

export const createTable = async (tableName: string, columns: string[]) => {
  try {
    const database = await openDatabase();

    const columnsDefinition = columns.join(", ");

    await database.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${columnsDefinition}
      );
    `);

    console.log(`Table '${tableName}' created successfully!`);
  } catch (error) {
    console.error(`Error creating table '${tableName}':`, error);
  }
};

export const insertIntoTable = async (
  tableName: string,
  dataArray: Record<string, any>[]
): Promise<{ flag: boolean; message: string }> => {
  try {
    const database = await openDatabase();

    for (const data of dataArray) {
      const userId = await getUserId();
      const updatedData = userId ? { ...data, userId: userId } : data;

      const columns = Object.keys(updatedData).join(", ");
      const placeholders = Object.keys(updatedData)
        .map(() => "?")
        .join(", ");
      const values = Object.values(updatedData);

      const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
      console.log(query, values);

      await database.runAsync(query, values);
    }

    return { flag: true, message: "Successfully inserted all records!" };
  } catch (error: any) {
    return { flag: false, message: error.message };
  }
};

export const getDataFromTable = async (
  tableName: string,
  columns: string[] = ["*"],
  whereClause: string = "1=1",
  values: any[] = []
): Promise<{ flag: boolean; message: string; data: any[] }> => {
  try {
    const database = await openDatabase();

    const query = `SELECT ${columns.join(
      ", "
    )} FROM ${tableName} WHERE ${whereClause}`;

    const data = await database.getAllAsync(query, values);

    return { flag: true, message: "Successfully retrieved data!", data };
  } catch (error: any) {
    return { flag: false, message: error.message, data: [] };
  }
};

export const deleteFromTable = async (
  tableName: string,
  whereClause: string,
  values: any[]
): Promise<{ flag: boolean; message: string }> => {
  try {
    const database = await openDatabase();

    const query = `DELETE FROM ${tableName} WHERE ${whereClause}`;

    await database.runAsync(query, values);

    return { flag: true, message: "Successfully deleted data!" };
  } catch (error: any) {
    return { flag: false, message: error.message };
  }
};

export const updateDataInTable = async (
  tableName: string,
  setClause: string,
  whereClause: string,
  values: any[]
): Promise<{ flag: boolean; message: string }> => {
  try {
    const database = await openDatabase();

    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;

    await database.runAsync(query, values);

    return { flag: true, message: "Successfully updated data!" };
  } catch (error: any) {
    return { flag: false, message: error.message };
  }
};

createTable("Users", [
  "username TEXT UNIQUE NOT NULL",
  "password TEXT NOT NULL",
  "displayName TEXT",
  "mobileNumber TEXT",
  "emailAddress TEXT",
  "userId TEXT UNIQUE NOT NULL",
  "isAdmin BOOLEAN DEFAULT FALSE",
  "createdAt DATETIME DEFAULT CURRENT_TIMESTAMP",
]).catch(console.error);

createTable("Transactions", [
  "timestamp DATETIME DEFAULT CURRENT_TIMESTAMP",
  "date TEXT NOT NULL",
  "time TEXT NOT NULL",
  "userId TEXT NOT NULL",
  "amount REAL NOT NULL",
  "category TEXT NOT NULL",
  "subCategory TEXT",
  "remarks TEXT",
]).catch(console.error);

export default openDatabase;
