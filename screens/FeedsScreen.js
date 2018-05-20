import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Button, AsyncStorage } from 'react-native'
import { AdMobBanner } from 'expo'
import axios from 'axios'
import ArticleItem from '../components/ArticleItem'
import loadIndicator from '../components/LoadingIndicator'


const FEED_URL = 'http://localhost:8000/api/feeds'
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

    getFeeds() {
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
                <View style={styles.errorContainer}>
                    <Text style={styles.error}>Something went wrong. Please try again later.</Text>
                </View>
            )      
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.list}>
                        <FlatList
                        data={this.state.feeds}
                        renderItem={({item}) =><ArticleItem title={item.title} url={item.url} action={this.onReadMore}/>}
                        />
                    </ScrollView>
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

    list: {
        flex: 0.9
    },

    banner: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    errorContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    error: {
        color: '#D9534F',
        fontSize: 14
    }
});

export default FeedsScreen;