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
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
                <Text>AllScreen</Text>
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
        全部试用: { screen: AllScreen },
        红包试用: { screen: MoneyScreen },
        报名试用: { screen: SignScreen },
        返现试用: { screen: ReturnScreen },
        有礼试用: { screen: GiftScreen }
    },

    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === '全部试用') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                }
                else if (routeName === '红包试用') {
                    iconName = `ios-aperture${focused ? '' : '-outline'}`;
                }
                else if (routeName === '报名试用') {
                    iconName = `ios-cart${focused ? '' : '-outline'}`;
                }
                else if (routeName === '返现试用') {
                    iconName = `ios-person${focused ? '' : '-outline'}`;
                }
                else if (routeName === '有礼试用') {
                    iconName = `ios-more${focused ? '' : '-outline'}`;
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={20} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: '#DC3C78',
            inactiveTintColor: 'gray',
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