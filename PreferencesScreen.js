import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TermItem from './components/TermItem';

class PreferencesScreen extends React.Component {
    static navigationOptions = {
        title: 'Your Preferences',
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={[
                    {key: 1, term: 'cryptocurrency'},
                    {key: 2, term: 'startup'}
                ]}
                renderItem={({item}) =><TermItem term={item.term}/>}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default StackNavigator({
    Preferences: {
      screen: PreferencesScreen,
    },
});
