import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text, Pressable
} from 'react-native';

import TransactionCard from '../components/Cards/TransactionCard';
import BlockHeader from '../components/Headers/BlockHeader';

import {Typography, Colors} from '../resources/styles';
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {deleteSpendings, getSpendings} from "../dbHelpers/spendingsHelper";
import SwipeableFlatList from "react-native-swipeable-list";
import QuickActions from "../resources/quickActions";
import Icon from "react-native-vector-icons/FontAwesome5";

const AllSpendings = () => {

    const navigation = useNavigation();
    const focused = useIsFocused();

    // Delete Item
    const __delete = (id) => {
        deleteSpendings(id);
        getSpendings(setSpendings);
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate('AddSpending', {item: item});
    }

    const [spendings, setSpendings] = useState([]);

    useEffect(() => {
        getSpendings(setSpendings);
    }, [focused]);

    return (
        <View style={styles.container}>
            <View style={styles.bodyContainer}>
                <SwipeableFlatList
                    style={{flex: 1,marginBottom: 20}}
                    data={spendings}
                    maxSwipeDistance={140}
                    shouldBounceOnMount={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderQuickActions={({index, item}) => QuickActions(item, __update, __delete)}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                <View style={{paddingLeft: 20}}>
                                    <View style={styles.headerContainer}>
                                        <Text style={[Typography.H1, {color: Colors.WHITE}]}>All Spendings</Text>
                                            <Pressable
                                                style={styles.rowContainer}
                                                onPress={() => navigation.navigate('Home')}>
                                                <Icon name="chevron-left" color={Colors.GRAY_MEDIUM} size={25}/>
                                            </Pressable>
                                    </View>
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
                                <Text style={{color:Colors.GRAY_LIGHT,textAlign:"center",paddingVertical:10}}>No spendings today.</Text>
                            </View>
                        )
                    }}
                    renderItem={({item, index}) => {
                        return <TransactionCard key={index} item={item}/>
                    }}
                />
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
    headerContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.BLACK
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default AllSpendings;
