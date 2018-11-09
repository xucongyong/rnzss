import React from "react";
import {StyleSheet,TextInput,Dimensions,Text, View, ScrollView,Image,ActivityIndicator,TouchableOpacity,Alert} from "react-native";
const window = Dimensions.get('window');
const imageWidth = (window.width/3)+30;
const imageHeight = window.height;
var serverUrl = require("../websettings")
const taskUrl = serverUrl+'/m/task';
const closeTaskUrl = serverUrl+'/m/closetask';
const axios = require('axios');
import deviceStorage from "../Login/jwt/services/deviceStorage";
var ScreenWidth = Dimensions.get('window').width;
var boxWidth = Dimensions.get('window').height/2;
import * as picker  from "react-native-image-picker";
import {TextareaItem,ImagePicker,InputItem,List,WhiteSpace,Button} from 'antd-mobile-rn';
var qiniu = require('react-native-qiniu');
var data = [];

let token = ''
const photoOptions = {
    title:'请选择图片',//标题
    cancelButtonTitle:'取消',//取消按钮名称
    takePhotoButtonTitle:'拍照',//相机按钮名称
    chooseFromLibraryButtonTitle:'选择相册...',//从相册取照片名称
      quality: 0.8,//照片质量
    mediaType:'photo',//可以是照片，也可以是video
    videoQuality:'high',//视频质量
    durationLimit:10,//video最长10s
    allowsEditing: false,//照片是否可以被修改，Ios有效
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


class taskScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            PD:'',
            productDetail:'',
            files: data,
            currentPage: 0,
            ImageMain:[],
            ImageDetails:[],
            loading: false,
            taskId:this.props.navigation.getParam('taskId','NO-ID'),
            GenrateTasking:false,
            TaskState:10,
        }
        this.genrateTask = this.genrateTask.bind(this)
        this.cancelTask = this.cancelTask.bind(this)
        this.closeTask = this.closeTask.bind(this)
        this.choosePicker = this.choosePicker.bind(this)
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

            axios.get(taskUrl, { headers: { Authorization: token, sort:0,version:'1.0',taskId:this.state.taskId}})
                .then(response => {
                    this.setState({productDetail:response.data})
                    this.setState({TaskState:response.data.BuyTaskState})
                    this.setState({ImageMain:JSON.parse(this.state.productDetail['Details'])['mainImage']})
                    this.setState({ImageDetails:JSON.parse(this.state.productDetail['Details'])['DetailsImage']})
                    this.setState({loading:true})
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
            console.log(x)
            return <Image key={Y} source={{uri:x}} style={styles.DeatlsImageStyle} />;
        })}
    //关闭订单
    closeTask(){
        console.log('closeTask')
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            axios.get(closeTaskUrl, { headers: { Authorization: token, sort:0,version:'1.0',taskId:this.state.taskId}})
                .then(response => {
                    this.props.navigation.navigate('TestMain')
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });
    
    }

    cancelTask(){
        console.log('cancelTask')
        Alert.alert(
              '取消订单',
              '确定取消订单吗？',
              [
                {text: '确定取消', onPress: () => this.closeTask()},
                {text: '不取消', onPress: () => console.log('Cancel Pressed')},
              ],
              { cancelable: false }
            )
    }
    //state2->3
    genrateTask(){
        console.log(this.state.taskId)
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log(this.state.taskId)
            axios.post(OrderUrl, { headers: { Authorization: token, version:'1.0',orderid:this.state.taskId}})
                .then(response => {
                    this.setState({productDetail:response.data})
                    //this.setState({ImageMain:JSON.parse(this.state.productDetail['Details'])['mainImage']})
                    //this.setState({ImageDetails:JSON.parse(this.state.productDetail['Details'])['DetailsImage']})
                    //this.setState({loading:true})
                    //state 1：没有账号
                    //state 2: 不能下单
                    //state 3: 生成订单
                    console.log('status:'+this.state.productDetail.status)
                    if(this.state.productDetail.status === 0){
                        this.props.navigation.navigate('Login')
                    }else if(this.state.productDetail.status === 1){
                        Alert.alert(
                            this.state.productDetail.message,
                            [
                                {text: '先不绑定', onPress: () => console.log('Cancel Pressed!')},
                                {text: '马上淘宝绑定', onPress: () => this.props.navigation.navigate('addTbAccount')},
                                {text: '马上京东绑定', onPress: () => this.props.navigation.navigate('addTbAccount')},
                            ],
                            { cancelable: false }
                            )
                    }else if(this.state.productDetail.status === 2){
                        Alert.alert(
                              '',
                              '已有任务，请到任务中心操作',
                            [
                                {text: '返回首页', onPress: () => this.props.navigation.navigate('TestMain')}
                            ],
                            { cancelable: false }
                            )
                    }else if(this.state.productDetail.status === 3){
                        this.props.navigation.navigate('TaskDetails',{taskid:this.state.productDetail.taskid})
                    }else if(this.state.productDetail.status === 4){
                        Alert.alert(
                            this.state.productDetail.message,
                            [
                                {text: '返回首页', onPress: () => this.props.navigation.navigate('TestMain')}
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
    //获取照片
    //choosePicker=()=>{
    choosePicker(){
            picker.showImagePicker(photoOptions, (response) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }
                else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                }else {
                    let source = {url: response.uri} ;
                            console.log('source===' + source.url)
                    console.log(response)
                    var files = this.state.files;
                    files.push(source);
                    this.setState({
                               files:files
                           });
                    console.log('data===' + this.state.files)
                }
            });
        }
    upload(uri) {//这里是核心上传的代码
          qiniu.Rpc.uploadFile(uri,'_5q1hS4hLzHrWvNfK5wnQczIPub43_NnvMl7d-4B:RD93EuPYVULGU7AAmBMVp0T8oxs=:eyJzY29wZSI6Im15YXBwIiwiZGVhZGxpbmUiOjE1MjE4OTAyOTh9', {
                key:'asdf',
                type:'application/octet-stream',
                name:undefined,
              }
            ,function (resp) {
            console.log(resp);
          });
     }

    render(){
        let productView;
        //2 任务开始 30分钟内关闭
        //3 任务确认 ->以填写单号
        //4 商家发货
        //5 买家驳回任务
        //6 卖家驳回任务
        //7 客服介入

        if(this.state.loading){
            if(this.state.TaskState === 2){
            console.log(this.state.TaskState)
            files = this.state.files
            productView = (
                <View style={{flex:1}}>
                <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}>
                    {this.renderChilds()}
                </ScrollView>
                    <ScrollView>
                     <View>
                        <Text>类型：</Text>
                        <Text>请打开平台：APP</Text>
                        <Text>搜关键词、通道：</Text>
                        <Text>产品单价：</Text><Text>拍：件</Text><Text>共计： 元</Text>
                        <Text>城市：</Text><Text>搜索排序：</Text><Text>价格区间： 100 - 2000</Text>
                        <Text>礼物：礼物x - x 时间付款</Text>
                        <Text>领优惠劵 ：</Text>
                        <Text>允许用银行卡付款</Text>
                        <Text>备注 ：</Text>
                        <View>
                                <ImagePicker
                                          files={files}
                                          selectable={files.length < 2}
                                          onChange={this.onChange}
                                          onImageClick={(index, files) =>{
                                            console.log(files[index].url)
                                          } }
                                          onAddImageClick={
                                            this.choosePicker
                                          }
                                        />
                            <TouchableOpacity onPress={()=>{
                              let imgAry = this.state.files;
                              console.log(this.state.files)
                              this.upload(imgAry[0].url);}}><Text>上传</Text></TouchableOpacity>
                         </View>
                    </View>
                        {this.renderDeatlsImage()}
                    </ScrollView>
                </View>
                <View style={styles.shopcart}>
                    <View style={[styles.bottomItem,{width:window.width*0.2}]}>
                    <Text
                    onPress={() => this.cancelTask()}
                    >取消试用</Text></View>
                    <View style={[styles.bottomItem,{width:window.width*0.3}]}>
                    <Text>倒计时：</Text><Text style={{ color : "red"}}>5分</Text></View>
                    <View style={[styles.bottomItem,{width:window.width*0.5,backgroundColor: 'red'} ]}>
                    <Text
                    onPress={() => this.genrateTask()}
                    >已付款，写订单号</Text></View>
                    </View>
                </View>)
            }else if(this.state.TaskState === 3){
                console.log(this.state.TaskState)
            }else if(this.state.TaskState === 4){
                console.log(this.state.TaskState)
            }else if(this.state.TaskState === 5){
                console.log(this.state.TaskState)
            }else{
            productView=(<ActivityIndicator color="#0000ff" style={{marginTop:50}} />)
            }
        }else{
            productView=(<ActivityIndicator color="#0000ff" style={{marginTop:50}} />)
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

module.exports = taskScreen;