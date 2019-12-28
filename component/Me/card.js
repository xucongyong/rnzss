import React from 'react';
import {StyleSheet, View, Button, TextInput,Text,ActivityIndicator,FlatList} from 'react-native';
import {NavigationActions,StackActions} from 'react-navigation';
import axios from 'axios';
import deviceStorage from "../Login/jwt/services/deviceStorage";
import CountDownButton from 'react-native-smscode-count-down'
import AsyncStorage from '../Login/AsyncStorage'
let serverUrl = require("../websettings")

const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'index' })],
    });

class verifyscreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            name: '',
            mobile: '',
            identitynumber: '',
            card:[],
            message: '',
            token: '',
            VerifyCode:'',
            isLoading:false,
            isVerify:false,
        }
        // this.loginUserNode = this.loginUserNode.bind(this);
        // this.fetchData=this.fetchData.bind(this);
        // this.ReadData=this.ReadData.bind(this);
  }
    componentDidMount(){
        this.fetchData();
      }
    fetchData(){
      deviceStorage.get('token').then((token) => {
          axios.get(serverUrl+'/card',{headers:{authorization:token}})
              .then(response=>{
                  if(response.data=="0"){
                      this.props.navigation.navigate('Login')
                  }else{
                      let arrayList = []
                      let array_list_number = 0
                      while(response.data.length>array_list_number){
                          arrayList.push(response.data[array_list_number.toString()])
                          array_list_number+=1
                      }
                      this.setState({dataSource:arrayList})
                      this.setState({isLoading:true})
                  }
              })
              .catch((error) => {
                console.log('error:'+error)})
      })
    }
    ReadData(data){
      console.log(data)
      return <View><Text>卡号：<Text>{data.UserBankCard}</Text></Text></View>
    }
  render(){
        let ViewCode
        if(this.state.isLoading==true){
                ViewCode = (
                       <View style={styles.LoginPage}>
                        <View style={styles.loginSection}>
                            <Text
                                style={styles.loginTitle}
                                onPress={() => this.props.navigation.navigate('verify')}
                                 >银行卡管理 </Text>
                            <Button
                                style={{width: 150, height: 100, backgroundColor: 'red'}}
                                onPress={() => this.props.navigation.navigate('verify')}
                                title="增加银行卡"
                                color="blue"
                                accessibilityLabel="Learn more about this purple button"
                              />
                            </View>
                            <View>
                            <FlatList
                                dataSource={this.state.dataSource}
                                renderRow={(data) => this.ReadData(data)}
                                />
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


