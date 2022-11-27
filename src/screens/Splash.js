import React from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import {Colors} from "../resources/styles";

const Splash = () => {
    return (
        <View style={styles.container}>
            <Image
                resizeMode='cover'
                style={{width: 100, height: 100}}
                source={require('../../assets/icon.png')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BLACK
    },
});

export default Splash;
