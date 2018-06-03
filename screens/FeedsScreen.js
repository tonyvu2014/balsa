import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Button, AsyncStorage } from 'react-native'
import { AdMobBanner } from 'expo'
import { Icon } from 'react-native-elements';
import axios from 'axios'
import RefreshButton from '../components/RefreshButton';
import ArticleItem from '../components/ArticleItem'
import loadIndicator from '../components/LoadingIndicator'


const FEED_URL = 'http://localhost:8000/api/feeds'
const LIMIT = 20
const TIMEOUT = 10000


class FeedsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            tabBarOnPress({ jumpToIndex, scene }) {
                params.onTabFocus();
                jumpToIndex(scene.index);
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
          feeds: [],
          isLoading: true,
          hasError: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onTabFocus: this.getFeeds
        });
        this.getFeeds()
    }

    getFeeds = () => {
        let feeds = []
        this.setState({ isLoading: true, hasError: false })
        AsyncStorage.getItem('preferences')
        .then(value => {
            console.log('FeedsScreen - preferences:', value)
            if (value) {
                console.log('FeedsScreen - loading feeds...')
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
                console.log('FeedsScreen - loading feeds is done')
            } else {
                this.setState({
                    isLoading: false
                })
            }
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
                    <Text style={styles.error}>Something went wrong. Please refresh or try again later.</Text>
                    <View style={styles.refresh}>
                        <RefreshButton action={this.getFeeds}/>
                    </View>
                </View>
            )      
        } else if (this.state.feeds.length == 0) {
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.notification}>No articles at the moment. Please refresh or go to Preferences to update your subscription.</Text>
                    <View style={styles.refresh}>
                        <RefreshButton action={this.getFeeds}/>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.refresh}>
                        <RefreshButton action={this.getFeeds}/>
                    </View>
                    <FlatList contentContainerStyle={styles.list}
                    data={this.state.feeds}
                    renderItem={({item}) =><ArticleItem title={item.title} url={item.url} action={this.onReadMore}/>}
                    />
                    <View style={styles.banner}>
                        <AdMobBanner
                            bannerSize="fullBanner"
                            adUnitID="ca-app-pub-3940256099942544/6300978111"
                            didFailToReceiveAdWithError={() => {console.log('Error showing ad')}}
                        />
                    </View>
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
        alignItems: 'stretch',
        justifyContent: 'center'
    },

    refresh: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,  
    },

    list: {
        justifyContent: 'center',
        alignItems: 'stretch',
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