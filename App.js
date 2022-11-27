import React, {useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar
} from 'react-native';

import {Colors} from './src/resources/styles';
import AuthProvider from "./src/context/AuthProvider";
import RootNavigator from "./src/navigation/RootNavigator";

const App = () => {

    return (
        <AuthProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar StatusBarStyle='light-content' backgroundColor={Colors.BLACK}/>
                <RootNavigator/>
            </SafeAreaView>
        </AuthProvider>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
