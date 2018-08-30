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
                <Text>empter</Text>
                {console.log(this.props)}
                {console.log(this.props)}

                <Button
                    title="goBack"
                    onPress={() => this.props.navigation.goBack()}/>
                <Button
                    title="ModalScreen"
                    onPress={() => this.props.navigation.navigate('ModalScreen')}/>
                <Text>ModalScreen1</Text>
                <Button
                    title="ModalScreen1"
                    onPress={() => this.props.navigation.navigate('ModalScreen1')}/>
                <Button
                    title="ModalScreen2"
                    onPress={() => this.props.navigation.navigate('ModalScreen2')}/>
                <Button
                    title="Details"
                    onPress={() => this.props.navigation.navigate('Details')}/>

                <Button
                    title="SubHome"
                    onPress={() => this.props.navigation.navigate('SubHome')}/>
                <Button
                    title="SubDetails1"
                    onPress={() => this.props.navigation.navigate('SubDetails1')}/>
            </View>
        )}}

class DetailsScreen extends React.Component {
    static navigationOptions = ({
        headerTransparent:'true'
    })
    render() {
        return(
            <View>
            <Text>empter</Text>
        {console.log(this.props)}
        {console.log(this.props)}

        <Button
            title="goBack"
            onPress={() => this.props.navigation.goBack()}/>
        <Button
        title="ModalScreen"
        onPress={() => this.props.navigation.navigate('ModalScreen')}/>
        <Text>ModalScreen1</Text>
        <Button
        title="ModalScreen1"
        onPress={() => this.props.navigation.navigate('ModalScreen1')}/>
        <Button
            title="ModalScreen2"
            onPress={() => this.props.navigation.navigate('ModalScreen2')}/>
        <Button
        title="Details"
        onPress={() => this.props.navigation.navigate('Details')}/>

        <Button
            title="SubHome"
            onPress={() => this.props.navigation.navigate('SubHome')}/>
        <Button
        title="SubDetails1"
        onPress={() => this.props.navigation.navigate('SubDetails1')}/>
            </View>
    )}}


class ModalScreen extends React.Component {
    static navigationOptions = ({
        headerRight: <Button
                        title="首页"
                        onPress={() => this.props.navigation.goBack()}/>,
        headerTransparent:'true'
    })
    render() {
        return(
            <View>
                <Text>empter</Text>
                {console.log(this.props)}
                {console.log(this.props)}

                <Button
                    title="goBack"
                    onPress={() => this.props.navigation.goBack()}/>
                <Button
                    title="ModalScreen"
                    onPress={() => this.props.navigation.navigate('ModalScreen')}/>
                <Text>ModalScreen1</Text>
                <Button
                    title="ModalScreen1"
                    onPress={() => this.props.navigation.navigate('ModalScreen1')}/>
                <Button
                    title="ModalScreen2"
                    onPress={() => this.props.navigation.navigate('ModalScreen2')}/>
                <Button
                    title="Details"
                    onPress={() => this.props.navigation.navigate('Details')}/>

                <Button
                    title="SubHome"
                    onPress={() => this.props.navigation.navigate('SubHome')}/>
                <Button
                    title="SubDetails1"
                    onPress={() => this.props.navigation.navigate('SubDetails1')}/>
            </View>
        )}}

class ModalScreen1 extends React.Component {
    static navigationOptions = ({
        headerRight: <Button
            title="首页"
            onPress={() => this.props.navigation.goBack()}/>,
        headerTransparent:'true'
    })
    render() {
        return(
            <View>
                <Text>empter</Text>
                {console.log(this.props)}
                {console.log(this.props)}

                <Button
                    title="goBack"
                    onPress={() => this.props.navigation.goBack()}/>
                <Button
                    title="ModalScreen"
                    onPress={() => this.props.navigation.navigate('ModalScreen')}/>
                <Text>ModalScreen1</Text>
                <Button
                    title="ModalScreen1"
                    onPress={() => this.props.navigation.navigate('ModalScreen1')}/>
                <Button
                    title="ModalScreen2"
                    onPress={() => this.props.navigation.navigate('ModalScreen2')}/>
                <Button
                    title="Details"
                    onPress={() => this.props.navigation.navigate('Details')}/>

                <Button
                    title="SubHome"
                    onPress={() => this.props.navigation.navigate('SubHome')}/>
                <Button
                    title="SubDetails1"
                    onPress={() => this.props.navigation.navigate('SubDetails1')}/>
            </View>
        )}}

class ModalScreen2 extends React.Component {
    static navigationOptions = ({
        headerRight: <Button
            title="首页"
            onPress={() => this.props.navigation.goBack()}/>,
        headerTransparent:'true'
    })
    render() {
        return(
            <View>
                <Text>empter</Text>
                {console.log(this.props)}
                {console.log(this.props)}

                <Button
                    title="goBack"
                    onPress={() => this.props.navigation.goBack()}/>
                <Button
                    title="ModalScreen"
                    onPress={() => this.props.navigation.navigate('ModalScreen')}/>
                <Text>ModalScreen1</Text>
                <Button
                    title="ModalScreen1"
                    onPress={() => this.props.navigation.navigate('ModalScreen1')}/>
                <Button
                    title="ModalScreen2"
                    onPress={() => this.props.navigation.navigate('ModalScreen2')}/>
                <Button
                    title="Details"
                    onPress={() => this.props.navigation.navigate('Details')}/>

                <Button
                    title="SubHome"
                    onPress={() => this.props.navigation.navigate('SubHome')}/>
                <Button
                    title="SubDetails1"
                    onPress={() => this.props.navigation.navigate('SubDetails1')}/>
            </View>
        )}}

const TabNavigator1 = TabNavigator({
    SubHome: {
        screen: HomeScreen,
    },
    SubDetails1: {
        screen: DetailsScreen,
    }},
);

const StackNavigator1 = StackNavigator({
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
     MainStack: {
        screen: MainStack,
    },
    ModalScreen: {
        screen: ModalScreen,
    },
    ModalScreen1: {
        screen: ModalScreen1,
    },
    ModalScreen2: {
        screen: ModalScreen2,
    },
},
{
    initialRouteName: 'ModalScreen',
    //headerMode: 'none',
}
);



export default class App extends React.Component{
    render() {
        return(
            <RootStack />)
}}



