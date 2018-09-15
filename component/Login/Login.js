import React from "react";
import {StyleSheet, View, Button, TextInput,Text} from 'react-native';
import axios from 'axios';
import deviceStorage from "./jwt/services/deviceStorage";

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
        }
        // this.loginUser = this.loginUser.bind(this);
        // this.loginUserNode = this.loginUserNode.bind(this);
        this.loginVerify=this.loginVerify.bind(this)
    };
    static navigationOptions={
        HeaderTitle:'注册页面',
        };

    loginUser() {
        const{ username, password, error} = this.state;
        this.setState({error:'', loading:true});


        axios.post("http://127.0.0.1:7002/login",{
        username: username,
        password: password
        })
        .then((response)=> {
            if (response.data.token) {
            deviceStorage.save('token', response.data.token);
            console.log(response.data.token);
            this.props.newJWT(response.data.token);
            } else {
               console.log(response.data);
               console.log('response.data');

            }
        })
        .catch((error) => {
            console.log(error);
        })
            }
    loginUserNode() {
        axios.post("http://127.0.0.1:7002/login",{
        username: this.state.username,
        password: this.state.password
        })
        .then((response) => {
          deviceStorage.saveKey("token", response.data.token);
          this.props.newJWT(response.data.token);
        })
        .catch((error) => {
          console.log(error);
          this.onLoginFail();
        });
        }

    loginVerify() {
        console.log(this.state.username.length)
        if(this.state.username.length !== 11) {
            this.setState({message:'请输入正确的手机号'});
            return;
        }
        if(this.state.password.length < 6) {
                this.setState({message:'密码大于5位'});
                return;
            }
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
            <Button 
                    title='登陆'
                    onPress= {() => this.loginVerify()}
                    />

            <View style={styles.subButton}>
                <Button
                    title="注册"
                    onPress={() => this.props.navigation.navigate('Reg')}
                />
                <Button
                    title="找回密码"
                    onPress={() => this.props.navigation.navigate('Reg')}
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
