import React from "react";
import {StyleSheet,Text, View, ScrollView, Button, AsyncStorage,Image,TextInput, Alert} from "react-native";
import deviceStorage from "../Login/jwt/services/deviceStorage";
import axios from 'axios';
import weburl from "../websettings";
import HttpGetPost from '../HttpGetPost';
var serverUrl = require("../websettings")
const addTbAccountUrl = serverUrl+'/m/addaccount';

var CommonCell = require('./CommonCell');
class Hometitle extends React.Component{
    render(){
        return(
            <View>// style={styles.HeaderTitle}
                <Text style={{color:'white',fontSize:17}}>
                    个人中心</Text>
            </View>
        )}}
class tbScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false,
            text:'',
            tbdata:'',
            token:''
        }
        this.verify = this.verify.bind(this)
    }
    verify(){
    	console.log(addTbAccountUrl)
        console.log(this.state.text)
        deviceStorage.get('token').then((GetToken) => {
            this.setState({token:GetToken})
            console.log(this.state.text)
            axios.post(addTbAccountUrl,{headers:{Authorization:this.state.token,version:'1.0',account:this.state.text,platform:'tb'}})
                .then(response => {
                	console.log(response.data)
                    this.setState({tbdata:response.data})
                    //this.setState({ImageMain:JSON.parse(this.state.productDetail['Details'])['mainImage']})
                    //this.setState({ImageDetails:JSON.parse(this.state.productDetail['Details'])['DetailsImage']})
                    console.log(this.state.tbdata)
                    if(this.state.tbdata.status === 1){
				        Alert.alert(
				            '绑定成功',
				            'alertMessage',
				            [
				                {text: '返回首页', onPress: () => this.props.navigation.navigate('index')}
				            ],
				            { cancelable: false }
				            )
				        }else{
				        Alert.alert(
				            '账号还没入库，请从新扫描二维码',
				            'alertMessage',
				            [
                                    {text: '确定', onPress: () => console.log('Cancel Pressed!')},
				            ],
				            { cancelable: false }
				            )				        }
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });

    }
    render(){
        return(
            <View style={{flex:1,flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}>
                <Image
		          style={{width: 150, height: 150}}
		          source={{uri: 'https://shiyong-1251434521.cos.ap-shanghai.myqcloud.com/alipay.png'}}
		        />
		        <Text>保存图片，请打开支付宝app，打开扫码二维码</Text>
              <View style={{padding: 10}}>
			      <TextInput
			        placeholder="请输入支付宝绑定的淘宝账号"
			        style={{height:40}}
			        onChangeText={(text) => this.setState({text})}
			        value={this.state.text}
			      />
			      <Text>{this.state.text}</Text>
                	<Button
			            onPress={() =>this.verify()}
			            title="Press Me"
			            color="#841584"
			          />
			      </View>
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

module.exports = tbScreen;