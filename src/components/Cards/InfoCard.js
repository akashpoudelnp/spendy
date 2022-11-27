import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { Colors, Typography } from '../../resources/styles';
import Icon from "react-native-vector-icons/FontAwesome5";

const InfoCard = (props) => {
    const spendings = props.spendings;
    return (
        <View style={styles.container}>
            <View style={styles.blockContainer}>
                <Text style={[Typography.H3, { color: Colors.GRAY_THIN, marginBottom: 10 }]}>Today's Spending</Text>
                <Text style={[Typography.XL, { color: Colors.WHITE }]}>रु {spendings}</Text>
            </View>
            <View style={styles.rightContainer} >
                <Icon name="rupee-sign" color={"#297865"} size={60}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        flexDirection: 'row',
        backgroundColor: Colors.PRIMARY
    },
    blockContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30
    },
    rightContainer: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center"
    }
});

export default InfoCard;
