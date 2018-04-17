import React from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import TermItem from '../components/TermItem';
import TermAdditionBox from '../components/TermAdditionBox';

class PreferencesScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.box}>
                <TermAdditionBox/>
            </View>
            <ScrollView contentContainerStyle={styles.list}>
                <FlatList data={[
                    {key: 1, term: 'cryptocurrency'},
                    {key: 2, term: 'startup'}
                ]}
                renderItem={({item}) =><TermItem term={item.term}/>}
                />
            </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 10,
        paddingTop: 30,
        backgroundColor: '#fff'
    },

    box: {
        flex: 1
    },

    list: {
        flex: 9
    }
})

export default PreferencesScreen;
