import React, {Component} from "react";
import {Text, View, Image, FlatList} from "react-native";
/**
 * ? Local Imports
 */
import styles, {
    _iconContainer,
    _unitTextStyle,
} from "./HorizontalList.style";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class HorizontalList extends Component {
    renderItem = (data) => {
        const {item, index} = data;
        const {icon, title, value, primaryColor} = item;
        const {
            TextComponent = Text,
            itemContainerStyle,
            titleTextStyle,
            valueTextStyle,
        } = this.props;
        return (
            <View
                key={item.title + index}
                style={[styles.itemContainer, itemContainerStyle]}
            >
                <TextComponent style={[styles.titleTextStyle, titleTextStyle]}>
                    {title}
                </TextComponent>
                <View style={styles.imageContainer}>
                    <View style={_iconContainer(primaryColor)}>
                        <Icon name={icon ? icon : 'rupee-sign'} color={primaryColor} size={30}/>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <TextComponent style={[styles.valueTextStyle, valueTextStyle]}>
                        Rs. {value}
                    </TextComponent>
                </View>
            </View>
        );
    };

    render() {
        const {data} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    horizontal
                    data={data}
                    renderItem={this.renderItem}
                    contentInset={styles.contentInsetStyle}
                    contentContainerStyle={styles.contentContainerStyle}
                    {...this.props}
                />
            </View>
        );
    }
}
