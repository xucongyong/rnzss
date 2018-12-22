import React from 'react';
import {StyleSheet, View, Button, TextInput,Text,ActivityIndicator } from 'react-native';
import {NavigationActions,StackActions} from 'react-navigation';
import axios from 'axios';
import deviceStorage from "../Login/jwt/services/deviceStorage";
import CountDownButton from 'react-native-smscode-count-down'
import AsyncStorage from '../Login/AsyncStorage'
let serverUrl = require("../websettings")
let mobileLoginUrl = serverUrl+'/verifycard'
let usernameUrl = serverUrl+'/m/username'

const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'index' })],
    });
const querystring = require('querystring');

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
        }
        this.loginUserNode = this.loginUserNode.bind(this);
        this.SendSms=this.SendSms.bind(this)
        this.fetchData=this.fetchData.bind(this)
  }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            this.setState({token:GetToken})
            axios.get(usernameUrl,{headers:{authorization:token}})
                .then(response=>{
                    console.log(response.data)
                    console.log(response.data)
                    if(response.data.identity_number){
                        this.setState({identitynumber:response.data.identity_number})
                        this.setState({name:response.data.Name})
                        this.setState({isVerify:true})
                    }
                    this.setState({isLoading:true})
                })
                .catch((error) => {
                  console.log('error:'+error)})
        })
    }
    //NodeJS API
    loginUserNode() {
        console.log('loginUserNode')
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
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            this.setState({token:GetToken})
            var LoginData =  {
                        mobile: this.state.mobile,
                        identitynumber: this.state.identitynumber,
                        VerifyCode: this.state.VerifyCode,
                        card: this.state.card,
                        name: this.state.name,
                        authorization:this.state.token,
                       }
            console.log(LoginData)
            axios.post(mobileLoginUrl, LoginData)
                  .then(response=>{
                      console.log(response.data)
                      console.log(response.data)
                      if (response.data.state==0||response.data.state==1) {
                      this.setState({message: response.data.message});
                    }  else if (response.data.state==2) {
                      this.props.navigation.navigate('index')
                      }
                    })
            .catch((error) => {
              console.log('error:'+error)
              this.setState({message: '网络问题，重新提交'});
              this.onLoginFail();
            });
          })
    }
      
    //send sms  
    SendSms() {

        // if(this.state.username.length !== 11) {
        //     this.setState({message:'请输入正确的手机号'});
        //     return;
        // }
        // if(this.state.password.length < 6) {
        //         this.setState({message:'密码大于5位'});
        //         return;
        //     }
        // if(this.state.password !==this.state.password1 ) {
        //         this.setState({message:'请输入2个相同的密码'});
        //         return;
        //     }
        if (/^1\d{10}$/.test(this.state.mobile) === false) {
                this.setState({message:'请输入正确的手机号。'})
                return
          }
        console.log('this.state.mobile:'+this.state.mobile)
        axios({ method: 'POST', 
          url: serverUrl+'/sms', 
          data: { 
            username: this.state.mobile
           }})
 
        .then((response) => {
          console.log(response)
          if (response.data.message==='no') {
            this.setState({message: '重试一次'});
          }  else if (response.data.message==='yes') {
            this.setState({message: '验证码发送'});
              //this.props.navigation.dispatch(resetAction);
            }

          //AsyncStorage.saveKey("token", response.data.token);
          //this.props.newJWT(response.data.token);
          //this.setState(token:response.data)
        })
        .catch((error) => {
          this.setState({message: '网络问题，重新提交'});
          this.onLoginFail();
        });
    }

    render(){
        let ViewCode
        if(this.state.isLoading==true){
            if(this.state.isVerify==false){
                ViewCode = (
                       <View style={styles.LoginPage}>
                        <View style={styles.loginSection}>
                            <Text style={styles.loginTitle}> 实名验证 </Text>
                            <Text style={styles.loginSubTitle}>账号、银行卡、身份必须一致。</Text>
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
                          <CountDownButton
                              style={{width: 120,marginRight: 8}}
                              textStyle={{color: '#DC3C78'}}
                              timerCount={60}
                              timerTitle={'获取验证码'}
                              //enable={this.loginVerifyx()}
                              enable={/^1\d{10}$/.test(this.state.mobile)}
                              //enable={this.loginVerify()}
                              onClick={(shouldStartCountting)=>{
                                //随机模拟发送验证码成功或失败
                                const requestSucc = Math.random() > 0.5;
                                  shouldStartCountting(requestSucc);
                                  this.SendSms()
                              }}
                              timerEnd={()=>{
                                this.setState({
                                  state: '倒计时结束'
                                })
                              }}/>
                        </View>
                        <View style={styles.subButton}>
                          <Button
                            title='验证添加'
                            onPress={
                              this.loginUserNode
                            }
                            />
                        </View>
                        <Text style ={styles.message}>{this.state.message}</Text>
                            </View>
                        </View>
                )
            }else if(this.state.isVerify==true){
                ViewCode = (
                       <View style={styles.LoginPage}>
                        <View style={styles.loginSection}>
                            <Text style={styles.loginTitle}> 绑定银行卡 </Text>
                            <Text style={styles.loginSubTitle}>账号、银行卡、身份必须一致。</Text>
                        <Text>姓名：{this.state.name}</Text>
                        <Text>证件：{this.state.identitynumber}</Text>
                        <TextInput style={styles.textinput}
                          placeholder="银行卡号"
                          label='card'
                          value={this.state.card}
                          onChangeText={card => this.setState({ card })}
                        />
                        <TextInput style={styles.textinput}
                            label='mobile'
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
                          <CountDownButton
                              style={{width: 120,marginRight: 8}}
                              textStyle={{color: '#DC3C78'}}
                              timerCount={60}
                              timerTitle={'获取验证码'}
                              //enable={this.loginVerifyx()}
                              enable={/^1\d{10}$/.test(this.state.mobile)}
                              //enable={this.loginVerify()}
                              onClick={(shouldStartCountting)=>{
                                //随机模拟发送验证码成功或失败
                                const requestSucc = Math.random() > 0.5;
                                  shouldStartCountting(requestSucc);
                                  this.SendSms()
                              }}
                              timerEnd={()=>{
                                this.setState({
                                  state: '倒计时结束'
                                })
                              }}/>
                        </View>
                        <View style={styles.subButton}>
                          <Button
                            title='验证添加'
                            onPress={
                              this.loginUserNode
                            }
                            />
                        </View>
                        <Text style ={styles.message}>{this.state.message}</Text>
                            </View>
                        </View>
                )
            }
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


