import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// const device = {};
// device.DeviceID = DeviceInfo.getUniqueID();

//** --- input class --- **//
let task = require('./task/task');
let TaskView = require('./TaskView/TaskView');
let TaskDetailsScreen = require('./TaskDetails/TaskDetails');
let ResultView = require('./TaskDetails/ResultView');
let MeScreen = require('./Me/me_nav');
let verify_screen = require('./Me/verify');
let card_screen = require('./Me/card');
let money_screen = require('./Me/money');

let addTbAccountScreen = require('./Me/AddTbAccount');
let AddJdAccountScreen = require('./Me/AddJdAccount');
let ProductScreen = require('./Product/Product')
let OrderScreen = require('./Order/Order')
let MobileLoginScreen = require('./Login/MobileLogin')
let LoginScreen = require('./Login/Login')

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function getHeaderTitle(route) {
    // Access the tab navigator's state using `route.state`
    const routeName = route.state
        ? // Get the currently active route name in the tab navigator
        route.state.routes[route.state.index].name
        : // If state doesn't exist, we need to default to the initial screen
          // In our case, it's "Feed" as that's the first screen inside the navigator
        '';
    switch (routeName) {
        case '免费折扣':
            return '免费折扣';
        default:
            return routeName;
    }
}

function TabView() {
    return (
        <Tab.Navigator
            lazy={true}
            >
            <Tab.Screen name="红包试用" component={task} />
            <Tab.Screen name="免费折扣" component={task} />
            <Tab.Screen name="订单" component={TaskView} />
            <Tab.Screen name="我的" component={MeScreen} />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <NavigationNativeContainer>
            <Stack.Navigator >
                <Stack.Screen name="index" component={TabView}
                      options={({ route }) => ({
                          headerTitle: getHeaderTitle(route),
                         })}/>
                <Stack.Screen name="verify" component={verify_screen} options={{ title:"验证"}}/>
                <Stack.Screen name="card" component={card_screen} options={{ title:"卡"}}/>
                <Stack.Screen name="money" component={money_screen} options={{ title:"金额"}}/>
                <Stack.Screen name="ProductScreen" component={ProductScreen}  options={{ title:"产品"}}/>
                <Stack.Screen name="Order" component={OrderScreen}  options={{ title:"任务页"}}/>
                <Stack.Screen name="TaskDetails" component={TaskDetailsScreen}   options={{ title:"任务"}}/>
                <Stack.Screen name="ResultView" component={ResultView} />
                <Stack.Screen name="MobileLogin" component={MobileLoginScreen}  options={{ title:"验证码登录"}}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{ title:"登录"}}/>
                <Stack.Screen name="addTbAccount" component={addTbAccountScreen}  options={{ title:"淘宝账号"}}/>
                <Stack.Screen name="addJdAccount" component={AddJdAccountScreen}  options={{ title:"京东账号"}}/>
            </Stack.Navigator>
        </NavigationNativeContainer>
    );
}
Stack.navigiatonOptions = ({navigation}) => {
    console.log("navigation:"+navigation)
    let { routeName } = navigation.state.routes[navigation.state.index];
    console.log("routeName:"+routeName)
    if (routeName === 'Home') {
        // etc...
    }}
// const TabView = createBottomTabNavigator({
//     红包试用: { screen: task1,
//         navigationOptions: ({ navigation }) => ({
//                 tabBarOnPress: ({ navigation, defaultHandler }) => {
//                     deviceStorage.get('token').then((GetToken) => {
//                     token = GetToken
//                 })
//                 if (token === '' || token=== n ull) {navigation.navigate('Login')
//                     }else {defaultHandler(); }}
//                 })
//     },
//     免费折扣: { screen: task2,
//         navigationOptions:
//             {tabBarOnPress: ({ navigation, defaultHandler }) => {
//                     deviceStorage.get('token').then((GetToken) => {
//                     token = GetToken
//                     })
//                     if (token === '' || token=== null) {navigation.navigate('Login')
//                         }else {defaultHandler(); }}
//
//     }},
//     订单: { screen: TaskView,
//         navigationOptions: ({ navigation }) => ({
//                 tabBarOnPress: ({ navigation, defaultHandler }) => {
//                     deviceStorage.get('token').then((GetToken) => {
//                     token = GetToken
//                     })
//                     if (token === '' || token=== null) {navigation.navigate('Login')
//                         }else {defaultHandler(); }}
//                     })
//     },
//     我的: { screen: MeScreen,
//         navigationOptions: ({ navigation }) => ({
//                 tabBarOnPress: ({ navigation, defaultHandler }) => {
//                     deviceStorage.get('token').then((GetToken) => {
//                     token = GetToken
//                     })
//                     if (token === '' || token=== null) {navigation.navigate('Login')
//                         }else {defaultHandler();
//
//     {
//         initialRouteName: '红包试用',
//         lazy:true,
//     },
// });
//
// const RootStack = createStackNavigator({
//         index: {screen: TabView},
//         //身份证验证银行卡验证
//         verify: { screen: verify_screen},
//         //身份证验证银行卡验证
//         card: { screen: card_screen},
//         //提现页面
//         money: { screen: money_screen
//          },
//         //产品页
//         ProductScreen: {screen: ProductScreen},
//         //订单
//         Order: {screen: OrderScreen},
//         //任务详情页
//         TaskDetails: {screen: TaskDetailsScreen},
//         ResultView: {screen: ResultView},
//         //手机号登录
//         MobileLogin: {screen: MobileLoginScreen},
//         //密码登录
//         Login: {screen: LoginScreen},
//         //绑定tb账号
//         addTbAccount: {screen: addTbAccountScreen},
//         addJdAccount:{screen: AddJdAccountScreen}
//         }
// )

// export default class shop extends React.Component {
//     render() {
//         return (
//             <RootStack />
//         )
//     }
// }

export default App;
