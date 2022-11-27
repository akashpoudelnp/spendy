import {Alert} from 'react-native';
import dbHelper from './dbHelper';

// Table Name
const tableName = 'loans';


// Create Loans Table
export const createLoansTable = () => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' + tableName +
            ' (id INTEGER PRIMARY KEY AUTOINCREMENT, to_user VARCHAR(50) NOT NULL, amount FLOAT NOT NULL,type VARCHAR(50) NOT NULL, created_at date default (date(current_timestamp)));',
            [],
            () => {
                console.log('CREATE TABLE LOAN  RAN');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Loans
export const getLoans = (setLoans) => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            id: row.id,
                            to_user: row.to_user,
                            amount: row.amount,
                            type: row.type,
                            created_at: row.created_at,
                        })
                    }
                } else {
                    console.log('empty loans');
                }
                setLoans(result);
            },
            error => {
                console.log(error);
            }
        );
    });
}


// Insert Loans
export const insertLoans = (item) => {
    if (item.to_user.length === 0 || item.amount <= 0 || item.type.length === 0) {
        Alert.alert('Oops !', 'Please, write correct data.')
    } else {
        dbHelper.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO ' + tableName + '(to_user, amount, type) VALUES(?,?,?);',
                [item.to_user, item.amount, item.type],
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

// Get Todays Total
export const getTotalLoans = (setTotalLoans) => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            'SELECT SUM(amount) as totalLoan FROM ' + tableName ,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    setTotalLoans(results.rows._array[0].totalLoan)

                } else {
                    setTotalLoans('0')
                    console.log('empty');
                }

            },
            error => {
                console.log('ERR IN QUERY');
            }
        );
    });
}
// Update Loanns
export const updateLoans = (item) => {
    if (item.to_user.length === 0 || item.amount <= 0 || item.type.length === 0) {
        Alert.alert('Oops !', 'Please, write correct data.')
    } else {
        dbHelper.transaction((tx) => {
            tx.executeSql(
                'UPDATE ' + tableName + ' SET to_user = ?, amount = ?, type = ? WHERE id = ?',
                [item.to_user, item.amount, item.type, item.id],
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
export const deleteLoans = (id) => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM ' + tableName + ' WHERE id = ?',
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
export const deleteLoansTable = () => {
    dbHelper.transaction((tx) => {
        tx.executeSql(
            `drop table ${tableName}`,
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