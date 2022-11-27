import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Pressable,
    Linking
} from 'react-native';

import AuthContext from "../context/AuthContext";
import {Colors, Typography} from "../resources/styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";


const Settings = () => {
    const {state, authContext} = React.useContext(AuthContext);

    // Get User
    const user = state.user? state.user : 'User';
    const navigator = useNavigation();

    const __signOut = () => {
        authContext.signOut();
    }

    return (
        <View style={{flex: 1}}>

            {/* Setting Screen */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={[Typography.H1, {color: Colors.WHITE, marginBottom: 10}]}>Settings</Text>
                </View>

                {/* Body */}
                <View style={styles.bodyContainer}>
                    {/* Account */}
                    <View>
                        <Text style={[Typography.TAGLINE, {color: Colors.GRAY_MEDIUM, marginBottom: 10}]}>Account</Text>
                        <View style={styles.blockContainer}>

                            {/* Name */}
                            <View style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.WHITE}]}>Name</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.GRAY_MEDIUM}]}>{user}</Text>
                            </View>
                        </View>
                    </View>

                    {/* App setting */}
                    <View style={{marginTop: 20}}>
                        <Text style={[Typography.TAGLINE, {color: Colors.GRAY_MEDIUM, marginBottom: 10}]}>App
                            Settings</Text>
                        <View style={styles.blockContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.WHITE}]}>Language</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.GRAY_MEDIUM}]}>English</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Privacy */}
                    <View style={{marginTop: 20}}>
                        <Text style={[Typography.TAGLINE, {color: Colors.GRAY_MEDIUM, marginBottom: 10}]}>More</Text>
                        <View style={styles.blockContainer}>
                            <Pressable style={styles.rowContainer}
                                       onPress={() => Linking.openURL('https://www.akashpoudel.com.np')}>
                                <Text style={[Typography.BODY, {color: Colors.WHITE}]}>Developer</Text>
                                <Text
                                    style={[Typography.TAGLINE, {color: Colors.GRAY_MEDIUM}]}>Aakash Poudel</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Sign out */}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.btnContainer}
                        onPress={() => __signOut()}>
                        <Text style={[Typography.H3, {color: Colors.ALERT}]}>Reset</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    // Header
    headerContainer: {
        flexDirection:"row",
        justifyContent:"space-between",
        padding: 20,
        paddingBottom: 10
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0
    },
    blockContainer: {
        borderRadius: 10,
        backgroundColor: Colors.LIGHT_BLACK
    },
    rowContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_BLACK
    },
    // Modal
    modalContainer: {
        margin: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        backgroundColor: Colors.BLACK
    },
});

export default Settings;
