import React from 'react';
import {
    Text,
    ListView,
    StyleSheet,
    RefreshControl,
    View,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    withNavigationFocus,
} from 'react-native';
import Dimensions from 'Dimensions';
import deviceStorage from "../Login/jwt/services/deviceStorage";
import codePush from 'react-native-code-push'
const {width, height} = Dimensions.get('window');
const dataUrl = 'https://api.douban.com/v2/movie/top250?count=350';
var serverUrl = require("../websettings")
var MoneyAlgorithm = require("../MoneyAlgorithm")
const MyUrl = serverUrl+'/m/index';
const axios = require('axios');
let token = ''
//


export default class MyComponent extends React.Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource : ds,
            isLoading:false, //载入数据判断
            refreshing:false, //
            isMoreloading:true,
            token:'',
        }
    }

    componentDidMount(){
        // 加载图片
        this.update()
        this.setState({
            isLoading:true,
        })
        this.fetchData(); //启动的时候载入数据
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
    fetchData(refresh){
        if(refresh){
            this.setState({
                refreshing:true
            });
        }
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            this.setState({token:GetToken})
            axios.get(MyUrl, { headers: { Authorization: token, event:'2'}})
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(response.data),
                        isLoading:false,
                        refreshing:false,
                    })
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });
    }
    //listview数据加工成页面
    _renderRow(data){
        let testV  = JSON.parse(data['Details'])
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
                          source={{uri: testV['mainImage'][0]}}
                        />
                    </View>
                    <View>
                    <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize:13}}><Text style={{fontSize:11, backgroundColor:'#dc3232', color:'white'}}>{data['ShopSort']}</Text>
                    {testV['name']}</Text>
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
                                  source={{uri: testV['mainImage'][0]}}
                                />
                            </View>
                            <View>
                            <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:13}}><Text style={{fontSize:11, backgroundColor:'#dc3232', color:'white'}}>{data['ShopSort']}</Text>
                            {testV['name']}</Text>
                            </View>
                            <Text> </Text>
                            <Text style={{fontSize:11, color:'#dc3232'}}>￥<Text style={{fontSize:23}}>{(data['buyNum']*data['buyPrice'])-data['ReturnBuyPrice']}</Text></Text>
                            <View>
                            <Text>
                            <Text style={{fontSize:11, color:'gray'}} >付款：{data['buyNum'] * data['buyPrice']} 返：{data['ReturnBuyPrice']} 剩：{data['orderNumber']}</Text>
                                </Text>
                             </View>
                            </View>
                        </View>
                        </TouchableOpacity>)
                }
        return (
            <View>{returnDataView}</View>
        )
    }
    // 刷新操作
    reloadNewData(){
        this.update()
        this.fetchData(true)
    }

    // 上拉加载更多
    renderFooter(){
        if(this.state.isMoreloading){
            return(
                // <View style={{marginVertical: 10}}>
                //     <ActivityIndicator color="red"/>
                // </View>
                <View style={{marginVertical: 10,justifyContent:'center',alignItems:'center'}}>
                    <Text>end</Text>
                </View>
            )
        }else{
            return(
                <View style={{marginVertical: 10,justifyContent:'center',alignItems:'center'}}>
                    <Text>end</Text>
                </View>
            )
        }
    }
    // 滑动到做底下的时候
    _toEnd(){
        setTimeout(() => {
            this.setState({
                isMoreloading:true
            })
        },2000)
    }
    render() {
        let viewList;
        if(this.state.isLoading){
            viewList = (
                <View>
                <ActivityIndicator color="#0000ff" style={{marginTop:100}}/>
                </View>
                
            )
        }else{
            viewList = (
                <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => this._renderRow(data)}

                    pageSize = {5}
                    initialListSize={5}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.reloadNewData.bind(this)}
                            colors={['red','orange']}
                        />}
                    renderFooter={()=>this.renderFooter()}
                    onEndReached={ ()=>this._toEnd() }
                /></View>
            )
        }

        return (
            <View style={styles.container}>
                {/*练习下拉刷新，上拉加载组件，此处渲染视图*/}
                {viewList}
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
