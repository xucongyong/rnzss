import React from 'react';
import {TabBarBottom, TabNavigator} from 'react-navigation';
import {Text,ScrollView} from 'react-native';
import createReactClass from 'create-react-class';
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
class ReturnScreen extends React.Component {
    render() {
        return (
            <Text>ReturnScreen</Text>
        );
    }
}
class GiftScreen extends React.Component {
    render() {
        return (
            <Text>GiftScreen</Text>
        );
    }
}

const TopTabNav = TabNavigator(
    {
        全部: { screen: AllScreen },
        红包: { screen: MoneyScreen },
        报名: { screen: SignScreen },
        返现: { screen: ReturnScreen },
        有礼: { screen: GiftScreen }
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
            tabStyle: {
                width: 40,
            },
            labelStyle: {
                fontSize: 15,
            },
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);

const HomeNavigator = createReactClass({
    render(){
        return(
            <TopTabNav />
        )
    }
})


module.exports= HomeNavigator;