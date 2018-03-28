import React from 'react';
import { StyleSheet, FlatList, ScrollView, Button } from 'react-native';
import ArticleItem from '../components/ArticleItem'

class FeedsScreen extends React.Component {
    render() {
        return (
            <ScrollView>
              <FlatList
              data={[
                {key: 1, title: 'Facebook is in trouble', description: 'Facebook CEO Mark Zuckeberg apologizes for the recent data breach', url: 'https://www.facebook.com'},
                {key: 2, title: 'Vuejs is taking over Reactjs', description: 'Vuejs is gaining popularity', url: 'https://www.medium.com'}
              ]}
              renderItem={({item}) =><ArticleItem title={item.title} desc={item.description} url={item.url}/>}
              />
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FeedsScreen;