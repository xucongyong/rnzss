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
            error: '',
            loading: false
        }
        this.loginUser = this.loginUser.bind(this);
        this.loginUserNode = this.loginUserNode.bind(this);

    };

    static navigationOptions={
        HeaderTitle:'2121',
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
        console.log('loginUserNode')
        //const{ username, password, error} = this.state;
        //this.setState({error:'', loading:true});
        console.log(this.state)
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
    render(){
        return(
            <View style={styles.login}>
              <TextInput
                label='username'
                placeholder="请输入手机号或账户"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
            <TextInput
              placeholder="请输入密码"
              label='password'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <View style={styles.button}>
                <Button onPress={this.loginUserNode}
                    title='登陆'
                    >

                </Button>

                <Button
                    title="注册"
                    onPress={() => this.props.navigation.navigate('Reg')}
                />


            </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput:{
    height:60,
    fontSize: 18
  },
    button: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

module.exports = LoginScreen;
