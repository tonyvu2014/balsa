import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';

export default class ArticleItem extends React.Component {

    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.heading}>{this.props.title}</Text>
                <View style={styles.link}>
                    <Button title='Read More' color='#5bc0de' onPress={() => this.props.action(this.props.url)} />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        flex: 1,
        borderRadius: 4,
        backgroundColor: '#428bca',
        padding:10,
        marginTop: 8
    },

    heading: {
        fontSize: 16,
        color: '#f9f9f9',
        paddingBottom: 3
    },

    link: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});