import React from 'react';
import {TabBarBottom, TabNavigator} from 'react-navigation';
import {Text,ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class AllScreen extends React.Component {
    render() {
        return (
            <ScrollView>
            <Text>AllScreen</Text>
                <Text>AllScreen</Text>

            </ScrollView>
        );
    }
}

class MoneyScreen extends React.Component {
    render() {
        return (
            <Text>MoneyScreen</Text>
        );
    }
}
class SignScreen extends React.Component {
    render() {
        return (
            <Text>SignScreen</Text>
        );
    }
}


const TopTabNav = TabNavigator(
    {
        进行: { screen: AllScreen },
        完成: { screen: MoneyScreen },
        全部: { screen: SignScreen },
    },

    {
        navigationOptions: ({ navigation }) => ({
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: '#DC3C78',
            inactiveTintColor: 'gray',
            showIcon: 'false',
            showLabel: 'false',
            labelStyle: {
                fontSize: 15,
            },
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);

module.exports= TopTabNav;