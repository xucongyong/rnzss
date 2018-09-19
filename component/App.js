import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import React from 'react';
import { Text, Button, View, AppRegistry} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import deviceStorage from "./Login/jwt/services/deviceStorage";
import axios from 'axios';

// const device = {};

// device.DeviceID = DeviceInfo.getUniqueID();

//** --- input class --- **//
let Home = require('./Home/Home');
let Share = require('./Share/Share');
let TaskView = require('./TaskView/TaskView');
let Me = require('./Me/Me');
let ProductScreen = require('./Product/Product')
let OrderScreen = require('./Order/Order')
let MobileLoginScreen = require('./Login/MobileLogin')
let LoginScreen = require('./Login/Login')
let token = ''
let logined = false
deviceStorage.save('token', 'tokenvalue')
    .then((SaveToken)=>{
        console.log(SaveToken)
    });
deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log(GetToken)
        });
if (token !==null) {
    logined = false
} else {
    
}

const TabView = TabNavigator({
    试用: { screen: Home },
    分享: { screen: Share },
    订单: { screen: TaskView },
    我的: {
        screen: Me,
        navigationOptions: ({ navigation }) => (
            {
                iconName: 'ios-person',
                tabBarOnPress: () => {
                    if (logined == true) {
                        defaultHandler
                    }
                    else {
                        navigation.navigate('Login')
                    }
                },
            }
        ),
    }
},
    {
        initialRouteName: '试用',
    },
)

//AppRegistry.registerComponent('TabView', () => TabView);

// navigationOptions: ({ navigation }) => ({
//     tabBarIcon: ({ focused, tintColor }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         if (routeName === '试用') {
//             iconName = `ios-home${focused ? '' : '-outline'}`;
//         }
//         else if (routeName === '分享') {
//             iconName = `ios-aperture${focused ? '' : '-outline'}`;
//         }
//         else if (routeName === '订单') {
//             iconName = `ios-cart${focused ? '' : '-outline'}`;
//         }
//         else if (routeName === '我的') {
//             iconName = `ios-person${focused ? '' : '-outline'}`;
//         }
//         else if (routeName === '登陆') {
//             iconName = `ios-more${focused ? '' : '-outline'}`;
//         }

//         return <Ionicons name={iconName} size={25} color={tintColor} />;
//     },
// }),


const RootStack = StackNavigator(
    {
        TestMain: {
            screen: TabView,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        ProductScreen: {
            screen: ProductScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        MobileLogin: {
            screen: MobileLoginScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        Order: {
            screen: OrderScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
    },
    {
        initialRouteName: 'MobileLogin',
    }
)

export default class shop extends React.Component {
    render() {
        return (
            <RootStack />
        )
    }
}

