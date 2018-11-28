import React from "react";
import {StyleSheet,TextInput,Dimensions, View, ScrollView,Image,ActivityIndicator,TouchableOpacity,Alert,Text} from "react-native";
var serverUrl = require("../websettings")
const taskUrl = serverUrl+'/m/task';
import deviceStorage from "../Login/jwt/services/deviceStorage";
const axios = require('axios');


class taskScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: this.props.navigation.getParam('taskId', 'NO-ID'),
            loading: false,
            task_state:10,
        }
    }
    componentWillMount() {
        this.fetchData(this.state.taskId); //启动的时候载入数据
        // this.startTimer();
    }
    fetchData(posttaskid) {
        console.log(posttaskid)
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log('getParamtaskId:'+this.props.navigation.getParam('taskId', 'NO-ID'))
            axios.get(taskUrl, {headers: {Authorization: token, sort: 0, version: '1.0', taskId: posttaskid}})
                .then(response => {
                    this.setState({task_state:response.data.BuyTaskState})
                    this.setState({loading: true})
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                }
                );
        });
    }
    render() {
    	let ViewDetails
        if(this.state.loading){
            if(this.state.task_state===0||this.state.task_state===1||this.state.task_state===2||this.state.task_state===3||this.state.task_state===4){
                ViewDetails=(
                        <View style={{flex:1}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:1}}>
                        <Text onPress={() => this.props.navigation.navigate('TaskDetails',{taskId: this.state.taskId})}>查看试用任务</Text>
                        <Text onPress={() => this.props.navigation.navigate('index',{taskId: this.state.taskId})}>回到首页</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        </View>
                        )
            }else if(this.state.task_state===5){
                ViewDetails=(
                        <View style={{flex:1}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:1}}>
                        <Text onPress={() => this.props.navigation.navigate('TaskDetails',{taskId: this.state.taskId})}>查看试用任务</Text>
                        <Text onPress={() => this.props.navigation.navigate('index',{taskId: this.state.taskId})}>回到首页</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        </View>
                        )
            }else if(this.state.task_state===6){
                ViewDetails=(
                        <View style={{flex:1}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:1}}>
                        <Text onPress={() => this.props.navigation.navigate('TaskDetails',{taskId: this.state.taskId})}>查看试用任务</Text>
                        <Text onPress={() => this.props.navigation.navigate('index',{taskId: this.state.taskId})}>回到首页</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        </View>
                        )
                }
        }else{
                ViewDetails=(<ActivityIndicator color="#0000ff" style={{marginTop:50}} />)
        }
        return (
            <View style={{flex:1}}>
            {ViewDetails}
            </View>
        )

    }
}

module.exports = taskScreen;
