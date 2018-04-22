import React from 'react';
import { View, ScrollView, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import TermItem from '../components/TermItem';
import TermAdditionBox from '../components/TermAdditionBox';

class PreferencesScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          terms: [],
        };
    }

    componentDidMount() {
        this.setTerms()
    }

    setTerms() {
        this.getTerms()
    }

    getTerms() {
        AsyncStorage.getItem('preferences').then(value => {
            console.log('Retrieved preferences:', value)
            if (value) {
                let terms = []
                let prefs = value.split(',')
                for (let i = 0; i < prefs.length; i++) {
                    terms.push({key: i, term: prefs[i]})
                }
                this.setState({terms: terms})
            } else {
                this.setState({terms: []})
            }
        })
    }

    addTerm = (term) => {
        if (!term) {
            Alert.alert('Topic is empty')
            return
        }
        let newTerm = term.toLowerCase()
        AsyncStorage.getItem('preferences').then(value => {
            if (value) {
                let prefs = value.split(',')
                if ( prefs.indexOf(newTerm) > -1 ) {
                    return
                }
            }
            let preferences = value ? newTerm + ',' + value : newTerm
            let terms = []
            let prefs = preferences.split(',')
            for (let i = 0; i < prefs.length; i++) {
                terms.push({key: i, term: prefs[i]})
            }
            this.setState({terms: terms})
            AsyncStorage.setItem('preferences', preferences);
        }).done();
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.box}>
                <TermAdditionBox action={this.addTerm}/>
            </View>
            <ScrollView contentContainerStyle={styles.list}>
                <FlatList data={this.state.terms}
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
        marginTop: 5
    },

    box: {
        flex: 0.1,
        marginTop: 10,
        marginBottom: 10
    },

    list: {
        flex: 0.9,
    }
})

export default PreferencesScreen;
