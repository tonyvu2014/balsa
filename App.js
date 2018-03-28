import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import FeedsScreen from './screens/FeedsScreen';
import PreferencesScreen from './screens/PreferencesScreen';

const Root = TabNavigator (
  {
    Feeds: {
        screen: FeedsScreen,
        navigationOptions: {
          tabBarLabel: 'Feeds',
          tabBarIcon: ({ tintColor }) => <Icon name='list' size={35} color={tintColor}/>
        },
    },
    Preferences: {
        screen: PreferencesScreen,
        navigationOptions: {
          tabBarLabel: 'Preferences',
          tabBarIcon: ({tintColor}) => <Icon name='account-circle' size={35} color={tintColor} />
        },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <Root/>
  }
};
