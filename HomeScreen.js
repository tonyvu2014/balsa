import React from 'react';
import { StyleSheet, FlatList, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ArticleItem from './components/ArticleItem'


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <View style={styles.container}>
      <FlatList
      data={[
        {key: 1, title: 'Facebook is in trouble', description: 'Facebook CEO Mark Zuckeberg apologizes for the recent data breach', url: 'https://www.facebook.com'},
        {key: 2, title: 'Vuejs is taking over Reactjs', description: 'Vuejs is gaining popularity', url: 'https://www.medium.com'}
      ]}
      renderItem={({item}) =><ArticleItem title={item.title} desc={item.description} url={item.url}/>}
      />
      <Button title='Preferences' onPress={() => {this.props.navigation.navigate('Preferences')}}/>     
      </View>
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

export default StackNavigator({
    Home: {
      screen: HomeScreen,
    },
});
