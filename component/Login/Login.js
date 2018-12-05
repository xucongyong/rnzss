import React from "react";
import {StyleSheet, View, Button, TextInput,Text} from 'react-native';
import axios from 'axios';
import deviceStorage from "./jwt/services/deviceStorage";
import {NavigationActions,StackActions} from 'react-navigation';
var serverUrl = require("../websettings")
var loginUrl = serverUrl+"/login"
import DeviceInfo from 'react-native-device-info';

const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'index' })],
    });

class LoginTitle extends React.Component{
    render(){
        return(
            <Button 
                title="goBac1k"
                onPress={() => navigation.goBack()}/>
        )}}

class IndexTitle extends React.Component{
    render(){
        return(
            <Button 
                title="goBack"
                onPress={() => this.props.navigation.goBack()}/>
        )}}

class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            token: '',
            ip:'',
        }
        // this.loginUser = this.loginUser.bind(this);
        this.loginUserNode = this.loginUserNode.bind(this);
        this.loginVerify=this.loginVerify.bind(this)
        DeviceInfo.getIPAddress()
         .then(ip => {
                 this.setState({ip:ip})
                 console.log(this.state.ip)
                });
    };
    static navigationOptions={
        HeaderTitle:'注册页面',
        };
    //django restframework API
    loginUser() {
        console.log('loginUser:'+loginUrl)
        this.setState({error:'', loading:true});
        axios.post(loginUrl,{
        username: username,
        password: password
        })
        .then((response)=> {
            if (response.data.token) {
            deviceStorage.save('token', response.data.token);
            this.props.newJWT(response.data.token);
            } else {
               console.log('response.data');

            }
        })
        .catch((error) => {
            console.log(error);
        })
            }
    //NodeJS API
    loginUserNode() {
        const{ username, password, error} = this.state;
        axios.post(loginUrl,{
            username: username,
            password: password,
            ip:this.state.ip,
            UniqueID:DeviceInfo.getUniqueID(),// e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
            Manufacturer:DeviceInfo.getManufacturer(),  // e.g. Apple
            Brand:DeviceInfo.getBrand(),  // e.g. Apple / htc / Xiaomi
            Model:DeviceInfo.getModel(),  // e.g. iPhone 6
            DeviceID:DeviceInfo.getDeviceId(),  // e.g. iPhone7,2 / or the board on Android e.g. goldfish
            SystemName:DeviceInfo.getSystemName(),  // e.g. iPhone OS
            SystemVersion:DeviceInfo.getSystemVersion(),  // e.g. 9.0
            BundleID:DeviceInfo.getBundleId(), // e.g. com.learnium.mobile
            BuildNumber:DeviceInfo.getBuildNumber(),  // e.g. 89
            AppVersion:DeviceInfo.getVersion(),  // e.g. 1.1.0
            DeviceName:DeviceInfo.getDeviceName(),  // e.g. Becca's iPhone 6
            UserAgent:DeviceInfo.getUserAgent(), // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)
            DeviceLocale:DeviceInfo.getDeviceLocale(), // e.g en-US
            DeviceCountry:DeviceInfo.getDeviceCountry(), // e.g US
            Timezone:DeviceInfo.getTimezone(), // e.g America/Mexico_City
            emulator:DeviceInfo.isEmulator(), // if app is running in emulator return true
        })
        .then((response) => {
          if (response.data.state==0||response.data.state==1) {
            this.setState({message: response.data.message});
          }  else if (response.data.state==2) {
              deviceStorage.save('token', response.data.token);
              this.props.navigation.dispatch(resetAction);
            }

          //deviceStorage.saveKey("token", response.data.token);
          //this.props.newJWT(response.data.token);
          //this.setState(token:response.data)
        })
        .catch(function (error) {
            console.log(error);
          });

     }

    loginVerify() {
        if(this.state.username.length !== 11) {
            this.setState({message:'请输入正确的手机号'});
            return;
        }
        if(this.state.password.length < 6) {
                this.setState({message:'密码大于5位'});
                return;
            }
        var PATTERN_CHINATELECOM = /^1\d{10}$/; //电信号
        if (PATTERN_CHINATELECOM.test(this.state.username) === false) {
                this.setState({message:'请输入正确的手机号'});
                return;
          }
        this.loginUserNode()
    }
    render(){
        return(
            <View style={styles.LoginPage}>
            <View style={styles.loginSection}>
                <Text style={styles.loginTitle}> 登录 </Text>

              <TextInput style={styles.textinput}
                label='username'
                keyboardType={'numeric'}
                placeholder="请输入手机号或账户"
                maxLength={11}
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
            <TextInput style={styles.textinput}
              placeholder="请输入密码"
              secureTextEntry={true}
              label='password'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />

            <View style={styles.subButton}>
                <Button 
                    title='登陆'
                    onPress= {() => this.loginVerify()}
                    />
                <Button
                    color='#56688a'
                    title="手机登录"
                    onPress={() => this.props.navigation.navigate('MobileLogin')}
                />
            </View>
                <Text style ={styles.message}>{this.state.message}</Text>
                </View>
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
    fontSize: 38,
    fontWeight: '500',
    marginTop: 80,
    textAlign: 'center',
    marginBottom: 80,
  },
  subButton: {
    color: '#56688a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput:{
    marginBottom: 8
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

module.exports = LoginScreen;
