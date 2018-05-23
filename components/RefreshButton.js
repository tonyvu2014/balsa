import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class RefreshButton extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Icon name='refresh' onPress={()=>this.props.action()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        justifyContent: 'center',
        borderRadius: 4,
        height: 40,
        width: 60,
        backgroundColor: '#5cb85c'
    }
});