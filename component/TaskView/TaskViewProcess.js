import React from 'react';
import {
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    View,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
var serverUrl = require("../websettings")

const axios = require('axios');
import deviceStorage from "../Login/jwt/services/deviceStorage";
let token = ''


export default class MyComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            isLoading:false, //载入数据判断
            page:1,
            sort:0,
            isEnd:false,
        }
    }
    componentDidMount(){
        if(this.props.route.name=="进行"){
            this.setState({sort:2})
        }else if(this.props.route.name=="全部"){
            this.setState({sort:''})
        }else if(this.props.route.name=="完成"){
            this.setState({sort:1})
        }else if(this.props.route.name=="关闭"){
            this.setState({sort:0})
        }
        console.log(this.props.route.name)
        this.fetchData(); //启动的时候载入数据
    }

    fetchData(){
        this.setState({isLoading:true});
        deviceStorage.get('token').then((token) => {
            axios.get(serverUrl+'/m/getbuytask', { headers: { Authorization: token},params:{sort:this.state.sort,page:this.state.page}})
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
                    console.log('error 3 ' + error);
                });
        });
        this.setState({isLoading:false});

    }
    //listview数据加工成页面
    _renderRow(data){
        return (
            <TouchableOpacity onPress={()=> {
                this.props.navigation.navigate('TaskDetails',{taskId:data['item']['BuyTaskId']})}}>
            <View style={styles.cellBoxStyle}>
                <Text>{'试用分类:'+data['item']['event']+'订单状态：'+data['item']['BuyTaskState']}</Text>
                <Text>{'关键词:'+data['item']['KeyWord']+'平台订单号：'+data['item']['PlatFormOrderId']}</Text>
            </View>
            </TouchableOpacity>
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
        let viewList = (
                <FlatList
                    data={this.state.data}
                    renderItem={(data) => this._renderRow(data)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this.reloadNewData.bind(this)}
                            colors={['red','orange']}
                        />}
                    ListFooterComponent={()=>this.renderFooter()}
                    onEndReached={()=>this._toEnd()}
                />)
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
