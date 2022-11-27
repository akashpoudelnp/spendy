import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text, TextInput, Alert,
} from 'react-native';

import {Colors, Typography} from "../resources/styles";
import Button from "../components/Button";
import AuthContext from "../context/AuthContext";

const GetStarted = ({navigation, route}) => {
    const {authContext} = React.useContext(AuthContext);

    const [name, setName] = useState('');


    const saveName = async (value) => {
        if (!name) {
            Alert.alert('Please enter your name to continue')
            return;
        }
        const user = {
            name: name,
            joined: new Date()
        }
        authContext.signIn(name);
    }

    return (
        <View style={styles.container}>
            {/* Body */}
            <View style={styles.bodyContainer}>
                <Image
                    resizeMode='cover'
                    style={{width: 100, height: 100}}
                    source={require('../../assets/icon.png')}/>

                <Text style={[Typography.H3, styles.title, {paddingTop: 10}]}>Welcome to Spendy !</Text>
                <Text style={[Typography.TAGLINE, styles.title, {marginTop: 5}]}>Secure & simple spendings
                    tracker.</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Enter your name to continue'
                        keyboardType='default'
                        style={[styles.input, Typography.BODY]}
                        placeholderTextColor={Colors.GRAY_MEDIUM}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <Button
                    title='Get Started'
                    onPress={() => saveName()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        color: Colors.WHITE,
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
    inputContainer: {
        marginTop: 40,
    },
    input: {
        paddingHorizontal: 50,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 10,
        color: Colors.WHITE,
        backgroundColor: Colors.LIGHT_BLACK,
        textAlign: "center"
    },
});

export default GetStarted;
