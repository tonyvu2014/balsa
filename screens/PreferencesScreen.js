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
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 30
    },

    box: {
        flex: 0.1,
    },

    list: {
        flex: 0.9,
    }
})

export default PreferencesScreen;
