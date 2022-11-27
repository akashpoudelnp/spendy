import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import BlockHeader from '../components/Headers/BlockHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Colors, Typography} from '../resources/styles';
import {useIsFocused, useNavigation} from "@react-navigation/native";

import {deleteLoans, getLoans,} from "../dbHelpers/loansHelper";

import SwipeableFlatList from "react-native-swipeable-list";
import QuickActions from "../resources/quickActions";
import {LinearGradient} from "expo-linear-gradient";
import LoanCard from "../components/Cards/LoanCard";

const Loans = () => {

    const navigation = useNavigation();
    const focused = useIsFocused();
    const [loans, setLoans] = useState([]);
    const [filteredLoan, setFilteredLoan] = useState(null);

    // Delete Item
    const __delete = (id) => {
        deleteLoans(id);
        getLoans(setLoans);
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate('AddLoan', {item: item});
    }

    useEffect(() => {
        getLoans(setLoans);
    }, [focused]);


    const filterByName = (value) => {
        let filteredLoans = loans.filter((item) => {
            return item.to_user.match(new RegExp(value, "i"))
        })

        setFilteredLoan(filteredLoans);
    }
    return (
        <View style={styles.container}>

            <View style={styles.bodyContainer}>

                <View>
                    <View style={{paddingLeft: 20}}>
                        <BlockHeader title='Loans'/>

                            <TextInput
                                onChangeText={(text) => filterByName(text)}
                                placeholder='Enter name'
                                keyboardType='default'
                                style={[styles.input, Typography.BODY]}
                                placeholderTextColor={Colors.GRAY_MEDIUM}
                            />

                    </View>
                </View>

                <SwipeableFlatList
                    data={filteredLoan ? filteredLoan.slice(0, 8) : loans.slice(0, 8)}
                    maxSwipeDistance={140}
                    shouldBounceOnMount={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderQuickActions={({index, item}) => QuickActions(item, __update, __delete)}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyContainer}>
                                <Text style={[Typography.TAGLINE, {color: Colors.WHITE, textAlign: 'center'}]}>
                                    <Icon name="info-circle" color={Colors.PRIMARY} size={25}/>
                                </Text>
                                <Text style={{color: Colors.GRAY_LIGHT, textAlign: "center", paddingVertical: 10}}>No
                                    loans found.</Text>
                            </View>
                        )
                    }}
                    renderItem={({item, index}) => {
                        return <LoanCard key={index} item={item}/>
                    }}
                />

                <View style={styles.floating}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#2E4135', '#2C754A']}
                        style={styles.button}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddLoan')}>
                            <Icon name="plus" color={Colors.WHITE} size={25}/>
                        </TouchableOpacity>
                    </LinearGradient>


                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingLeft: 0,
        paddingBottom: 0,
        backgroundColor: Colors.BLACK
    },
    emptyContainer: {
        padding: 20
    },
    button: {
        width: 60,
        height: 60,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    floating: {
        position: "absolute",
        top: "80%",
        left: "80%",
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        color: Colors.WHITE,
        backgroundColor: Colors.LIGHT_BLACK
    },
});

export default Loans;
