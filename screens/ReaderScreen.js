import React from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import { AdMobBanner } from 'expo';
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
            <View style={styles.banner}>
                <AdMobBanner
                    style={styles.banner}
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    didFailToReceiveAdWithError={() => {console.log('Error showing ad')}}
                />
            </View>
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
        justifyContent: 'center'
    },

    banner: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})