import React from 'react';
import { WebView, StyleSheet } from 'react-native';

export default class ReaderScreen extends React.Component {
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