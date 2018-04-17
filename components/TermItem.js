import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

export default class TermItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.term}>{this.props.term}</Text>
                </View>
                <View style={styles.action}>
                    <Button title='x' color='#5cb85c' onPress={() => {Alert.alert('Deleting this item')}}></Button>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 10,
        backgroundColor: '#5cb85c',
        marginTop: 5,
        paddingTop: 3,
        paddingBottom: 3
    },

    content: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 8,
        paddingLeft: 3
    },

    term: {
        color: '#fff',
        fontSize: 14
    },

    action: {
        flex: 2
    }
})