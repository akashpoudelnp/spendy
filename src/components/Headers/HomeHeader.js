import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Colors, Typography} from '../../resources/styles';
import AuthContext from "../../context/AuthContext";
import {useNavigation} from "@react-navigation/native";

const HomeHeader = () => {

    const navigation = useNavigation();
    const {state} = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>Welcome back,</Text>
                <Text style={[Typography.H2, {color: Colors.WHITE}]}>{state.user}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.BLACK
    },
});

export default HomeHeader;
