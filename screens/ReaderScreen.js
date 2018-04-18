import React from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import loadIndicator from '../components/LoadingIndicator';

export default class ReaderScreen extends React.Component {
    render() {
        return (
        <WebView 
            source = {{uri: this.props.navigation.state.params.url}} 
            javaScriptEnabled={true}
            domStorageEnabled={true}
            renderLoading={loadIndicator} 
            startInLoadingState={true}  
            style={styles.viewer}
            scalesPageToFit={true}
        />
        )
    }
}

const styles = StyleSheet.create({
    viewer: {
        marginTop: 10,
        marginBottom: 10
    }
})