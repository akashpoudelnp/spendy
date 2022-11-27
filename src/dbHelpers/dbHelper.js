import * as SQLite from 'expo-sqlite';

const dbHelper = SQLite.openDatabase('spendy');

export default dbHelper;