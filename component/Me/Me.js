import React from "react";
import {StyleSheet,Text, View, ScrollView, Button, AsyncStorage} from "react-native";
import deviceStorage from "../Login/jwt/services/deviceStorage";

var CommonCell = require('./CommonCell');
class Hometitle extends React.Component{
    render(){
        return(
            <View>// style={styles.HeaderTitle}
                <Text style={{color:'white',fontSize:17}}>
                    个人中心</Text>
            </View>
        )}}
class MeScreen extends React.Component{
        constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false
        }
    }

    static navigationOptions =({
        headerTitle: <Hometitle/>,
        headerStyle: {
        backgroundColor: '#DC3C78',}
        })
        render(){
            return(
                <View style={{flex:1}}>
                    <ScrollView>
                        <View>
                            <CommonCell
                                title={'余额提现'}
                            />
                            <CommonCell
                                title={'账号'}
                            />
                            <CommonCell
                                title={'微信'}
                            />
                            <CommonCell
                                title={'手机'}
                            />
                            <CommonCell
                                title={'实名验证'}
                            />
                            <Button
                                title="ProductScreen"
                                onPress={() => this.props.navigation.navigate('ProductScreen',
                                    {productID:812,
                                        imageUrl:'https://www.baidu.com/img/bd_logo1.png'
                                    })}
                                />
                            <Button
                                title="Order"
                                onPress={() => this.props.navigation.navigate('Order')}/>
                            <Button
                                title="Login"
                                onPress={() => this.props.navigation.navigate('Login')}/>
                            <Button
                                title="Reg"
                                onPress={() => this.props.navigation.navigate('Reg')}/>
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
}})

module.exports = MeScreen;