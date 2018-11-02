import { createBottomTabNavigator, createStackNavigator} from 'react-navigation'; // Version can be specified in package.json
import React from 'react';
import { Text, Button, View, AppRegistry} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import deviceStorage from "./Login/jwt/services/deviceStorage";

// const device = {};
// device.DeviceID = DeviceInfo.getUniqueID();

//** --- input class --- **//
let Home = require('./Home/Home');
let Share = require('./Share/Share');
let TaskView = require('./TaskView/TaskView');
let MeScreen = require('./Me/Me');
let addTbAccountScreen = require('./Me/AddTbAccount');
let ProductScreen = require('./Product/Product')
let OrderScreen = require('./Order/Order')
let MobileLoginScreen = require('./Login/MobileLogin')
let LoginScreen = require('./Login/Login')
let token = ''
deviceStorage.get('token').then((GetToken) => {
        token = GetToken
        console.log(token=== '')
        console.log(token=== null)
        console.log(token)
        });


const TabView = createBottomTabNavigator({
    试用: { screen: Home,
        navigationOptions: ({ navigation }) => ({
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    if (token === '' || token=== null) {navigation.navigate('Login')
                        }else {defaultHandler(); }}
                    })
    },
    分享: { screen: Share,
        navigationOptions: ({ navigation }) => ({
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    if (token === '' || token=== null) {navigation.navigate('Login')
                        }else {defaultHandler(); }}
                    })
    },
    订单: { screen: TaskView,
        navigationOptions: ({ navigation }) => ({
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    if (token === '' || token=== null) {navigation.navigate('Login')
                        }else {defaultHandler(); }}
                    })
    },
    我的: { screen: MeScreen,
        navigationOptions: ({ navigation }) => ({
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    if (token === '' || token=== null) {navigation.navigate('Login')
                        }else {defaultHandler(); }}
                    })
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

const RootStack = createStackNavigator(
    {
        TestMain: {
            screen: TabView,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //产品页
        ProductScreen: {
            screen: ProductScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //订单
        Order: {
            screen: OrderScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //任务详情页
        TaskDetail: {
            screen: LoginScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //手机号登录
        MobileLogin: {
            screen: MobileLoginScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //密码登录
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //绑定tb账号
        addTbAccount: {
            screen: addTbAccountScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
     },
    {
        initialRouteName: 'TestMain',
    }
)

export default class shop extends React.Component {
    render() {
        return (
            <RootStack />
        )
    }
}

