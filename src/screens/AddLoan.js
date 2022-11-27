import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput, Alert
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Colors, Typography} from "../resources/styles";
import Button from "../components/Button";
import {insertLoans, updateLoans} from "../dbHelpers/loansHelper";
import BackHeader from "../components/Headers/BackHeader";

const AddLoan = ({navigation, route}) => {
    const [to_user, setToUser] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (route.params?.item) {
            setToUser(route.params.item.to_user);
            setAmount((route.params.item.amount.toString()));
            setType((route.params.item.type));
        }
    }, []);

    // Insert Loan
    const __insert = () => {
        insertLoans({
            to_user: to_user,
            amount: parseFloat(amount),
            type: type
        });
    }

    // Update Loan
    const __update = () => {
        updateLoans({
            id: route.params.item.id,
            to_user: to_user,
            amount: parseFloat(amount),
            type: type
        });
    }

    // Save Loan
    const __save = () => {
        setError(false);
        if (to_user.length === 0 || amount <= 0 || type.length === 0) {
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
            <BackHeader title={route.params?.item ? 'Edit Loan' : 'New Loan'}/>

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
                    <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>To</Text>
                    <TextInput
                        value={to_user}
                        placeholder='Enter name'
                        keyboardType='default'
                        onChangeText={(text) => setToUser(text)}
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
                    <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>Loaned through</Text>
                    <Picker
                        style={[styles.input, Typography.BODY]}
                        selectedValue={type}
                        onValueChange={(itemValue, itemIndex) =>
                            setType(itemValue)
                        }>
                        <Picker.Item label="Select Payment Method" value="0"/>
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

export default AddLoan;
 