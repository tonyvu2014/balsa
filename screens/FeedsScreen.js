import React from 'react';
import { StyleSheet, FlatList, ScrollView, Button, AsyncStorage } from 'react-native';
import axios from 'axios'
import ArticleItem from '../components/ArticleItem'


const FEED_URL = 'http://localhost:8000/api/feeds'
const LIMIT = 50

class FeedsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          feeds: [],
        };
    }

    componentDidMount() {
        this.getFeeds()
    }

    getFeeds() {
        let feeds = []
        AsyncStorage.getItem('preferences').then(value => {
            let terms = value.split(',')
            axios.post(FEED_URL, {
                terms: terms,
                limit: LIMIT
            }).then(res => {
                let data = res.data
                for (let i = 0; i < data.length; i++) {
                    console.log('Title:', data[i].title)
                    feeds.push({
                        key: i,
                        title: data[i].title,
                        description: data[i].description,
                        url: data[i].link
                    })
                }
                this.setState({feeds: feeds})
            }).catch(err => {
                console.log(err)
            })
        })
    }

    onReadMore = (url) => {
        this.props.navigation.navigate('Reader', { url });
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
              <FlatList
              data={this.state.feeds}
              renderItem={({item}) =><ArticleItem title={item.title} desc={item.description} url={item.url} action={this.onReadMore}/>}
              />
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center'
    }
});

export default FeedsScreen;