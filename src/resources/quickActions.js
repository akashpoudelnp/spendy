import React from 'react';
import {
    View,
    StyleSheet, Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from "./styles";

const QuickActions = (item, updateItem, deleteItem) => {
    return (
        <View style={styles.container}>
            <View style={[styles.button]}>
                <Pressable onPress={() => updateItem(item)}>
                    <Icon name="pen" color={Colors.PRIMARY} size={15} />
                </Pressable>
            </View>
            <View style={[styles.button]}>
                <Pressable onPress={() => deleteItem(item.id)}>
                    <Icon name="trash" color={Colors.ALERT} size={15} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        width: 60,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default QuickActions;