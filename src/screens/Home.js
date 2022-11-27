import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text, TouchableOpacity
} from 'react-native';

import TransactionCard from '../components/Cards/TransactionCard';
import HomeHeader from '../components/Headers/HomeHeader';
import BlockHeader from '../components/Headers/BlockHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Typography, Colors} from '../resources/styles';
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {
    deleteSpendings,
    getMonthTotal,
    getTodaysSpendings,
    getTodaysTotal,
    getWeekTotal
} from "../dbHelpers/spendingsHelper";
import SwipeableFlatList from "react-native-swipeable-list";
import QuickActions from "../resources/quickActions";
import HorizontalList from "../components/Cards/HorizontalList";
import {LinearGradient} from "expo-linear-gradient";
import {getTotalLoans} from "../dbHelpers/loansHelper";

const Home = () => {

    const navigation = useNavigation();
    const focused = useIsFocused();
    const [spendings, setSpendings] = useState([]);
    const [todaysCount, setTodayCount] = useState(0);
    const [weekCount, setWeekCount] = useState(0);
    const [monthCount, setMonthCount] = useState(0);
    const [totalLoan, setTotalLoan] = useState(0);

    // Delete Item
    const __delete = (id) => {
        deleteSpendings(id);
        getTodaysTotal(setTodayCount);
        getWeekTotal(setWeekCount);
        getMonthTotal(setMonthCount);
        getTodaysSpendings(setSpendings);
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate('AddSpending', {item: item});
    }
    const staticData = [
        {
            title: "Today's Spendings",
            value: todaysCount ? todaysCount : 0,
            primaryColor: "#10CFE4",
            icon: 'rupee-sign',
        },
        {
            title: "Weekly Spendings",
            value: weekCount ? weekCount : 0,
            primaryColor: "#c84cf0",
            icon: 'rupee-sign',
        },
        {
            title: "Monthly Spendings",
            value: monthCount ? monthCount : 0,
            primaryColor: "#10E471",
            icon: 'rupee-sign',
        },
        {
            title: "Total Loaned",
            value: totalLoan ? totalLoan : 0,
            primaryColor: "#bec",
            icon: 'rupee-sign',
        },
    ];

    useEffect(() => {
        getTodaysTotal(setTodayCount);
        getWeekTotal(setWeekCount);
        getTotalLoans(setTotalLoan);
        getMonthTotal(setMonthCount);
        getTodaysSpendings(setSpendings);
    }, [focused]);

    return (
        <View style={styles.container}>
            <HomeHeader/>

            <View style={styles.bodyContainer}>
                <SwipeableFlatList
                    data={spendings.slice(0, 5)}
                    maxSwipeDistance={140}
                    shouldBounceOnMount={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderQuickActions={({index, item}) => QuickActions(item, __update, __delete)}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                <HorizontalList data={staticData}/>

                                <View style={{paddingLeft: 20}}>
                                    <BlockHeader title='Your Spendings'
                                                 onPress={() => navigation.navigate('AllSpendings')}/>
                                </View>
                            </View>
                        )
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyContainer}>
                                <Text style={[Typography.TAGLINE, {color: Colors.WHITE, textAlign: 'center'}]}>
                                    <Icon name="info-circle" color={Colors.PRIMARY} size={25}/>
                                </Text>
                                <Text style={{color: Colors.GRAY_LIGHT, textAlign: "center", paddingVertical: 10}}>No
                                    spendings today.</Text>
                            </View>
                        )
                    }}
                    renderItem={({item, index}) => {
                        return <TransactionCard key={index} item={item}/>
                    }}
                />

                <View style={styles.floating}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#2E4135', '#2C754A']}
                        style={styles.button}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddSpending')}>
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
    }
});

export default Home;
