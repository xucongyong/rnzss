import React from 'react';
import {StyleSheet, View, Button, TextInput,Text} from 'react-native';


class RegScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
  }

    render(){
        return(
            <View style={styles.LoginPage}>
            <View style={styles.loginSection}>
                <Text style={styles.loginTitle}> 注册 </Text>

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
            <Button onPress={this.loginUserNode}
                    title='注册'
                    />
            <View style={styles.subButton}>
                <Button
                    title="登录"
                    color='#000000'
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button
                    title="找回密码"
                    color='#000000'
                    onPress={() => this.props.navigation.navigate('Reg')}
                />

            </View>
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
})

module.exports = RegScreen;

