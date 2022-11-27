import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from './AuthContext';
import {
    createSpendingsTable,
    deleteSpendingsTable
} from "../dbHelpers/spendingsHelper";

import {createLoansTable, deleteLoansTable} from "../dbHelpers/loansHelper";

function AuthProvider({children}) {
    const [state, dispatch] = React.useReducer((prevState, action) => {
        switch (action.type) {
            case 'RESTORE_USER':
                return {
                    ...prevState, user: action.user, isLoading: false,
                };
            case 'SIGN_IN':
                return {
                    ...prevState, isSignout: false, user: action.user,
                };
            case 'SIGN_OUT':
                return {
                    ...prevState, isSignout: true, user: null,
                };
        }
    }, {
        isLoading: true, isSignout: false, user: null,
    },);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let name;
            try {
                name = await AsyncStorage.getItem('user');
            } catch (e) {
                console.log('Error in auth prov');
            }
            dispatch({type: 'RESTORE_USER', user: name});
        };
        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(() => ({
        // Sign In
        signIn: async (user) => {
            // Store User
            await AsyncStorage.setItem('user', user);
            // Create Spendings Table
            createLoansTable();
            createSpendingsTable();
            dispatch({type: 'SIGN_IN', user: user});
        }, // Sign Out
        signOut: async () => {
            // Delete User
            await AsyncStorage.removeItem('user');
            // Delete Database
            deleteLoansTable();
            deleteSpendingsTable();
            dispatch({type: 'SIGN_OUT'});
        },
    }), [],);

    return (<AuthContext.Provider value={{authContext, state}}>
        {children}
    </AuthContext.Provider>);
}

export default AuthProvider;
