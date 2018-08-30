import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation'; // Version can be specified in package.json
import React from 'react';
import {Text, Button, View, AppRegistry } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

//** --- input class --- **//
var Home = require('./component/Home/Home');
var Share = require('./component/Share/Share');
var TaskView = require('./component/TaskView/TaskView');
var Me = require('./component/Me/Me');
var ProductScreen = require('./component/Product/Product')
var OrderScreen = require('./component/Order/Order')
var LoginRegScreen = require('./component/Login/LoginAndRegViews')
var LoginScreen = require('./component/Login/Login')

const TabView = TabNavigator(
    {
        试用: { screen: Home },
        分享: { screen: Share },
        订单: { screen: TaskView },
        我的: { screen: Me },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === '试用') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                }
                else if (routeName === '分享') {
                    iconName = `ios-aperture${focused ? '' : '-outline'}`;
                }
                else if (routeName === '订单') {
                    iconName = `ios-cart${focused ? '' : '-outline'}`;
                }
                else if (routeName === '我的') {
                    iconName = `ios-person${focused ? '' : '-outline'}`;
                }
                else if (routeName === '登陆') {
                    iconName = `ios-more${focused ? '' : '-outline'}`;
                }

                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        initialRouteName: '试用',
    }
)



const RootStack1 = StackNavigator(
    {
        ProductScreen:{
            screen: ProductScreen,
        },
        LoginAndReg: {
            screen: LoginScreen,
        },
        Order: {
            screen: OrderScreen,
        },
    },
    {
        //initialRouteName: 'ProductScreen',
        headerMode: 'none',
        //headerTransparent:true,
    }
)


const RootStack = StackNavigator(
    {
        TestMain:{
            screen: TabView,
            navigationOptions:{
                headerTransparent:true,
            }
        },
        RootStack1:{
            screen: RootStack1,
            navigationOptions:{
                headerTransparent:true,
            }
        },
    },
    {
        //initialRouteName: 'ProductScreen',
        //headerMode: 'none',
        //headerTransparent:true,
    }
)

// const testRootStackx = StackNavigator(
//     {
//         TabView: {
//             screen: TabView,
//         },
//         Hellowork:{
//             screen: RootStack,
//         }
//     }
// )



export default class shop extends React.Component{
    render(){
        return(
            <RootStack/>
        )
    }
}

