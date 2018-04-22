import React from 'react';
import { View, TextInput, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';

export default class TermAdditionBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          text: '',
        };
    }

    addTerm() {
        console.log('Adding term:', term)
        let term = this.state.text
        if (!term) {
            Alert.alert('Topic is empty')
            return
        }
        let newTerm = term.toLowerCase()
        AsyncStorage.getItem('preferences').then(value => {
            if (value) {
                let terms = value.split(',')
                if ( terms.indexOf(newTerm) > -1 ) {
                    return
                }
            }
            let preferences = value ? newTerm + ',' + value : newTerm
            console.log('Preferences', preferences) 
            AsyncStorage.setItem('preferences', preferences);
        }).done();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <TextInput
                    style={styles.input}
                    placeholder='What topic do you want to subscribe to?'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}/>
                </View>
                <View style={styles.action}>
                    <Icon name='add' underlayColor='#428bca' color='#fff' onPress={() => this.addTerm()}/>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    box: {
        flex: 0.8,
        justifyContent: 'center',
        backgroundColor:  '#f9f9f9',
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 4
    },

    input: {
        fontSize: 14,
        color: '#000'
    },

    action: {
        flex: 0.2,
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#428bca'
    }
})