import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation'; // Version can be specified in package.json
import React from 'react';
import {Text, Button, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

//** --- input class --- **//
var Home = require('./component/Home/Home');
var Share = require('./component/Share/Share');
var Order = require('./component/Order/Order');
var Me = require('./component/Me/Me');


class ModalScreen extends React.Component {
    static navigationOptions = ({
        headerTitle: <Button
            title="首页"
            onPress={() => this.props.navigation.goBack()}/>,
    })
    render() {
        return(
            <View>
                <Text>MODAL</Text>
                <Text>MODAL</Text>
                <Text>MODAL</Text>

                <Button
                    title="goBack"
                    onPress={() => this.props.navigation.goBack()}/>
                <Button
                    title="ModalScreen"
                    onPress={() => this.props.navigation.navigate('MyModal')}/>
            </View>
        )}
};

const TabView = TabNavigator(
    {
        试用: { screen: Home },
        分享: { screen: Share },
        订单: { screen: Order },
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
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#DC3C78',
            inactiveTintColor: 'gray',
        },
    }
)


const RootStack = StackNavigator(
    {
        Main: {
            screen: TabView,
        },
        MyModal: {
            screen: ModalScreen,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
)

export default class shop extends React.Component{
    render(){
        return(
            <RootStack/>
        )
    }
}

