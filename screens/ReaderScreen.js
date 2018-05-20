import React from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import loadIndicator from '../components/LoadingIndicator';

export default class ReaderScreen extends React.Component {
    render() {
        return (
        <View style={styles.container}>
            <WebView 
                source = {{uri: this.props.navigation.state.params.url}} 
                javaScriptEnabled={true}
                domStorageEnabled={true}
                renderLoading={loadIndicator} 
                startInLoadingState={true}  
                style={styles.viewer}
                scalesPageToFit={true}
            />
            <AdMobBanner
                style={styles.banner}
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                didFailToReceiveAdWithError={() => {console.log('Error showing ad')}}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },

    viewer: {
        flex: 0.9,
        marginTop: 10,
        marginBottom: 10
    },

    banner: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})