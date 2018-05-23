import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Button, AsyncStorage } from 'react-native'
import { AdMobBanner } from 'expo'
import { Icon } from 'react-native-elements';
import axios from 'axios'
import RefreshButton from '../components/RefreshButton';
import ArticleItem from '../components/ArticleItem'
import loadIndicator from '../components/LoadingIndicator'


const FEED_URL = 'http://67.209.122.81:8000/api/feeds'
const LIMIT = 20
const TIMEOUT = 10000


class FeedsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          feeds: [],
          isLoading: true,
          hasError: false
        };
    }

    componentDidMount() {
        this.getFeeds()
    }

    getFeeds = () => {
        let feeds = []
        this.setState({ isLoading: true, hasError: false })
        AsyncStorage.getItem('preferences')
        .then(value => {
            console.log('Value:', value)
            let terms = value.split(',')
            axios.post(FEED_URL, {
                terms: terms,
                limit: LIMIT
            }, 
            {'timeout': TIMEOUT})
            .then(res => {
                let data = res.data
                for (let i = 0; i < data.length; i++) {
                    feeds.push({
                        key: i,
                        title: data[i].title,
                        url: data[i].link
                    })
                }
                this.setState({ feeds: feeds, isLoading: false, hasError: false })
            })
            .catch(err => {
                console.log(err)
                this.setState({ isLoading:false, hasError: true })
            })
        })
    }

    onReadMore = (url) => {
        this.props.navigation.navigate('Reader', { url });
    };

    render() {
        if (this.state.isLoading) {
            const activityIndicator = loadIndicator();
            return activityIndicator
        } else if (this.state.hasError){
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.error}>Something went wrong. Please try again later.</Text>
                    <RefreshButton action={this.getFeeds}/>
                </View>
            )      
        } else if (this.state.feeds.length == 0) {
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.notification}>No articles at the moment. Refresh or go to Preferences to update your subscription.</Text>
                    <RefreshButton action={this.getFeeds}/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <RefreshButton action={this.getFeeds}/>
                    <ScrollView contentContainerStyle={styles.list}>
                        <FlatList
                        data={this.state.feeds}
                        renderItem={({item}) =><ArticleItem title={item.title} url={item.url} action={this.onReadMore}/>}
                        />
                    </ScrollView>
                    <AdMobBanner style={styles.banner}
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-3940256099942544/6300978111"
                        didFailToReceiveAdWithError={() => {console.log('Error showing ad')}}
                    />
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    list: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },

    banner: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    messageContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    error: {
        color: '#D9534F',
        textAlign: 'center',
        fontSize: 14
    },

    notification: {
        color: '#428bca',
        fontSize: 14,
        textAlign: 'center'
    }
});

export default FeedsScreen;