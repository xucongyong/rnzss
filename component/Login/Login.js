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

    };

    static navigationOptions={
        HeaderTitle:'2121',
        };

    loginUser() {
        const{ username, password, error} = this.state;
        this.setState({error:'', loading:true});


    axios.post("http://127.0.0.1:8000/api-token-auth/",{
    username: username,
    password: password
    })
    .then((response)=> {
        deviceStorage.save('token', response.data.token);
        console.log(response.data.token);
        this.props.newJWT(response.data.token);
    })
    .catch((error) => {
        console.log(error);
})
    }
    loginUserNode() {
        //const{ username, password, error} = this.state;
        //this.setState({error:'', loading:true});
        axios.get("http://127.0.0.1:7002/",{

        })
            .then((response)=> {
                deviceStorage.save('token', response.data.token);
                console.log(response.data.token);
                this.props.get(response.data.token);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    render(){
        return(
            <View style={styles.login}>
              <TextInput
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
                <Button
                    title="登陆"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button
                    title="订单"
                    onPress={() => this.props.navigation.navigate('订单')}
                />
                <Button
                    title="ModalScreen"
                    onPress={() => this.props.navigation.navigate('MyModal')}/>
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
