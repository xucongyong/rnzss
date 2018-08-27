import React from "react";

import {StyleSheet,Text, View, ScrollView, Button} from "react-native";
var CommonCell = require('./CommonCell');

class Hometitle extends React.Component{
    render(){
        return(
            <View style={styles.HeaderTitle}>
                <Text style={{color:'white',fontSize:17}}>
                    个人中心</Text>

            </View>
        )}}

export default class MeScreen extends React.Component{

    static navigationOptions =({
        headerTitle: <Hometitle/>, //<TextInput></TextInput>,
        // headerLeft: <HomeHeaderLeft />,
        // headerRight: <HomeHeaderRight />,
        headerStyle: {
            backgroundColor: '#DC3C78',}})
    render(){
        //console.log(this.openList)
        //console.log(this.props)
        //console.log('this.props')
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View>
                        <CommonCell
                            title={'余额提现'}
                        />
                        <CommonCell
                            title={'手机号'}
                        />
                        <CommonCell
                            title={'身份验证'}
                        />
                        <Button
                            title="登陆"
                            onPress={() => this.props.navigation.navigate('Details')}
                        />
                        <Button
                            title="注册"
                            onPress={() => this.props.navigation.navigate('Reg')}
                        />
                        <Button
                            title="首页"
                            onPress={() => this.props.navigation.navigate('Login')}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    HeaderTitle: {
        width: 250,
        height: 30,
        //backgroundColor:'white',
        justifyContent:'center',
        borderRadius: 18,
        alignItems: 'center',
        paddingLeft: 8,

}});

module.exports = MeScreen;