import React from 'react';
import {StyleSheet, View, Button, TextInput,Text, } from 'react-native';
import {NavigationActions,StackActions} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import CountDownButton from 'react-native-smscode-count-down'
import AsyncStorage from './AsyncStorage'
var serverUrl = require("../websettings")
var mobileLoginUrl = serverUrl+'mobilelogin'


console.log("Device Unique ID", DeviceInfo.getUniqueID());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
// * note this is IDFV on iOS so it will change if all apps from the current apps vendor have been previously uninstalled
 
console.log("Device Manufacturer", DeviceInfo.getManufacturer());  // e.g. Apple
 
console.log("Device Brand", DeviceInfo.getBrand());  // e.g. Apple / htc / Xiaomi
 
console.log("Device Model", DeviceInfo.getModel());  // e.g. iPhone 6
 
console.log("Device ID", DeviceInfo.getDeviceId());  // e.g. iPhone7,2 / or the board on Android e.g. goldfish
 
console.log("System Name", DeviceInfo.getSystemName());  // e.g. iPhone OS
 
console.log("System Version", DeviceInfo.getSystemVersion());  // e.g. 9.0
 
console.log("Bundle ID", DeviceInfo.getBundleId());  // e.g. com.learnium.mobile
 
console.log("Build Number", DeviceInfo.getBuildNumber());  // e.g. 89
 
console.log("App Version", DeviceInfo.getVersion());  // e.g. 1.1.0
 
console.log("App Version (Readable)", DeviceInfo.getReadableVersion());  // e.g. 1.1.0.89
 
console.log("Device Name", DeviceInfo.getDeviceName());  // e.g. Becca's iPhone 6
 
console.log("User Agent", DeviceInfo.getUserAgent()); // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)
 
console.log("Device Locale", DeviceInfo.getDeviceLocale()); // e.g en-US
 
console.log("Device Country", DeviceInfo.getDeviceCountry()); // e.g US
 
console.log("Timezone", DeviceInfo.getTimezone()); // e.g America/Mexico_City
 
console.log("App Instance ID", DeviceInfo.getInstanceID()); // ANDROID ONLY - see https://developers.google.com/instance-id/
 
console.log("App is running in emulator", DeviceInfo.isEmulator()); // if app is running in emulator return true
 
console.log("App is running on a tablet", DeviceInfo.isTablet()); // if app is running on a tablet return true



const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'index' })],
    });
const querystring = require('querystring');

class RegScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            password1: '',
            message: '',
            token: '',
            VerifyCode:'',
            ip:DeviceInfo.getIPAddress(),
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
        }
        this.loginUserNode = this.loginUserNode.bind(this);
        this.SendSms=this.SendSms.bind(this)
  }
    //NodeJS API
    loginUserNode() {
        console.log('loginUserNode')
        if(this.state.username.length !== 11) {
            this.setState({message:'请输入正确的手机号'});
            return;
        }
        if(this.state.password.length < 6) {
                this.setState({message:'密码大于5位'});
                return;
            }
        if(this.state.password !==this.state.password1 ) {
                this.setState({message:'请输入2个相同的密码'});
                return;
            }
        if (/^\d{6}$/.test(this.state.VerifyCode) === false) {
                this.setState({message:'验证码不正确'})
                return
          }
        if (/^1\d{10}$/.test(this.state.username) === false) {
                this.setState({message:'请输入正确的手机号。'})
                return
          }

        var LoginData =  {
                    username: this.state.username,
                    password: this.state.password,
                    VerifyCode: this.state.VerifyCode,
                   }
        axios.post(mobileLoginUrl, LoginData)
          .then((response) => {
            if (response.data.message==='no') {
              this.setState({message: '验证码错误'});
            }  else if (response.data.message==='yes') {
                AsyncStorage.save('token', response.data.token);
                console.log('SaveToken:'+response.data.token);
                this.props.navigation.dispatch(resetAction);
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
        if (/^1\d{10}$/.test(this.state.username) === false) {
                this.setState({message:'请输入正确的手机号。'})
                return
          }
        console.log('this.state.username:'+this.state.username)
        axios({ method: 'POST', 
          url: serverUrl+'/sms', 
          data: { 
            username: this.state.username,
            password: this.state.password
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
        return(
            <View style={styles.LoginPage}>
            <View style={styles.loginSection}>
                <Text style={styles.loginTitle}> 手机登录 </Text>

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
            <TextInput style={styles.textinput}
              placeholder="二次确认密码"
              secureTextEntry={true}
              label='password1'
              value={this.state.password1}
              onChangeText={password1 => this.setState({ password1 })}
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
                  enable={/^1\d{10}$/.test(this.state.username)}
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
                title='登录'
                onPress={
                  this.loginUserNode
                }
                />
                <Button
                    title="密码登录"
                    color='#56688a'
                    onPress={() => this.props.navigation.navigate('Login')}
                />

            </View>
            <Text style ={styles.message}>{this.state.message}</Text>
                </View>
            </View>
           //this.setState{(sms:1)},

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

module.exports = RegScreen;

