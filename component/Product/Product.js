import React from "react";
import {StyleSheet,Dimensions,Text, View, ScrollView, Button,Image,ActivityIndicator,TouchableOpacity,Alert} from "react-native";
const window = Dimensions.get('window');
const imageWidth = (window.width/3)+30;
const imageHeight = window.height;
var CommonCell = require('./CommonCell');
var serverUrl = require("../websettings")
const productUrl = serverUrl+'/m/product';
const OrderUrl = serverUrl+'/m/genratetask';
const axios = require('axios');
import deviceStorage from "../Login/jwt/services/deviceStorage";
var ScreenWidth = Dimensions.get('window').width;
var boxWidth = Dimensions.get('window').height/2;
var MoneyAlgorithm = require("../MoneyAlgorithm")
let token = ''
// 如果你想读取子项，

class ProductScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            PD:'',
            productDetail:'',
            currentPage: 0,
            ImageMain:[],
            ImageDetails:[],
            loading: false,
            taskId:this.props.navigation.getParam('taskId','NO-ID'),
            GenrateTasking:false,
        }
        this.genrateTask = this.genrateTask.bind(this)
    }
    componentWillMount(){
        this.fetchData(this.state.taskId); //启动的时候载入数据
        // this.startTimer();
    }
    //取消定时器
    // componentWillUnmount(){
    //     clearInterval(this.timer);
    // }

    fetchData(posttaskid){
        console.log(posttaskid)
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log(this.props.navigation.getParam('taskId','NO-ID'))
            axios.get(productUrl, { headers: { Authorization: token, sort:0,version:'1.0',taskId:posttaskid}})
                .then(response => {
                    this.setState({productDetail:response.data})
                    this.setState({ImageMain:JSON.parse(this.state.productDetail['Details'])['mainImage']})
                    this.setState({ImageDetails:JSON.parse(this.state.productDetail['Details'])['DetailsImage']})
                    this.setState({loading:true})
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });
    }

    //渲染图
    renderChilds(){
        var N = 1
        return this.state.ImageMain.map((x)=>{
            N +=1
            return <Image key={N} source={{uri:x}} style={styles.imageStyle} />;
        })}
        // }


    //渲染图
    renderDeatlsImage(){
        var Y = 10
        return this.state.ImageDetails.map((x)=>{
            Y +=1
            return <Image key={Y} source={{uri:x}} style={styles.DeatlsImageStyle} />;
        })}
    //购物按钮
    genrateTask(){
        this.setState({loading:false})
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log(this.state.taskId)
            axios.post(OrderUrl, { headers: { Authorization: token, version:'1.0',orderid:this.state.taskId}})
                .then(response => {
                    console.log('data')
                    this.setState({productDetail:response.data})
                    this.setState({loading:true})

                    if(this.state.productDetail.status === 0){
                        this.props.navigation.navigate('Login')
                    }else if(this.state.productDetail.status === 1){
                        Alert.alert(
                              '请绑定账号',
                            this.state.productDetail.message,
                            [
                                {text: '先不绑定', onPress: () => console.log('Cancel Pressed!')},
                                {text: '马上淘宝绑定', onPress: () => this.props.navigation.navigate('addTbAccount')},
                                {text: '马上京东绑定', onPress: () => this.props.navigation.navigate('addJdAccount')},
                            ],
                            { cancelable: false }
                            )
                    }else if(this.state.productDetail.status === 2){
                        Alert.alert(
                              'Alert Title',
                              'My Alert Msg',
                            [
                                {text: '返回首页', onPress: () => this.props.navigation.navigate('index')}
                            ],
                            { cancelable: false }
                            )
                    }else if(this.state.productDetail.status === 3){
                        console.log('this.state.productDetail.taskId:'+this.state.productDetail.taskId)
                        this.props.navigation.navigate('TaskDetails',{taskId:this.state.productDetail.taskId})
                    }else if(this.state.productDetail.status === 4){
                        Alert.alert(
                            this.state.productDetail.message,
                            [
                                {text: '返回首页', onPress: () => this.props.navigation.navigate('index')}
                            ],
                            { cancelable: false }
                            )
                    }
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
                });     
        }
    //关键词

    render(){
        let productView;
        let taskId = this.props.navigation.getParam('taskid','NO-ID')
        let data = this.state.productDetail 
        let addmoney = data['AddChat']+data['AddCommandsLike']+data['AddCoupons']+data['AddOpenOtherProduct']+data['AddOpenProduct']+data['AddSaveShop']+data['AddShoppingCar']
        let money_algorithm_value = MoneyAlgorithm(data['event'],(data['buyNum'] * data['buyPrice']),addmoney,data['huabeiId'])
        let buy_money= money_algorithm_value[1]
        if(this.state.loading){
            if(this.state.productDetail['event']==1){
                productView = (
                    <View style={{flex:1}}>
                    <View style={{flex:0.5}}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}>
                        {this.renderChilds()}
                    </ScrollView>
                    </View>
                    <View>

                    </View>
                    <View style={{flex:0.43}}>
                    <ScrollView>
                        <View>
                        <Text></Text>
                        <Text style={{fontSize:11, color:'#dc3232'}}>￥<Text style={{fontSize:23}}>{buy_money-(data['buyNum']*data['buyPrice'])}</Text></Text>
                        <View>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize:13}}><Text style={{fontSize:11, backgroundColor:'#dc3232', color:'white'}}>{data['ShopSort']}</Text>
                        类型：红包试用</Text>
                        </View>
                        <Text>
                        <Text style={{fontSize:15, color:'gray'}} >付：{data['buyNum'] * data['buyPrice']} 剩：{data['orderNumber']}</Text>
                            </Text>
                         </View>
                        </View>
                        <Text></Text>
                        <View>
                        <Text style={{textAlignVertical: "center",textAlign: "center",fontSize:11, color:'gray'}} >---</Text>
                        </View>
                        <Text></Text>
                        {this.renderDeatlsImage()}
                    </ScrollView>
                    </View>

                    <View style={styles.shopcart}>
                        <View style={[styles.bottomItem,{width:window.width*0.3}]}></View>
                        <View style={[styles.bottomItem,{width:window.width*0.7,backgroundColor: 'red',color:'white'} ]}>
                        <Text
                        style={{color:'white'}}
                        onPress={() => Alert.alert(
                                        '马上开始试用？',
                                        '开始试用吗？请在40分钟内完成噢',
                                [ 
                                    {text: '马上试用', onPress: () => this.genrateTask()},
                                    {text: '先不开始', onPress: () => console.log('close')},
                                ],
                                { cancelable: false }
                                )
                                }
                        >下单试用</Text></View>
                        </View>
                    </View>
                )
            }else if(this.state.productDetail['event']==2){
                productView = (
                    <View style={{flex:1}}>
                    <View style={{flex:0.5}}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}>
                        {this.renderChilds()}
                    </ScrollView>
                    </View>
                    <View>

                    </View>
                    <View style={{flex:0.43}}>
                    <ScrollView>
                        <View>
                        <Text></Text>
                        <Text style={{fontSize:11, color:'#dc3232'}}>￥
                        <Text style={{fontSize:23}}>{data['ReturnBuyPrice']-(data['buyNum']*data['buyPrice'])}</Text>
                        </Text>
                        <View>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize:13}}><Text style={{fontSize:11, backgroundColor:'#dc3232', color:'white'}}>{data['ShopSort']}</Text>
                        类型：免费折扣</Text>
                        </View>
                        <Text>
                            <Text style={{fontSize:11}} >付：{data['buyNum'] * data['buyPrice']} 返：{data['ReturnBuyPrice']}</Text>
                        </Text>
                         </View>
                        </View>
                        <Text></Text>
                        <View>
                        <Text style={{textAlignVertical: "center",textAlign: "center",fontSize:11, color:'gray'}} >---</Text>
                        </View>
                        <Text></Text>
                        {this.renderDeatlsImage()}
                    </ScrollView>
                    </View>

                    <View style={styles.shopcart}>
                        <View style={[styles.bottomItem,{width:window.width*0.3}]}></View>
                        <View style={[styles.bottomItem,{width:window.width*0.7,backgroundColor: 'red',color:'white'} ]}>
                        <Text
                        style={{color:'white'}}
                        onPress={() => Alert.alert(
                                        '马上开始试用？',
                                        '开始试用吗？请在40分钟内完成噢',
                                [ 
                                    {text: '马上试用', onPress: () => this.genrateTask()},
                                    {text: '先不开始', onPress: () => console.log('close')},
                                ],
                                { cancelable: false }
                                )
                                }
                        >下单试用</Text></View>
                        </View>
                    </View>
                )
            }

        }else{
            productView=(
            <View><Text>this.state.taskId</Text></View>
            )
        }
        return(
            <View style={{flex:1}}>{productView}</View>

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
        width:window.width/5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1

    },
    shopcart: {
        flex:0.07,
        height: 50,
        flexDirection: 'row',
        //backgroundColor: 'red',
    },
    container:{
        flex: 0.93,
        flexDirection:'column'
    },
    contentContainer: {
        paddingVertical: 20
    },
    imageStyle:{
        width: ScreenWidth,
        height: boxWidth
    },
    DeatlsImageStyle:{
        width: ScreenWidth,
        height: boxWidth
    },
    circleWrapperStyle:{
        flexDirection: 'row',
        //absolute‘绝对定位’
        //relative'相对定位
        position:'absolute',
        bottom:0,
        left:10
    },
    circleStyle:{
        fontSize:25,
        color:'#FFF'}
});

module.exports = ProductScreen;
