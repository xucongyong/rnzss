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
} from 'react-native';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');
const dataUrl = 'https://api.douban.com/v2/movie/top250?count=350';
var serverUrl = require("../websettings")
const GetBuyTaskUrl = serverUrl+'/m/getbuytaskdone';

const axios = require('axios');
import deviceStorage from "../Login/jwt/services/deviceStorage";
import { withNavigationFocus } from 'react-navigation';



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
        this.setState({
            isLoading:true,
        })
        this.fetchData(); //启动的时候载入数据
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
            axios.get(GetBuyTaskUrl, { headers: { Authorization: token, sort:0}})
                .then(response => {
                    console.log('response.data')
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
        return (
            <TouchableOpacity onPress={()=> {
                this.props.navigation.navigate('TaskDetails',{taskId:data['BuyTaskId']})}}>
            <View style={styles.cellBoxStyle}>
                <Text>{'试用分类:'+data['event']+'订单状态：'+data['BuyTaskState']}</Text>
                <Text>{'关键词:'+data['KeyWord']+'平台订单号：'+data['PlatFormOrderId']}</Text>
            </View>
            </TouchableOpacity>
        )
    }
    // 刷新操作
    reloadNewData(){
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
                </View>
            )
        }else{
            return(
                <View style={{marginVertical: 10,justifyContent:'center',alignItems:'center'}}>
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
                <Text>end下拉刷新</Text>
                </View>
                
            )
        }else{
            viewList = (
                <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => this._renderRow(data)}
                    enableEmptySections={true}
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
        flexDirection:'column',
        backgroundColor: 'white',
        padding: 10,
        height: 95,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderStyle: null,
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',    // 设置阴影
        shadowOffset: {width:0.5, height: 0.5},
        shadowOpacity: 0.4,   // 透明度
        shadowRadius: 1,
        elevation:2   //   高度，设置Z轴，可以产生立体效果
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
