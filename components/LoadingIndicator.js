import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

export default loadIndicator = () => {
    return <ActivityIndicator
        color='#5cb85c'
        size='large'
        style={styles.indicator}/>
}

const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})