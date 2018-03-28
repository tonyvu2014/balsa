import React from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import TermItem from '../components/TermItem';

class PreferencesScreen extends React.Component {

    render() {
        return (
            <ScrollView>
                <FlatList data={[
                    {key: 1, term: 'cryptocurrency'},
                    {key: 2, term: 'startup'}
                ]}
                renderItem={({item}) =><TermItem term={item.term}/>}
                />
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default PreferencesScreen;
