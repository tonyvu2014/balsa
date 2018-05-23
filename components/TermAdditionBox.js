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
                    <Icon name='add' underlayColor='#428bca' color='#fff' onPress={() => {this.props.action(this.state.text); this.setState({text: ''});}}/>
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