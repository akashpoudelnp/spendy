import {Alert} from 'react-native';
import dbHelper from './dbHelper';

// Table Name
const spendingsTable = 'spendings';

// Create Spendings Table
export const createSpendingsTable = () => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' + spendingsTable +
            ' (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(50) NOT NULL, amount FLOAT NOT NULL,type VARCHAR(50) NOT NULL, created_at date default (date(current_timestamp)));',
            [],
            () => {
                console.log('CREATE TABLE OR CHECK EXIST RAN');
            },
            error => {
                console.log(error);
            }
        );
    });
}


// Get Spendings
export const getSpendings = (setSpendings) => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM  ${spendingsTable} ORDER BY id DESC;`,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            id: row.id,
                            title: row.title,
                            amount: row.amount,
                            type: row.type,
                            created_at: row.created_at,
                        })
                    }
                } else {
                    console.log('empty spendings');
                }
                setSpendings(result);
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Todays Spendings
export const getTodaysSpendings = (setSpendings) => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM  ${spendingsTable}  where created_at BETWEEN date('now') AND date('now') ORDER BY id DESC `,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            id: row.id,
                            title: row.title,
                            amount: row.amount,
                            type: row.type,
                            created_at: row.created_at,
                        })
                    }
                } else {
                    console.log('empty spendings');
                }
                setSpendings(result);
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Todays Total
export const getTodaysTotal = (setTodayCount) => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            'SELECT SUM(amount) as todaysTotalAmount FROM ' + spendingsTable + " where created_at BETWEEN date('now') AND date('now') ",
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    setTodayCount(results.rows._array[0].todaysTotalAmount)

                } else {
                    setTodayCount('0')
                    console.log('empty');
                }

            },
            error => {
                console.log('ERR IN QUERY');
            }
        );
    });
}

// Get This Week's Total
export const getWeekTotal = (setWeekCount) => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            `SELECT SUM(amount) as weeksTotalAmount FROM ${spendingsTable} where created_at >= DATE('now', 'weekday 0', '-7 days')`,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    setWeekCount(results.rows._array[0].weeksTotalAmount)

                } else {
                    setTodayCount('0')
                    console.log('empty');
                }

            },
            error => {
                console.log('ERR IN WEEK');
            }
        );
    });
}

// Get This Month's Total
export const getMonthTotal = (setMonthCount) => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            `SELECT SUM(amount) as weeksTotalAmount FROM ${spendingsTable} where strftime('%m', created_at) = strftime('%m', DATE('now'))`,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    setMonthCount(results.rows._array[0].weeksTotalAmount)

                } else {
                    setMonthCount('0')
                    console.log('empty');
                }

            },
            error => {
                console.log('ERR IN MONTH');
            }
        );
    });
}
// Insert Spendings
export const insertSpendings = (item) => {
    if (item.title.length === 0 || item.amount <= 0 || item.type.length === 0) {
        Alert.alert('Oops !', 'Please, write correct data.')
    } else {
        dbHelper.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO ' + spendingsTable + '(title, amount, type) VALUES(?,?,?);',
                [item.title, item.amount, item.type],
                () => {
                    console.log('inserted');
                },
                error => {
                    console.log(error);
                }
            );
        });
    }
}

// Update Spendings
export const updateSpendings = (item) => {
    if (item.title.length === 0 || item.amount <= 0 || item.type.length === 0) {
        Alert.alert('Oups !', 'Please, write correct data.')
    } else {
        dbHelper.transaction((tx) => {
            tx.executeSql(
                'UPDATE ' + spendingsTable + ' SET title = ?, amount = ?, type = ? WHERE id = ?',
                [item.title, item.amount, item.type, item.id],
                () => {
                    console.log('updated');
                },
                error => {
                    console.log(error);
                }
            );
        });
    }
}

// Delete Spendings
export const deleteSpendings = (id) => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM ' + spendingsTable + ' WHERE id = ?',
            [id],
            () => {
                console.log('deleted');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Drop Table
export const deleteSpendingsTable = () => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            `drop table ${spendingsTable}`,
            [],
            () => {
                console.log('deleted');
            },
            error => {
                console.log(error);
            }
        );
    });
}
