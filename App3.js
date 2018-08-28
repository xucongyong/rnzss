import React from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
//import HttpUtils from './HttpUtils'
import { StackNavigator, TabNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
    // static navigationOptions = ({
    //     headerTitle: <Text>'121212' </Text>,
    // })

    render() {
        return(
            <View>
                <Text>HomeScreen</Text>

                    <Button
                        title="goBack"
                        onPress={() => this.props.navigation.goBack()}/>
                    <Button
                        title="ModalScreen"
                        onPress={() => this.props.navigation.navigate('MyModal')}/>
            </View>
        )}
    };

class DetailsScreen extends React.Component {
    // static navigationOptions = ({
    //     headerTitle: <Text>'121212' </Text>,
    // })
    render() {
        return(
            <View>
                <Text>DetailsScreen</Text>
                    <Button
                        title="goBack"
                        onPress={() => this.props.navigation.goBack()}/>
                    <Button
                        title="ModalScreen"
                        onPress={() => this.props.navigation.navigate('MyModal')}/>
            </View>
        )}
};

class ModalScreen extends React.Component {
    static navigationOptions = ({
        headerTitle: <Button
                        title="首页"
                        onPress={() => this.props.navigation.goBack()}/>,
    })
    render() {
        return(
            <View>
                <Button
                    title="goBack"
                    onPress={() => this.props.navigation.goBack()}/>
                <Button
                    title="ModalScreen"
                    onPress={() => this.props.navigation.navigate('MyModal')}/>
                <Text>MODAL</Text>
            </View>
        )}
};

const TabNavigator1 = TabNavigator({
    Home: {
        screen: HomeScreen,
    },
    Details: {
        screen: DetailsScreen,
    }},
);


const MainStack = TabNavigator({
    Home: {
        screen: TabNavigator1,
    },
    Details: {
        screen: DetailsScreen,
    }},
);



const RootStack = StackNavigator({
    Main: {
        screen: MainStack,
    },
    MyModal: {
        screen: ModalScreen,
    },

},
{
    mode: 'modal',
    headerMode: 'none',
}
);



export default class App extends React.Component{
    render() {
        return(
            <RootStack />)
}}



