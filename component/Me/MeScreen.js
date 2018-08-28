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

class MeScreen extends React.Component{

    static navigationOptions =({
        headerTitle: <Hometitle/>, //<TextInput></TextInput>,
        headerLeft:  <Button
            title="ModalScreen"
            onPress={() => this.props.navigation.navigate('MyModal')}/>,
        // headerRight: <HomeHeaderRight />,
        headerStyle: {
            backgroundColor: '#DC3C78',}})
    render(){
        console.log('this.openList')
        console.log(this.props.navigation)
        console.log(this.props)
        console.log('this.props')
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
                            title="订单"
                            onPress={() => this.props.navigation.navigate('订单')}
                        />
                        <Button
                            title="ModalScreen"
                            onPress={() => this.props.navigation.navigate('MyModal')}/>
                        <Button
                            title="ProductScreen"
                            onPress={() => this.props.navigation.navigate('Product')}/>
                        <Button
                            title="Order"
                            onPress={() => this.props.navigation.navigate('Order')}/>
                        <Button
                            title="LoginAndReg"
                            onPress={() => this.props.navigation.navigate('LoginAndReg')}/>
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