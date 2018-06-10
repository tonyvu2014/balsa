import React from 'react';
import { View, Alert, ScrollView, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { AdMobBanner } from 'expo';
import TermItem from '../components/TermItem';
import TermAdditionBox from '../components/TermAdditionBox';

const AD_UNIT = 'ca-app-pub-3940256099942544/6300978111'

class PreferencesScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          terms: [],
        };
    }

    componentDidMount() {
        this.getTerms()
    }

    getTerms() {
        AsyncStorage.getItem('preferences')
        .then(value => {
            if (value) {
                console.log('PreferencesScreen - preferences:', value)
                let terms = []
                let prefs = value.split(',')
                for (let i = 0; i < prefs.length; i++) {
                    terms.push({key: i, term: prefs[i]})
                }
                this.setState({terms: terms})
            } else {
                this.setState({terms: []})
            }
        }).done()
    }

    addTerm = (term) => {
        if (!term) {
            Alert.alert('Topic is empty')
            return
        }
        let newTerm = term.toLowerCase()
        AsyncStorage.getItem('preferences')
        .then(value => {
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

    removeTerm = (term) => {
        if (!term) {
            Alert.alert('Topic is empty')
            return
        }

        let targetTerm = term.toLowerCase()
        AsyncStorage.getItem('preferences').then(value => {
            if (!value) {
                return
            }     

            let prefs = value.split(',')
            let index = prefs.indexOf(targetTerm)
            if ( index > -1 ) {
                prefs.splice(index, 1)
                let preferences = prefs.join(',')
                let terms = []
                for (let i = 0; i < prefs.length; i++) {
                    terms.push({key: i, term: prefs[i]})
                }
                this.setState({terms: terms})
                AsyncStorage.setItem('preferences', preferences);
            }
        }).done();

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <TermAdditionBox action={this.addTerm}/>
                </View>
                <FlatList
                    data={this.state.terms}
                    renderItem={({item}) =><TermItem term={item.term} action={this.removeTerm}/>}
                />
                <View style={styles.banner}>
                    <AdMobBanner
                        bannerSize="fullBanner"
                        adUnitID={AD_UNIT}
                        didFailToReceiveAdWithError={() => {console.log('Error showing ad')}}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },

    box: {
        marginTop: 50,
        marginBottom: 20
    },

    banner: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PreferencesScreen;
