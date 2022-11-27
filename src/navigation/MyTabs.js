import {Colors, Typography} from "../resources/styles";
import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Loans from "../screens/Loans";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (<Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false, tabBarStyle: {
                    height: 60, backgroundColor: 'rgba(34,36,40,1)', paddingBottom: 10, borderTopWidth: 0,
                },
                tabBarActiveTintColor: Colors.PRIMARY,
            }}
            activeColor={Colors.WHITE}
            inactiveColor={Colors.GRAY_DARK}

            barStyle={[Typography.BODY, {backgroundColor: Colors.BLACK, borderTopWidth: 0.3}]}>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({color}) => (<Icon name="home" color={color} size={23}/>),
                }}/>

            <Tab.Screen
                name="Loans"
                component={Loans}
                options={{
                    tabBarIcon: ({color}) => (<Icon name="credit-card" color={color} size={23}/>),
                }}/>

            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({color}) => (<Icon name="settings" color={color} size={23}/>)
                }}/>
        </Tab.Navigator>);
}

export default MyTabs;