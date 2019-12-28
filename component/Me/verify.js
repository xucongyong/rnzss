import React from 'react';
import {StyleSheet, View, TextInput,Text,ActivityIndicator } from 'react-native';
import {Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import axios from 'axios';
import deviceStorage from "../Login/jwt/services/deviceStorage";
import CountDownButton from 'react-native-smscode-count-down';
import AsyncStorage from '../Login/AsyncStorage';
let serverUrl = require("../websettings");

class verifyscreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            mobile: '',
            identitynumber: '',
            card: '',
            message: '',
            token: '',
            VerifyCode:'',
            isLoading:false,
            isVerify:false,
            isVerify_number:'已发送',
        }
        this.loginUserNode = this.loginUserNode.bind(this);
        this.SendSms=this.SendSms.bind(this)
        this.fetchData=this.fetchData.bind(this)
  }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        this.setState({isLoading:true})
        deviceStorage.get('token').then((Token) => {
            axios.get(serverUrl+'/m/username',{headers:{authorization:Token}})
                .then(response=>{
                    console.log(response.data)
                    if(response.data.identity_number){
                        this.setState({identitynumber:response.data.identity_number})
                        this.setState({name:response.data.Name})
                    }
                })
                .catch((error) => {
                  console.log('error:'+error)})
        })
        this.setState({isLoading:false})
    }
    //NodeJS API
    loginUserNode() {
        this.setState({loading:true})
        if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.state.identitynumber)==false) {
                this.setState({message:'身份证号不正确'});
                return;
            }
        if (/^\d{5,6}$/.test(this.state.VerifyCode) === false) {
                this.setState({message:'验证码不正确'})
                return
          }
        if (/^1\d{10}$/.test(this.state.mobile) === false) {
                this.setState({message:'请输入正确的手机号。'})
                return
          }
        deviceStorage.get('token').then((token) => {
            var LoginData =  {headers:{Authorization:token},
                data:{mobile: this.state.mobile,
                identitynumber: this.state.identitynumber,
                VerifyCode: this.state.VerifyCode,
                card: this.state.card,
                name: this.state.name}
            }
            axios.post(serverUrl+'/verifycard', LoginData)
                  .then(response=>{
                      console.log(response.data)
                      if(response.data==="0"){
                          this.props.navigation.navigate('Login')
                      }else if(response.data=="") {
                          this.props.navigation.navigate('ResultView')
                      }else{
                          this.setState({message:response.data});
                      }
                  })
                .catch((error) => {
                  this.setState({message: '网络问题，重新提交'});
                });
          })
        this.setState({loading:false})
    }

    //send sms
    SendSms() {
        if (/^1\d{10}$/.test(this.state.mobile) === false) {
            return this.setState({message:'请输入正确的手机号。'})
        }
        this.setState({isVerify:true})
        axios({ method: 'POST',
          url: serverUrl+'/sms',
          data: {
            username: this.state.mobile
           }})
        .then((response) => {
          if (response.data.message==='no') {
            this.setState({message: '重试一次'});
          }  else if (response.data.message==='yes') {
            this.setState({message: '验证码发送'});
            }
        })
        .catch((error) => {
          this.setState({message: '网络问题，重新提交'});
        });
    }

    render(){
        let ViewCode
        let sms_button
        if(!this.state.isVerify){
            sms_button=(<Button
                type="ghost"
                size={'large'}
                onPress={()=>{this.SendSms()}}>验证码</Button>)
        }else{
            sms_button=(<Button
                type="ghost"
                size={'large'}
                disabled
                >{this.state.isVerify_number}</Button>)
        }

        if(this.state.isLoading==false){
            ViewCode = (
                <View style={styles.LoginPage}>
                    <View style={styles.loginSection}>
                        <Text style={styles.loginTitle}> 实名验证 </Text>
                        <Text style={styles.loginSubTitle}>为确保提现安全，需验证账号、银行卡、身份必须一致。</Text>
                        <Text style={styles.loginSubTitle}></Text>
                        <TextInput style={styles.textinput}
                                   placeholder="姓名"
                                   label='name'
                                   value={this.state.name}
                                   onChangeText={name => this.setState({ name })}
                        />
                        <TextInput style={styles.textinput}
                                   placeholder="身份证号"
                                   label='identitynumber'
                                   value={this.state.identitynumber}
                                   onChangeText={identitynumber => this.setState({ identitynumber })}
                        />
                        <TextInput style={styles.textinput}
                                   placeholder="银行卡号"
                                   label='card'
                                   value={this.state.card}
                                   onChangeText={card => this.setState({ card })}
                        />
                        <TextInput style={styles.textinput}
                                   label='username'
                                   keyboardType={'numeric'}
                                   placeholder="请输入银行绑定手机号"
                                   maxLength={11}
                                   value={this.state.mobile}
                                   onChangeText={mobile => this.setState({ mobile })}
                        />
                        <View style={styles.subButton}>
                            <TextInput style={{padding:20}}
                                       placeholder="请输入验证码"
                                       keyboardType={'numeric'}
                                       maxLength={6}
                                       label='VerifyCode'
                                       value={this.state.VerifyCode}
                                       onChangeText={VerifyCode => this.setState({ VerifyCode })}
                            />
                            {sms_button}
                        </View>
                        <View style={styles.subButton}>
                            <Button
                                type="primary"
                                onPress={
                                    this.loginUserNode
                                }
                            >验证添加</Button>
                        </View>
                        <Text style ={styles.message}>{this.state.message}</Text>
                    </View>
                </View>
            )
        }else{
            ViewCode = (
                <ActivityIndicator color="#DC3C78" style={{marginTop:100}}/>
                )
        }

        return(
            <View style={{flex:1}}>
                {ViewCode}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  LoginPage: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  },
  loginSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20
  },
  loginTitle: {
    color: '#DC3C78',
    fontSize: 20,
    fontWeight: '400',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginSubTitle: {
    color: '#DC3C78',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 5,
  },
  subButton: {
    color: '#56688a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 8
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput:{
    marginBottom: 15
  },
    button: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
    message:{
    marginTop: 16,
    color: '#56688a',
    fontSize: 16
    },
})

module.exports = verifyscreen;


