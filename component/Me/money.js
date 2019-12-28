import React from 'react';
import {Picker,StyleSheet, View,TextInput,Text,ActivityIndicator } from 'react-native';
import axios from 'axios';
import {Button, WhiteSpace, WingBlank } from '@ant-design/react-native';

import deviceStorage from "../Login/jwt/services/deviceStorage";
import CountDownButton from 'react-native-smscode-count-down'
import AsyncStorage from '../Login/AsyncStorage'
let serverUrl = require("../websettings")

class verifyscreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cardIdoptions:{},
            Balance:0,
            PerformMoney:0,
            name: '',
            Money: 0,
            identitynumber: '',
            card: '',
            message: '',
            token: '',
            VerifyCode:'',
            select_value:'',
            isLoading:false,
            isVerify:false,
        }
        this.loginUserNode = this.loginUserNode.bind(this);
        this.clearMoney=this.clearMoney.bind(this)
        this.fetchData=this.fetchData.bind(this)
        this.get_item=this.get_item.bind(this)
  }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        this.setState({isLoading:true})
        deviceStorage.get('token').then((Token) => {
            axios.get(serverUrl+'/m/getmoney',{headers:{authorization:Token}})
                .then(response=>{
                    console.log(response.data)
                    if(response.data=="0"){
                        this.props.navigation.navigate('Login')
                    }else{
                        this.setState({Balance:response.data.Balance})
                        this.setState({PerformMoney:response.data.PerformMoney})
                    }
                })
                .catch((error) => {
                  console.log('error:'+error)})
            //获取银行卡
            axios.get(serverUrl+'/card',{headers:{authorization:Token}})
                .then(response=>{
                    if(response.data=="0"){
                        this.props.navigation.navigate('Login')
                    }else{
                        let card_dict = {}
                        let array_list_number = 0
                        while(response.data.length>array_list_number){
                            if(array_list_number==0){
                                this.setState({select_value:response.data[array_list_number.toString()]['UserBankCardId']})
                            }
                            //Object.assign(card_dict,{response.data[array_list_number.toString()]['UserBankCardId'],response.data[array_list_number.toString()]['UserBankCard']})
                            card_dict[response.data[array_list_number.toString()]['UserBankCardId']]=response.data[array_list_number.toString()]['UserBankCard']
                            array_list_number+=1
                        }
                        this.setState({cardIdoptions:card_dict})
                    }

                })
                .catch((error) => {
                  console.log('error:'+error)})

        })
        this.setState({isLoading:false})
    }

    //NodeJS API
    loginUserNode() {
        let rePayMoney = /^([1-5]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
        if(rePayMoney.test(this.state.Money)==false) {
            return this.setState({message:'请输入正确的金额'});
            }
        if (this.state.Money>this.state.Balance) {
            return this.setState({message:'提现不可大于可用资金'})
          }
        this.setState({isLoading:true})
        deviceStorage.get('token').then((token) => {
            console.log(this.state.select_value)
            console.log(this.state.Money)
            var LoginData =  {
                        Money: this.state.Money,
                        UserBankCardId: this.state.select_value,
                        authorization:token,
                       }
            axios.post(serverUrl+'/m/withdraw', LoginData)
                  .then(response=>{
                      console.log(response.data)
                      if(response.data=="0"){
                          this.props.navigation.navigate('Login')
                      }else if(response.data==""){
                          this.props.navigation.navigate('ResultView');
                      }else{
                          this.setState({message: response.data});
                      }
                    })
            .catch((error) => {
              console.log('error:'+error)
              this.setState({message: '网络问题，重新提交'});
                this.setState({isLoading:false})
            });
            }
          )
    }

    clearMoney(xx){
        var re = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
        if(re.test(xx)===false){
            this.setState({Money:''})
        }else{
            this.setState({Money:xx})
        }
        console.log(this.state.Money)
    }
    get_item(){
          return this.state.cardIdoptions.map(function(news){
                return <Picker.Item label={news} value={news} key={news}/>
            // return <Picker.Item label={this.state.cardIdoptions[testvalue]} value={testvalue} key={testvalue}/>
          })
        }
    render(){
        let ViewCode

        if(!this.state.isLoading){
          if(Object.keys(this.state.cardIdoptions).length>0){
                ViewCode = (
                       <View style={styles.LoginPage}>
                        <View style={styles.loginSection}>
                            <Text style={styles.loginTitle}> 提现</Text>
                            <Text style={styles.loginSubTitle}>时间：1-3工作日</Text>
                            <Text> 可用￥{this.state.Balance},进行中：￥{this.state.PerformMoney}</Text>
                            <View style={{flexDirection: 'row'}}>
                            <Text style={styles.loginSubTitle}>￥</Text>
                            <TextInput style = {styles.input}
                                    value={this.state.Money ? String(this.state.Money) : null}
                                    placeholder="请输入提现金额"
                                    onChangeText={(xx)=>this.clearMoney(xx)}
                                    />
                            </View>
                            <Picker
                              selectedValue={this.state.select_value}
                              style={{width: 250 }}
                              onValueChange={(itemValue, itemIndex) => this.setState({select_value: itemValue})}>
                              {console.log(this.state.cardIdoptions)}
                              {Object.keys(this.state.cardIdoptions).map((key) => {
                                      return (<Picker.Item label={this.state.cardIdoptions[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
                                  })}
                            </Picker>
                            <Button type="primary" onPress={() => this.loginUserNode()}>提现</Button>
                            <Text></Text>

                            <Button type="primary" onPress={() => this.props.navigation.navigate('verify')}>增加银行卡</Button>

                            <Text>{this.state.message}</Text>
                            </View>
                        </View>)
          }else if(Object.keys(this.state.cardIdoptions).length==0){
              ViewCode = (
                      <View style={styles.loginSection}>
                            <Text style={styles.loginTitle}> 提现小金库 </Text>
                            <Text> 可用￥{this.state.Balance},进行中：￥{this.state.PerformMoney}</Text>

                          <Button type="primary" onPress={() => this.props.navigation.navigate('verify')}>增加银行卡</Button>

                          <Text>{this.state.message}</Text>
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
    flex:1,
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
    fontSize: 18,
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
    marginBottom: 60
  },
    button: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
   input: {
      height:40,
      marginTop: 8,
      fontSize: 13,
      padding: 15,
      borderColor: 'gray',
   },
    message:{
    marginTop: 16,
    color: '#56688a',
    fontSize: 16
    },
})

module.exports = verifyscreen;


