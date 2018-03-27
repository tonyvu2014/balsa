import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';

export default class ArticleItem extends React.Component {

    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.heading}>{this.props.title}</Text>
                <Text style={styles.desc}>{this.props.desc}</Text>
                <View style={styles.link}>
                    <Button title='Learn More' color='#5bc0de' onPress={() => { Linking.openURL(this.props.url) }}/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        flex: 1,
        borderRadius: 4,
        backgroundColor: '#428bca',
        padding:10,
        marginTop: 5,
        marginBottom: 5
    },
  
    desc: {
        fontSize: 14,
        color: '#fff'
    },
    
    heading: {
        fontSize: 18,
        color: '#f9f9f9',
        fontWeight: 'bold',
        paddingBottom: 5
    },

    link: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
});