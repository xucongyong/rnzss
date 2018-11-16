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

let token = ''
const photoOptions = {
    title:'请选择图片',//标题
    cancelButtonTitle:'取消',//取消按钮名称
    takePhotoButtonTitle:'拍照',//相机按钮名称
    chooseFromLibraryButtonTitle:'选择相册',//从相册取照片名称
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


class taskScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetail: '',
            files: [],
            ImageMain: [],
            ImageDetails: [],
            image_num:1,
            event:0,
            gift:'',
            gifturl:'',
            buyPrice:0,
            buyNum:0,
            showPrice:0,
            ReturnBuyPrice:0,
            buyRules:'',
            Node:'',
            AddCoupons:'',
            AddOpenOtherProduct:'',
            AddSaveShop:'',
            AddOpenProduct:'',
            AddShoppingCar:'',
            AddChat:'',
            AddCommandsLike:'',
            PayCard:'',
            PayCoupons:'',
            Payhuabei:'',
            huabeiId:'',
            keyWord:'',
            orderNumber:'',
            city:'',
            orderSort:'综合排序',
            priceMin:'',
            priceMax:'',
            SellPayPrice:0,
            BuyGetPrice:0,
            productId:'',
            ShopUserName:'',
            ShopNickName:'', 
            loading: false,
            taskId: this.props.navigation.getParam('taskId', 'NO-ID'),
            TaskState: 10,
        }
        this.genrateTask = this.genrateTask.bind(this)
        this.cancelTask = this.cancelTask.bind(this)
        this.closeTask = this.closeTask.bind(this)
        this.choosePicker = this.choosePicker.bind(this)
        this.upload = this.upload.bind(this)
        var files = this.state.files;
        this.onChange = this.onChange.bind(this)

    }

    componentWillMount() {
        this.fetchData(this.state.taskId); //启动的时候载入数据
        // this.startTimer();
    }
    // componentWillUnmount(){
    //     clearInterval(this.timer);
    // }

    fetchData(posttaskid) {
        console.log(posttaskid)
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log(this.props.navigation.getParam('taskId', 'NO-ID'))

            axios.get(taskUrl, {headers: {Authorization: token, sort: 0, version: '1.0', taskId: this.state.taskId}})
                .then(response => {
                    this.setState({productDetail: response.data})
                    this.setState({image_num: response.data.img_num})
                    this.setState({TaskState: response.data.BuyTaskState})
                    this.setState({ImageMain: JSON.parse(this.state.productDetail['Details'])['mainImage']})
                    this.setState({ImageDetails: JSON.parse(this.state.productDetail['Details'])['DetailsImage']})
                    if(response.data.event===1){
                      this.setState({event:'红包试用'})
                    }else if(response.data.event===2){
                      this.setState({event:'实物免费折扣'})
                    }
                    this.setState({gift:response.data.gift})
                    this.setState({gifturl:response.data.gifturl})
                    this.setState({buyPrice: response.data.buyPrice})
                    this.setState({buyNum: response.data.buyNum})
                    this.setState({showPrice: response.data.showPrice})
                    this.setState({ReturnBuyPrice: response.data.ReturnBuyPrice})
                    this.setState({buyRules: response.data.buyRules})
                    this.setState({Node: response.data.Node})
                    this.setState({AddCoupons: response.data.AddCoupons})
                    if(response.data.AddCoupons===1){
                      this.setState({AddCoupons:'领优惠卷'}) }
                    if(response.data.AddOpenOtherProduct===1){
                      this.setState({AddOpenOtherProduct:'打开对手产品'})
                    }
                    if(response.data.AddSaveShop===1){
                      this.setState({AddSaveShop:'收藏店铺'})
                    }
                    if(response.data.AddOpenProduct===1){
                      this.setState({AddOpenProduct:'店铺其他产品'})
                    }
                    if(response.data.AddShoppingCar===1){
                      this.setState({AddShoppingCar:'加购物车'})
                    }
                    if(response.data.AddChat===1){
                      this.setState({AddChat:'聊天'})
                    }
                    if(response.data.AddCommandsLike===1){
                      this.setState({AddCommandsLike:'好评点赞'})
                    }
                    if(response.data.PayCard===1){
                      this.setState({PayCard:''})
                    }else{
                      this.setState({PayCard:'信用卡'})
                    }
                    if(response.data.PayCoupons===1){
                      this.setState({PayCoupons:''})
                    }else{
                      this.setState({PayCoupons:'优惠卷'})
                    }
                    if(response.data.Payhuwbei===1){
                      this.setState({Payhuabei:''})
                    }else{
                      this.setState({Payhuabei:'花呗'})
                    }
                    if(response.data.huabeiId===1){
                      this.setState({huabeiId:'花呗白条账号'})
                    }else{
                      this.setState({huabeiId:''})
                    }
                    this.setState({keyWord:response.data.keyWord})
                    this.setState({orderNumber:response.data.orderNumber})
                    this.setState({city:response.data.city})
                    this.setState({orderSort:response.data.orderSort})
                    this.setState({priceMin:response.data.priceMin})
                    this.setState({priceMax:response.data.priceMax})
                    this.setState({BuyGetPrice:response.data.BuyGetPrice})
                    this.setState({SellPayPrice:response.data.SellPayPrice})
                    this.setState({productId:response.data.SellPayPrice})
                    this.setState({ShopUserName:response.data.ShopUserName})
                    this.setState({ShopNickName:response.data.ShopNickName})
                    this.setState({loading: true})
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });
    }

    //渲染图
    renderChilds() {
        var N = 1
        return this.state.ImageMain.map((x) => {
            N += 1
            return <Image key={N} source={{uri: x}} style={styles.imageStyle}/>;
        })
    }

    // }


    //渲染图
    renderDeatlsImage() {
        var Y = 10
        return this.state.ImageDetails.map((x) => {
            Y += 1
            console.log(x)
            return <Image key={Y} source={{uri: x}} style={styles.DeatlsImageStyle}/>;
        })
    }

    //关闭订单
    closeTask() {
        console.log('closeTask')
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            axios.get(closeTaskUrl, {
                headers: {
                    Authorization: token,
                    sort: 0,
                    version: '1.0',
                    taskId: this.state.taskId
                }
            })
                .then(response => {
                    this.props.navigation.navigate('TestMain')
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });

    }
    //取消订单
    cancelTask() {
        console.log('cancelTask')
        Alert.alert(
            '取消订单',
            '确定取消订单吗？',
            [
                {text: '确定取消', onPress: () => this.closeTask()},
                {text: '不取消', onPress: () => console.log('Cancel Pressed')},
            ],
            {cancelable: false}
        )
    }
    //上传图片的变更
    onChange = (files, type, index) => {
        console.log('onChange')
        console.log(files, type, index);
        this.setState({
            files,
        });
    };

    //state2->3
    genrateTask() {
        console.log(this.state.taskId)
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log(this.state.taskId)
            axios.post(OrderUrl, {headers: {Authorization: token, version: '1.0', orderid: this.state.taskId}})
                .then(response => {
                    this.setState({productDetail: response.data})
                    //state 1：没有账号
                    //state 2: 不能下单
                    //state 3: 生成订单
                    console.log('status:' + this.state.productDetail.status)
                    if (this.state.productDetail.status === 0) {
                        this.props.navigation.navigate('Login')
                    } else if (this.state.productDetail.status === 1) {
                        Alert.alert(
                            this.state.productDetail.message,
                            [
                                {text: '先不绑定', onPress: () => console.log('Cancel Pressed!')},
                                {text: '马上淘宝绑定', onPress: () => this.props.navigation.navigate('addTbAccount')},
                                {text: '马上京东绑定', onPress: () => this.props.navigation.navigate('addTbAccount')},
                            ],
                            {cancelable: false}
                        )
                    } else if (this.state.productDetail.status === 2) {
                        Alert.alert(
                            '',
                            '已有任务，请到任务中心操作',
                            [
                                {text: '返回首页', onPress: () => this.props.navigation.navigate('TestMain')}
                            ],
                            {cancelable: false}
                        )
                    } else if (this.state.productDetail.status === 3) {
                        this.props.navigation.navigate('TaskDetails', {taskid: this.state.productDetail.taskid})
                    } else if (this.state.productDetail.status === 4) {
                        Alert.alert(
                            this.state.productDetail.message,
                            [
                                {text: '返回首页', onPress: () => this.props.navigation.navigate('TestMain')}
                            ],
                            {cancelable: false}
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
    choosePicker() {
        //1.图片state文件名
        //2.图片上传服务器名
        //3.图片文字
        picker.showImagePicker(photoOptions, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let source = {url: response.uri};
                console.log('source===' + source.url)
                console.log(response)
                files.push(source);
                this.setState({
                    files: files
                });
                console.log('data===' + this.state.files)
            }
        });
    }

    upload(uri) {//这里是核心上传的代码
        var options = {
            scope: 'crysystem',
        };
        var putPolicy = new qiniu.Auth.PutPolicy2(
            {scope: "crysystem"}
        );
        var uptoken = putPolicy.token();
        qiniu.Rpc.uploadFile(uri, uptoken, {
                key: uptoken,
                type: 'application/octet-stream',
                //name:undefined,
            }
            , function (resp) {
                console.log(resp);
            });
    }

    render() {
        let productView;
/*
* 信息
     1. 所有行为的截图
     2. 订单编号
    3. 1-4天的行为截图
0. 关闭交易
1. 完成交易
2. 任务开始
    * 按键提醒：40分钟内关闭(按钮确认)
3. 填写订单号\验证链接\需要的截图\付款金额截图  time:40分钟\ [可关闭交易]
    * 3.1 等待修改信息：time：1天  如果不改，关闭交易=0  [可关闭交易]
4. 等商家发货 可补图和改单号  time：2天、可拒绝：返回3.1 [可关交易]
5. 商家发货：如果有评价那么关联评价截图、如果没有，等待默认好评 [可关闭交易]
6. 上传好评截图:截图 任务好以后等待资金到账   [可确认收货]
   * 6.1 订单驳回：请重新评价   [可确认收货]
   * 申诉:任务等待\买家没拍任务、价格不对、威胁[在后台管理中加申诉中心]
*/        
      if (this.state.loading) {
            if (this.state.TaskState === 2) {
                console.log(this.state.TaskState)
                files = this.state.files
                var testa = ('21121')
                productView = (<View style={{flex: 1}}>
                    <View style={styles.container}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}>
                            {this.renderChilds()}
                        </ScrollView>
                        <ScrollView>
                            <View style={{
                              flexDirection: 'row',
                            }}>
                                <Text>
                                <Text>类型：</Text>
                                <Text>淘宝app</Text>
                                {'\n'}
                                <Text>关键词、通道：</Text>
                                <Text>城市：</Text>
                                <Text>搜索排序：</Text><Text>价格： 100 - 2000</Text>{'\n'}
                                <Text>产品单价：</Text><Text>拍：件</Text>
                                <Text>共计： 元</Text>{'\n'}
                                <Text>礼物:时间付款</Text>
                                <Text>领优惠劵：</Text>
                                <Text>允许用银行卡付款</Text>
                                <Text>备注 ：</Text>
                                </Text>
                            </View>
                                <View>
                                <ImagePicker
                                    files={this.state.files}
                                    selectable={files.length < this.state.image_num}
                                    onChange={this.onChange}
                                    onImageClick={(index, files) => {
                                        console.log(files[index].url)
                                    }}
                                    onAddImageClick={this.choosePicker}
                                />
                                <TouchableOpacity onPress={() => {
                                    let files = this.state.files;
                                    console.log(this.state.files)
                                    this.upload(files[0].url);
                                }}>
                         <View><Button>保存图片</Button>
                                  </View></TouchableOpacity>
                            </View>
                            
                            <View>
                                <Text>需要截图：搜索关键词</Text>
                                <InputItem>链接验证</InputItem>
                                <InputItem>订单号</InputItem>
                                <InputItem>付款金额</InputItem>

                            </View>
                            {this.renderDeatlsImage()}
                        </ScrollView>
                    </View>
                    <View style={styles.shopcart}>
                        <View style={[styles.bottomItem, {width: window.width * 0.2}]}>
                            <Text
                                onPress={() => this.cancelTask()}
                            >取消试用</Text></View>
                        <View style={[styles.bottomItem, {width: window.width * 0.3}]}>
                            <Text>倒计时：</Text><Text style={{color: "red"}}>5分</Text></View>
                        <View style={[styles.bottomItem, {width: window.width * 0.5, backgroundColor: 'red'}]}>
                            <Text
                                onPress={() => this.genrateTask()}
                            >付款，写订单号</Text></View>
                    </View>
                </View>)
                console.log('test312')
            } else if (this.state.TaskState === 3) {
                console.log(this.state.TaskState)
            } else if (this.state.TaskState === 4) {
                console.log(this.state.TaskState)
            } else if (this.state.TaskState === 5) {
                console.log(this.state.TaskState)
            } else {
                //productView=(<ActivityIndicator color="#0000ff" style={{marginTop:50}} />)
                productView = (<View><Text>21</Text>{this.state.testt}</View>)
            }
        } else {
            //productView=(<ActivityIndicator color="#0000ff" style={{marginTop:50}} />)
            productView = (<View><Text>21</Text>{this.state.testt}</View>)
        }
        return (
            <View style={{flex: 1}}>{productView}</View>
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
        //backgroundColor: 'red',
        flexDirection: 'row',
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
