import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

export default class TermItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.term}>{this.props.term}</Text>
                </View>
                <View style={styles.action}>
                    <Icon raised size={16} name='remove' underlayColor='#fff' color='#5cb85c' onPress={() => {this.props.action(this.props.term)}}/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#5cb85c',
        paddingTop: 3,
        paddingBottom: 3,
        marginTop: 10
    },

    content: {
        flex: 0.8,
        justifyContent: 'center',
    },

    term: {
        paddingLeft: 5,
        paddingRight: 5,
        color: '#fff',
        fontSize: 16
    },

    action: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#5cb85c'
    }
})