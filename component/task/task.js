import React from 'react';
import {
    Text,
    SafeAreaView,
    FlatList,
    StyleSheet,
    RefreshControl,
    View,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import deviceStorage from "../Login/jwt/services/deviceStorage";
// import codePush from 'react-native-code-push'
const {width, height} = Dimensions.get('window');
var serverUrl = require("../websettings")
var MoneyAlgorithm = require("../MoneyAlgorithm")
const MyUrl = serverUrl+'/m/index';
const axios = require('axios');


export default class MyComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            isLoading:false, //载入数据判断
            page:1,
            event:1
        }
        this.Item = this.Item.bind(this)
    }

    componentDidMount(){
        this.setState({
            event: this.props.route.name=='红包试用'?1:2
        })
        this.fetchData(); //启动的时候载入数据
    }
    update(){
      //   codePush.sync({
      //     //安装模式
      //     //ON_NEXT_RESUME 下次恢复到前台时
      //     //ON_NEXT_RESTART 下一次重启时
      //     //IMMEDIATE 马上更新
      //     installMode:codePush.InstallMode.IMMEDIATE ,
      //     //对话框
      //     updateDialog: {
      //       //是否显示更新描述
      //       appendReleaseDescription : true ,
      //       //更新描述的前缀。 默认为"Description"
      //       descriptionPrefix : "更新内容：" ,
      //       //强制更新按钮文字，默认为continue
      //       mandatoryContinueButtonLabel : "立即更新" ,
      //       //强制更新时的信息. 默认为"An update is available that must be installed."
      //       mandatoryUpdateMessage : "必须更新后才能使用" ,
      //       //非强制更新时，按钮文字,默认为"ignore"
      //       optionalIgnoreButtonLabel : '稍后' ,
      //       //非强制更新时，确认按钮文字. 默认为"Install"
      //       optionalInstallButtonLabel : '后台更新' ,
      //       //非强制更新时，检查到更新的消息文本
      //       optionalUpdateMessage : '有新版本了，是否更新？' ,
      //       //Alert窗口的标题
      //       title : '更新提示'
      //     },
      //     mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
      // });
        }
    fetchData() {
        this.setState({isLoading: true});
        deviceStorage.get('token').then((token) => {
            if (token==""||token==null) {this.props.navigation.navigate('Login')} else {
                axios.get(MyUrl, {headers: {Authorization: token},params:{event: this.state.event,page:this.state.page}})
                    .then(response => {
                        if(response.data=="0"){
                            this.props.navigation.navigate('Login')
                        }else{
                            this.setState({
                                data: this.state.data.concat(response.data),
                                page: this.state.page+1,
                            })
                        }
                    })
                    .catch((error) => {
                        console.log('error:' + error);
                    });
            }
            this.setState({isLoading:false})
        })
    }
    //listview数据加工成页面
    Item(data){
        let addmoney = data['AddChat']+data['AddCommandsLike']+data['AddCoupons']+data['AddOpenOtherProduct']+data['AddOpenProduct']+data['AddSaveShop']+data['AddShoppingCar']
        let money_algorithm_value = MoneyAlgorithm(data['event'],(data['buyNum'] * data['buyPrice']),addmoney,data['huabeiId'])
        let buy_money= money_algorithm_value[1]
        let returnDataView;
        if(data['event']==1){
            returnDataView=(<TouchableOpacity onPress={()=> {
                    this.props.navigation.navigate('ProductScreen',{taskId:data['SellOrderId']})}}>
                <View style={styles.cellBoxStyle}>
                    <View>
                        <Image
                          style={{width: 100, height: 100}}
                          source={{uri: JSON.parse(data['product_main_image'])[0]}}
                        />
                    </View>
                    <View>
                    <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize:13}}><Text style={{fontSize:11, backgroundColor:'#dc3232', color:'white'}}>{data['ShopSort']}</Text>
                    {data['product_name']}</Text>
                    </View>
                    <Text> </Text>
                    <Text style={{fontSize:11, color:'#dc3232'}}>￥<Text style={{fontSize:23}}>{buy_money-(data['buyNum']*data['buyPrice'])}</Text></Text>
                    <View>
                    <Text>
                    <Text style={{fontSize:11, color:'gray'}} >付款：{data['buyNum'] * data['buyPrice']} 剩：{data['orderNumber']}</Text>
                        </Text>
                     </View>
                    </View>
                </View>
                </TouchableOpacity>)
            }else if(data['event']==2){
                returnDataView=(<TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('ProductScreen',{taskId:data['SellOrderId']})}}>
                        <View style={styles.cellBoxStyle}>
                            <View>
                                <Image
                                  style={{width: 100, height: 100}}
                                  source={{uri: JSON.parse(data['product_main_image'])[0]}}
                                />
                            </View>
                            <View>
                            <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:13}}><Text style={{fontSize:11, backgroundColor:'#dc3232', color:'white'}}>{data['ShopSort']}</Text>
                            {data['product_name']}</Text>
                            </View>
                            <Text> </Text>
                            <Text style={{fontSize:11, color:'#dc3232'}}>￥<Text style={{fontSize:23}}>{(data['buyNum']*data['buyPrice'])-data['ReturnBuyPrice']}</Text></Text>
                            <View>
                            <Text>
                            <Text style={{fontSize:11, color:'gray'}} >付款：{data['buyNum'] * data['buyPrice']} 剩：{data['orderNumber']}</Text>
                                </Text>
                             </View>
                            </View>
                        </View>
                        </TouchableOpacity>)
                }
        return (
            <View>
                <View>{returnDataView}</View>
            </View>
        )
    }
    // 刷新操作
    reloadNewData(){
        this.setState({data:[],page:1})
        this.fetchData()
    }

    // 上拉加载更多
    renderFooter(){
        if(this.state.isLoading){
            return(
                // <View style={{marginVertical: 10}}>
                //     <ActivityIndicator color="red"/>
                // </View>
                <View style={{marginVertical: 10,justifyContent:'center',alignItems:'center'}}>
                    <Text>加载中</Text>
                </View>
            )
        }else{
            return(
                <View style={{marginVertical: 10,justifyContent:'center',alignItems:'center'}}>
                    <Text>下拉加载</Text>
                </View>
            )
        }
    }
    // 滑动到做底下的时候
    _toEnd(){
        this.fetchData()
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>this.Item(item)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this.reloadNewData.bind(this)}
                            colors={['red','orange']}
                        />}
                    ListFooterComponent={()=>this.renderFooter()}
                    onEndReached={()=>this._toEnd()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cellBoxStyle:{
        flex: 1,
        flexDirection:'row',
        backgroundColor: 'white',
        padding: 10,
        height: 110,
        borderColor: '#ffffff',
        //borderStyle: null,
        //borderWidth: 0.5,
        //borderRadius: 2,
        //marginLeft: 5,
        //marginRight: 5,
        //marginVertical: 3,
        // shadowColor: 'red',    // 设置阴影
        // shadowOffset: {width:0.5, height: 0.5},
        // shadowOpacity: 0.4,   // 透明度
        // shadowRadius: 1,
        // elevation:2   //   高度，设置Z轴，可以产生立体效果
    },
    cellTxt:{
        flex: 1,
        flexDirection:'row',
        fontSize:12,
        color:'red'
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
})

module.exports=MyComponent;
