import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

export default class TermItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.term}>{this.props.term}</Text>
                <Button title='x' color='#000' onPress={() => {Alert.alert('Deleting this item')}}></Button>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9'
    },

    term: {
        color: '#000',
        fontSize: 14
    }
})