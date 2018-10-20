import React from "react";
import {StyleSheet,Dimensions,Text, View, ScrollView, Button,Image} from "react-native";
const ProductScrollView = require('./ProductScrollView')
const window = Dimensions.get('window');
const imageWidth = (window.width/3)+30;
const imageHeight = window.height;
var CommonCell = require('./CommonCell');
const productUrl = 'http://192.168.201.103:7001/m/product';
const axios = require('axios');
import deviceStorage from "../Login/jwt/services/deviceStorage";
let token = ''
var productDetail ;
// 如果你想读取子项，


class ProductScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            PD:'',
            //ImageTest:'https://www.baidu.com/img/bd_logo1.png',
            ImageTest:'http://mat1.gtimg.com/www/qq2018/imgs/qq_logo_2018x2.png',
            testvalues: 0,
            taskId:this.props.navigation.getParam('taskId','NO-ID'),
        }
    }
    componentDidMount(){
        console.log(this.state.taskId)
        this.fetchData(this.state.taskId); //启动的时候载入数据
    }
    fetchData(posttaskid){
        console.log(posttaskid)
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log(this.props.navigation.getParam('taskId','NO-ID'))
            axios.get(productUrl, { headers: { Authorization: token, sort:0,version:'1.0',taskId:posttaskid}})
                .then(response => {
                    productDetail = response.data
                    this.setState({ImageTest:'https://www.baidu.com/img/bd_logo1.png'})
                    this.setState({testvalues:1})
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });
    }
    fetchReturnView(GetPdvalues){
        console.log(GetPdvalues)
        return 'helloKetty'
    }

    render(){
        const taskId = this.props.navigation.getParam('taskId','NO-ID')
        const imageUrl = this.props.navigation.getParam('imageUrl','NO-ImageUrl')
        //const imageUrl = JSON.stringify(this.props.navigation.getParam('imageUrl','NO-ImageUrl'))
        console.log(imageUrl)
        return(
            <View>
            <View>
                <ProductScrollView />

                <View>
                <View><Text>{taskId}testvalues：{this.state.testvalues}</Text></View>
                <View><Text>活动类型：{this.fetchReturnView(productDetail)}</Text></View>
                <View><Text>剩余活动：</Text></View>
                </View>
                <ScrollView>
                    <View>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                        <Text>test</Text>
                    </View>
                </ScrollView>
                <View style={styles.shopcart}>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={styles.bottomItem}>
                            <Text>客服</Text>
                        </View>
                        <View style={styles.bottomItem}>
                            <Text>后仓</Text>
                        </View>
                        <View style={styles.bottomItem}>
                            <Text>购物车</Text>
                        </View>
                    </View>
                    <View style={[styles.bottomItem, {backgroundColor: 'red'}]}>

                        <Text>加入购物车</Text>
                    </View>
                    <View style={[styles.bottomItem, {backgroundColor: 'green'}]}>
                        <Text>看左面{'\n'}加入{'\n'}购物车</Text>
                    </View>
                </View>
            </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    fatherview: {
        flexDirection: 'column',
        height: 150
    },
    HeaderTitle: {
        width: 250,
        height: 30,
        //backgroundColor:'white',
        justifyContent:'center',
        borderRadius: 18,
        alignItems: 'center',
        paddingLeft: 8,
    },
    HeaderScrollView:{
        flex:1,
        flexDirection:'column',
        flexWrap: 'wrap'
    },
    image:{
        width: imageWidth,
        height: imageHeight * 0.5
    },
    child:{
        width: window.width/2,
        alignItems: 'center',
        height: imageHeight+5,
        marginTop: 10,
    },
    comments:{
        height: imageHeight * 0.1,
    },
    bottomItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    shopcart: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: 375,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
});

module.exports = ProductScreen;