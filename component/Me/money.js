import React from 'react';
import {Picker,StyleSheet, View, Button, TextInput,Text,ActivityIndicator } from 'react-native';
import {NavigationActions,StackActions} from 'react-navigation';
import axios from 'axios';
import deviceStorage from "../Login/jwt/services/deviceStorage";
import CountDownButton from 'react-native-smscode-count-down'
import AsyncStorage from '../Login/AsyncStorage'
let serverUrl = require("../websettings")
let getmoneyUrl = serverUrl+'/m/getmoney'
let cardUrl = serverUrl+'/card'
let withdrawUrl = serverUrl+'/m/withdraw'


const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'index' })],
    });

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
  }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            this.setState({token:GetToken})
            axios.get(getmoneyUrl,{headers:{authorization:token}})
                .then(response=>{
                    console.log(response.data)
                    this.setState({Balance:response.data.Balance})
                    this.setState({PerformMoney:response.data.PerformMoney})
                })
                .catch((error) => {
                  console.log('error:'+error)})
            //获取银行卡
            axios.get(cardUrl,{headers:{authorization:token}})
                .then(response=>{
                    console.log(response.data)
                  let card_dict = {}
                  let array_list_number = 0
                  while(response.data.length>array_list_number){
                      //Object.assign(card_dict,{response.data[array_list_number.toString()],response.data[array_list_number.toString()]})
                      Object.assign(card_dict,{'x':array_list_number})
                      console.log(response.data[array_list_number.toString()])
                      array_list_number+=1
                    }
                    this.setState({cardIdoptions:card_dict})
                    this.setState({isLoading:true})
                })
                .catch((error) => {
                  console.log('error:'+error)})

        })
    }

    //NodeJS API
    loginUserNode() {
        console.log('loginUserNode')
        let rePayMoney = /^([1-5]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
        if(rePayMoney.test(this.state.Money)==false) {
                this.setState({message:'请输入正确的金额'});
                return;
            }
        if (this.state.Money>this.state.Balance) {
                this.setState({message:'提现不可大于可用资金'})
                return
          }
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            this.setState({token:GetToken})
            var LoginData =  {
                        Money: this.state.Money,
                        UserBankCardId: this.state.select_value,
                       }
            console.log(LoginData)
            axios.post(withdrawUrl, LoginData)
                  .then(response=>{
                      console.log(response.data)
                      console.log(response.data)
                      if (response.data.state==0||response.data.state==1) {
                      this.setState({message: response.data.message});
                    }  else if (response.data.state==2) {
                      this.setState({message: response.data.message});
                      }
                    })
            .catch((error) => {
              console.log('error:'+error)
              this.setState({message: '网络问题，重新提交'});
              this.onLoginFail();
            });
          })
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

    render(){
        let ViewCode
        if(this.state.isLoading==true){
                ViewCode = (
                       <View style={styles.LoginPage}>
                        <View style={styles.loginSection}>
                            <Text style={styles.loginTitle}> 提现小金库 </Text>
                            <Text style={styles.loginSubTitle}> 可用￥{this.state.Balance},进行中：￥{this.state.PerformMoney}</Text>
                            <View style={{flexDirection: 'row'}}>
                            <Text style={styles.loginSubTitle}>￥</Text>
                            <TextInput style = {styles.input}
                                    name='Money'
                                    value= {this.state.Money}
                                    type="number"
                                    onChangeText={(xx)=>this.clearMoney(xx)}
                                    value={this.state.Money}
                                    />
                            </View>
                            <Picker
                              selectedValue={this.state.select_value}
                              style={{ height: 50, width: 100 }}
                              onValueChange={(itemValue, itemIndex) => this.setState({select_value: itemValue})}>
                              <Picker.Item label="Java" value="java" />
                              {Object.keys(this.state.cardIdoptions).map((key,value) => {
                                    return (<Picker.Item label={key} value={value} key={key}/>)})}
                            </Picker>
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
    fontSize: 40,
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
   input: {
      height: 40, 
      borderColor: 'gray', 
      borderBottomWidth: 1
   },
    message:{
    marginTop: 16,
    color: '#56688a',
    fontSize: 16
    },
})

module.exports = verifyscreen;

