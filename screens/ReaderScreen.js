import React from 'react';
import { WebView, StyleSheet } from 'react-native';

class Reader extends React.Component {
    render() {
        return <WebView source = {this.props.url} style = {styles.viewer}/>
    }
}

const styles = StyleSheet.create({
    viewer: {
        marginTop: 10,
        marginBottom: 10
    }
})