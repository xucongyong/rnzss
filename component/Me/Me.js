import React from "react";
import {StyleSheet,Text, View, ScrollView, Button, AsyncStorage,TouchableHighlight} from "react-native";
import deviceStorage from "../Login/jwt/services/deviceStorage";
import axios from 'axios';
import weburl from "../websettings";
import HttpGetPost from '../HttpGetPost';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = require("react-native-image-picker")
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import codePush from 'react-native-code-push'

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */



var CommonCell = require('./CommonCell');
class MeScreen extends React.Component{
        constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false,
            avatarSource: ''
        }
    }

    update(){
        codePush.sync({
          //安装模式
          //ON_NEXT_RESUME 下次恢复到前台时
          //ON_NEXT_RESTART 下一次重启时
          //IMMEDIATE 马上更新
          installMode:codePush.InstallMode.IMMEDIATE ,
          //对话框
          updateDialog: {
            //是否显示更新描述
            appendReleaseDescription : true ,
            //更新描述的前缀。 默认为"Description"
            descriptionPrefix : "更新内容：" ,
            //强制更新按钮文字，默认为continue
            mandatoryContinueButtonLabel : "立即更新" ,
            //强制更新时的信息. 默认为"An update is available that must be installed."
            mandatoryUpdateMessage : "必须更新后才能使用" ,
            //非强制更新时，按钮文字,默认为"ignore"
            optionalIgnoreButtonLabel : '稍后' ,
            //非强制更新时，确认按钮文字. 默认为"Install"
            optionalInstallButtonLabel : '后台更新' ,
            //非强制更新时，检查到更新的消息文本
            optionalUpdateMessage : '有新版本了，是否更新？' ,
            //Alert窗口的标题
            title : '更新提示'
          }})
        }

    static navigationOptions =({
        headerStyle: {
        backgroundColor: '#DC3C78'}
        })
        render(){

            return(
                <View style={{flex:1}}>
                        <View>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('money')}>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}>小金库</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('card')}>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}>银行卡</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('addTbAccount')}>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}
                                >淘宝账号</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('addJdAccount')}>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}>京东账号</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                            </TouchableHighlight>
                            <TouchableHighlight 
                                onPress={() => this.update()}>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}>更新系统</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                            </TouchableHighlight>
                            <TouchableHighlight 
                                onPress={() => deviceStorage.delete('token').then((GetToken) => {
                                                console.log(GetToken)})}>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}>注销账户</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                            </TouchableHighlight>
                        </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:44,
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 5,
    },
    LeftText:{
        marginLeft: 15
    },
    HeaderTitle: {
        width: 250,
        height: 30,
        //backgroundColor:'white',
        justifyContent:'center',
        borderRadius: 18,
        alignItems: 'center',
        paddingLeft: 8,
}})

module.exports = MeScreen;