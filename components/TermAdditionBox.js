import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default class TermAdditionBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          text: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.box} 
                placeholder='What topic do you want to subscribe to?'
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                multiline={false}
                numberOfLines={1}/>
                <View style={styles.action}>
                    <Button title='+' color='#fff' onPress={() => {Alert.alert('Adding this item')}}></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    box: {
        flex: 8,
        backgroundColor:  '#f9f9f9',
        fontSize: 14,
        color: '#000',
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 4
    },

    action: {
        flex: 2,
        backgroundColor: '#428bca'
    }
})