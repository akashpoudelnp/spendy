import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Colors, Typography} from '../../resources/styles';

const BlockHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={[Typography.H1, {color: Colors.WHITE}]}>{props.title}</Text>
            {props?.onPress ?
                <Pressable
                    style={styles.rowContainer}
                    onPress={props.onPress}>
                    <Text style={[Typography.H4, {
                        color: Colors.GRAY_MEDIUM,
                        marginRight: 5
                    }]}>{props.to ? props.to : 'All'}</Text>
                    <Icon name={props.icon ? props.icon : 'chevron-right'} color={Colors.GRAY_MEDIUM} size={15}/>
                </Pressable>
                : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 2,
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

export default BlockHeader;
