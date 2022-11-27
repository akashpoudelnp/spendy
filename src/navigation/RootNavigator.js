import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import AuthContext from "../context/AuthContext";
import GetStarted from "../screens/GetStarted";
import Home from "../screens/Home";
import AddSpending from "../screens/AddSpending";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import Settings from "../screens/Settings";
import AllSpendings from "../screens/AllSpendings";
import MyTabs from "./MyTabs";
import AddLoan from "../screens/AddLoan";
import darkTheme from "@react-navigation/native/src/theming/DarkTheme";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const {state} = React.useContext(AuthContext);

    return (
        <NavigationContainer theme={darkTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {state.isLoading ?
                    <Stack.Screen name='Splash' component={Splash}/>
                    : state.user == null ?
                        <>
                            <Stack.Screen name="GetStarted" component={GetStarted}/>
                        </>
                        :
                        <>
                            <Stack.Screen name='MyTabs' component={MyTabs}/>
                            <Stack.Screen name="AddSpending" component={AddSpending} options={{headerShown: false}}/>
                            <Stack.Screen name="AddLoan" component={AddLoan} options={{headerShown: false}}/>
                            <Stack.Screen name="AllSpendings" component={AllSpendings} options={{headerShown: false}}/>
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;