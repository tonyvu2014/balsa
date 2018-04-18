import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import FeedsScreen from './screens/FeedsScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import ReaderScreen from './screens/ReaderScreen';

const FeedsStack = StackNavigator({
  Feeds: {
    screen: FeedsScreen,
    navigationOptions: {
      title: 'Feeds'
    },
  },
  Reader: {
    screen: ReaderScreen,
    navigationOptions: {
      title: 'Article'
    }
  },
});

const Root = TabNavigator (
  {
    Feeds: {
        screen: FeedsStack,
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
