import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {Colors, Typography} from "../resources/styles";
import Button from "../components/Button";
import {insertSpendings, updateSpendings} from "../dbHelpers/spendingsHelper";
import BackHeader from "../components/Headers/BackHeader";
import Icon from "react-native-vector-icons/FontAwesome5";

const AddSpending = ({navigation, route}) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (route.params?.item) {
            setTitle(route.params.item.title);
            setAmount((route.params.item.amount.toString()));
            setType((route.params.item.type));
        }
    }, []);

    // Insert Spending
    const __insert = () => {
        insertSpendings({
            title: title,
            amount: parseFloat(amount),
            type: type
        });
    }

    // Update Spending
    const __update = () => {
        updateSpendings({
            id: route.params.item.id,
            title: title,
            amount: parseFloat(amount),
            type: type
        });
    }

    // Save Spending
    const __save = () => {
        setError(false);
        if (title.length === 0 || amount <= 0 || type.length === 0) {
            setError(true);
            return;
        }

        if (route.params?.item) {
            __update();
        } else {
            __insert();
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <BackHeader title={route.params?.item ? 'Edit Spending' : 'New Spending'}/>
            {error && (
                <View
                    style={{
                        backgroundColor: "#2e2d2d",
                        margin: 10,
                        padding: 10,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                    <Icon name={'info-circle'} color={Colors.ALERT} size={10}/>
                    <Text style={{color: Colors.ALERT, paddingLeft: 5}}>Please enter the data correctly</Text>
                </View>
            )}
            {/* Body */}
            <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                    <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>Title</Text>
                    <TextInput
                        value={title}
                        placeholder='Enter Payment Description'
                        keyboardType='default'
                        onChangeText={(text) => setTitle(text)}
                        style={[styles.input, Typography.BODY]}
                        placeholderTextColor={Colors.GRAY_MEDIUM}/>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>Amount</Text>
                    <TextInput
                        value={amount}
                        placeholder='Enter amount'
                        keyboardType='numeric'
                        onChangeText={(text) => setAmount(text.toString())}
                        style={[styles.input, Typography.BODY]}
                        placeholderTextColor={Colors.GRAY_MEDIUM}/>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>Payment Using</Text>
                    <Picker
                        style={[styles.input, Typography.BODY]}
                        selectedValue={type}
                        onValueChange={(itemValue, itemIndex) =>
                            setType(itemValue)
                        }>
                        <Picker.Item label="Select Payment Method" background={"red"} value="0"/>
                        <Picker.Item label="Mobile Wallet" value="mobile_wallet"/>
                        <Picker.Item label="Cash" value="cash"/>
                    </Picker>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <Button
                    title='Save'
                    onPress={() => __save()}/>
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
        paddingTop: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        color: Colors.WHITE,
        backgroundColor: Colors.LIGHT_BLACK
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
});

export default AddSpending;
 