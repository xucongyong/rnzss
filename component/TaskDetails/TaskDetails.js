import React from "react";
import {Platform,
        CameraRoll,
        StyleSheet,
        TextInput,
        Dimensions,
        Text,
        View,
        ScrollView,
        Image,
        ActivityIndicator,
        Alert,
        } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs';
const window = Dimensions.get('window');
const imageWidth = (window.width/3)+30;
const imageHeight = window.height;
let serverUrl = require("../websettings");
const axios = require('axios');
import deviceStorage from "../Login/jwt/services/deviceStorage";
let ScreenWidth = Dimensions.get('window').width;
let boxWidth = Dimensions.get('window').height/2;
import ImagePicker_rn from 'react-native-image-picker';
import {ImagePicker,Button,InputItem} from '@ant-design/react-native';
let MoneyAlgorithm = require("../MoneyAlgorithm")
import AliyunOSS from 'aliyun-oss-react-native';
const AliyunOSS_configuration = {
    maxRetryCount: 3,
    timeoutIntervalForRequest: 30,
    timeoutIntervalForResource: 24 * 60 * 60
};
const Aliyun_endpoint ='oss-cn-hangzhou.aliyuncs.com'
var rePayMoney = /^([1-5]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
var reOrderId = /^([1-9]\d{1,30})/
var reAddMoney = /^([0-9]\d{0,1})$/
const photoOptions = {
    title:'请选择图片',//标题
    cancelButtonTitle:'取消',//取消按钮名称
    takePhotoButtonTitle:'拍照',//相机按钮名称
    chooseFromLibraryButtonTitle:'选择相册',//从相册取照片名称
    quality: 0.3,//照片质量
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function name_hide(username) {
    let new_name=''
    let name_num=0
    for (var i in username){
        if( name_num%2 ==0 ){
            new_name+=username[i]
        }else{new_name+='*'}
        name_num+=1
    }
    return new_name
}
class taskScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message:"",
            productDetail: '',
            files: [],
            files_data:[],
            filesurl:[],
            ImageMain: [],
            ImageDetails: [],
            ImageNumber:1,
            event:0,
            gift:'',
            gifturl:'',
            buyPrice:0,
            buyNum:0,
            PayMoney:'',
            AddMoney:'',
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
            ShopSort:'',
            loading: false,
            PlatFormUserName:'',
            taskId: this.props.route.params.taskId,
            PlatFormOrderId:'',
            TaskState: 10,
            uptoken:'',
            total_money:0,
            add_money:0,
            buyer_money:0,
            seller_money:0,
            BuyTaskCommentEvent:0,
            BuyTaskCommentImg:[],
            BuyTaskCommentText:' ',
            imgURL:"http://imgs.zhess.com/154269024063980266.jpg",

        }
        this.closeTask = this.closeTask.bind(this)
        this.choosePicker = this.choosePicker.bind(this)
        this.TaskStateUpdate = this.TaskStateUpdate.bind(this)
        this.TaskStateUpdate6 = this.TaskStateUpdate6.bind(this)
        this.DownloadImage = this.DownloadImage.bind(this)
    }
    componentWillMount() {
        this.fetchData(); //启动的时候载入数据
        // this.startTimer();
    }

    fetchData() {
        deviceStorage.get('token').then((token) => {
            axios.get(serverUrl+'/m/task', {headers: {Authorization: token,taskId:this.props.route.params.taskId}})
                .then(response => {
                    console.log(response)
                    this.setState({productDetail:response.data})
                    this.setState({BuyTaskCommentEvent:response.data.BuyTaskCommentEvent})
                    this.setState({BuyTaskCommentText:response.data.BuyTaskCommentText})
                    if(response.data.BuyTaskCommentEvent){
                        try{
                            this.setState({BuyTaskCommentImg:JSON.parse(response.data.BuyTaskCommentImg)})
                        }catch(Error){
                            this.setState({BuyTaskCommentImg:[]})
                        }
                    }
                    this.setState({ImageMain:JSON.parse(this.state.productDetail['product_main_image'])})
                    this.setState({ImageDetails:JSON.parse(this.state.productDetail['product_details_image'])})
                    this.setState({ImageNumber: response.data.AddMoney+1})
                    this.setState({TaskState: response.data.BuyTaskState})
                    this.setState({event:response.data.event})
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
                        this.setState({AddCoupons:'领优惠卷'})
                    }else{
                        this.setState({AddCoupons:''})
                    }
                    if(response.data.AddOpenOtherProduct===1){
                      this.setState({AddOpenOtherProduct:'货比三家'})
                    }else{
                        this.setState({AddOpenOtherProduct:''})
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
                    if(response.data.PlatFormOrderId==null){
                        this.setState({PlatFormOrderId:""})
                    }else{
                        this.setState({PlatFormOrderId:response.data.PlatFormOrderId})
                    }

                    this.setState({keyWord:response.data.KeyWord})
                    this.setState({orderNumber:response.data.orderNumber})
                    this.setState({city:response.data.city})
                    this.setState({orderSort:response.data.orderSort})
                    this.setState({priceMin:response.data.priceMin})
                    this.setState({priceMax:response.data.priceMax})
                    this.setState({BuyGetPrice:response.data.BuyGetPrice})
                    this.setState({SellPayPrice:response.data.SellPayPrice})
                    this.setState({productId:response.data.ProductId})
                    let temp_shopname = name_hide(response.data.ShopUserName)
                    let temp_ShopNickName = name_hide(response.data.ShopNickName)
                    this.setState({ShopUserName:temp_shopname})
                    this.setState({ShopNickName:temp_ShopNickName})
                    this.setState({PlatFormUserName:response.data.PlatFormUserName})
                    this.setState({PayMoney:"" +response.data.PayMoney})
                    this.setState({AddMoney:"" +response.data.AddMoney})
                    if(response.data.PlatFormOrderId!==null){
                        this.setState({PlatFormOrderId:""+response.data.PlatFormOrderId})
                    }
                    if(response.data.ShopSort==='1688'){
                      this.setState({ShopSort:'1688'})
                    }else if(response.data.ShopSort==='jd'){
                      this.setState({ShopSort:'京东'})
                    }else if(response.data.ShopSort==='tmall'){
                      this.setState({ShopSort:'天猫'})
                    }else if(response.data.ShopSort==='taobao'){
                      this.setState({ShopSort:'淘宝'})
                    }
                    let total_money_temp;
                    if(response.data.event==1){
                        total_money_temp = response.data.buyPrice *response.data.buyNum
                    }else if(response.data.event==2){
                        total_money_temp = response.data.ReturnBuyPrice
                    }
                    let add_money_temp = (response.data.AddCoupons + response.data.AddOpenOtherProduct +response.data.AddSaveShop +response.data.AddOpenProduct +response.data.AddShoppingCar +response.data.AddChat +response.data.AddCommandsLike)
                    this.setState({AddMoney:add_money_temp})
                    this.setState({PayMoney:total_money_temp})
                    let MoneyAlgorithm_temp = MoneyAlgorithm(response.data.event,total_money_temp,add_money_temp,response.data.huabeiId)
                    this.setState({buyer_money:MoneyAlgorithm_temp[1]})
                    this.setState({seller_money:MoneyAlgorithm_temp[0]})
                    this.setState({loading: true})
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                }
                );
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
    commentsPrice(){
        let nn = 1
        return this.state.BuyTaskCommentImg.map((x) => {
            nn +=1
            return <View><Text>试用「追评」图片{nn}</Text><Image source={{uri: x}} style={styles.imageStyle} /></View>;
        })
    }
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
        deviceStorage.get('token').then((token) => {
            axios.get(serverUrl+'/m/closetask', {
                headers: {
                    Authorization: token,
                    taskId: this.state.taskId
                }
            })
            .then(response => {
                    this.props.navigation.navigate('index')
                })
            .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });
    }

    //state2->3
    TaskStateUpdate() {
        //上传图片
        if(reOrderId.test(this.state.PlatFormOrderId) ===false||rePayMoney.test(this.state.PayMoney) ===false ||reAddMoney.test(this.state.AddMoney) ===false){
            Alert.alert('请填写正确的订单号、付款金额、截图任务','',[{text: '确定'}])
        }else{
            this.setState({loading:true})
            axios.get(serverUrl+'/api/token').then(res=>{
                if (!res.data) {return}
                var AccessKeyId= res.data['Credentials']['AccessKeyId']
                var secret = res.data['Credentials']['AccessKeySecret']
                var SecurityToken =  res.data['Credentials']['SecurityToken']
                let filesurl=[]
                AliyunOSS.initWithSecurityToken(SecurityToken, AccessKeyId, secret, Aliyun_endpoint, AliyunOSS_configuration);
                for(var i in this.state.files_data){
                    var key =  'rn/'+(new Date).getTime() + this.state.files_data[i]['fileName'];
                    filesurl.push('https://godmachine.oss-cn-hangzhou.aliyuncs.com/'+key)
                    AliyunOSS.asyncUpload('godmachine', key, this.state.files_data[i]['uri'])
                        .then(res=>{console.log(res)})
                        .catch(err=>{console.log(err)})
                }
                this.setState({filesurl:filesurl})
                deviceStorage.get('token').then((token) => {
                    let post_data = {Authorization: token,TaskId:this.state.taskId, PayMoney:this.state.PayMoney,AddMoney:this.state.AddMoney,filesurl:JSON.stringify(this.state.filesurl),TaskState:this.state.TaskState,PlatFormOrderId:this.state.PlatFormOrderId}
                    console.log(post_data)
                    axios.post(serverUrl+'/m/taskstate', post_data)
                        .then(response => {
                            this.setState({productDetail: response.data})
                            //state 1：没有账号
                            //state 2: 不能下单
                            //state 3: 生成订单
                            if (response.data === 0) {
                                this.props.navigation.navigate('Login')
                            }else if (response.data === "") {
                                this.props.navigation.navigate('ResultView', {taskId: this.state.taskId})
                            }else{
                                Alert.alert('提醒',response.data,[{text: '确定'}])
                            }
                        })
                        .catch((error) => {
                            console.log('error 3 ' + error);
                        });
                });
            }).catch(err=>{
                console.log(err);
            })
            this.setState({loading:true})
        }
    }
    //state567->6
    TaskStateUpdate6() {
        //上传图片
        this.setState({loading: true})
        console.log(this.state.files_data.length)
        if (this.state.files_data.length < 1 || this.state.files_data.length > 9) {
            Alert.alert('1<截图<9','',[{text: '确定'}])
        } else {
            axios.get(serverUrl + '/api/token').then(res => {
                if (!res.data) {
                    return
                }
                var AccessKeyId = res.data['Credentials']['AccessKeyId']
                var secret = res.data['Credentials']['AccessKeySecret']
                var SecurityToken = res.data['Credentials']['SecurityToken']
                let filesurl = []
                AliyunOSS.initWithSecurityToken(SecurityToken, AccessKeyId, secret, Aliyun_endpoint, AliyunOSS_configuration);
                for (var i in this.state.files_data) {
                    var key = 'rn/' + (new Date).getTime() + this.state.files_data[i]['fileName'];
                    filesurl.push('https://godmachine.oss-cn-hangzhou.aliyuncs.com/' + key)
                    AliyunOSS.asyncUpload('godmachine', key, this.state.files_data[i]['uri'])
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                this.setState({filesurl: filesurl})
                deviceStorage.get('token').then((token) => {
                    axios.post(serverUrl + '/m/taskstatetwo', {
                        headers: {
                            Authorization: token,
                            TaskId: this.state.taskId,
                            filesurl: JSON.stringify(filesurl),
                            TaskState: this.state.TaskState,
                            PlatFormOrderId: this.state.PlatFormOrderId
                        }
                    })
                        .then(response => {
                            console.log(response.data)
                            this.setState({productDetail: response.data})
                            //state 1：没有账号
                            //state 2: 不能下单
                            //state 3: 生成订单
                            if (this.state.productDetail.status === 0) {
                                this.props.navigation.navigate('Login')
                            } else if (this.state.productDetail.status === 1) {
                                Alert.alert('', this.state.productDetail.message, [{text: '确定'}])
                            } else if (this.state.productDetail.status === 2) {
                                this.props.navigation.navigate('ResultView', {taskId: this.state.taskId})
                            }
                        })
                        .catch((error) => {
                            console.log('error 3 ' + error);
                        });
                });
            })
        }
    }
    //关键词
    //获取照片
    //choosePicker=()=>{
    choosePicker() {
        //1.图片state文件名
        //2.图片上传服务器名
        //3.图片文字
        let files=this.state.files
        let files_data=this.state.files_data
        ImagePicker_rn.showImagePicker(photoOptions, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let source = {url: response.uri};
                // console.log('source===' + source.url)
                // console.log(response)
                files.push(source);
                files_data.push(response);
                this.setState({
                    files: files,
                    files_data:files_data
                });
            }
        });
    }

    DownloadImage(uri) {
      if (!uri) return null;
         return new Promise((resolve, reject) => {
             let timestamp = (new Date()).getTime();//获取当前时间错
             let random = String(((Math.random() * 1000000) | 0))//六位随机数
             let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
             const downloadDest = `${dirs}/${timestamp+random}.jpg`;
             const formUrl = uri;
             const options = {
                 fromUrl: formUrl,
                 toFile: downloadDest,
                 background: true,
                 begin: (res) => {
                     // console.log('begin', res);
                     // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                 },
                };
             try {
                 const ret = RNFS.downloadFile(options);
                 ret.promise.then(res => {
                     // console.log('success', res);
                     // console.log('file://' + downloadDest)
                     var promise = CameraRoll.saveToCameraRoll(downloadDest);
                     promise.then(function(result) {
                        // alert('保存成功！地址如下：\n' + result);
                     }).catch(function(error) {
                          console.log('error', error);
                         // alert('保存失败！\n' + error);
                     });
                     resolve(res);
                 }).catch(err => {
                     reject(new Error(err))
                 });
             } catch (e) {
                 reject(new Error(e))
             }
         })

    }
    render() {
        let productView;
        let FootButton;
        let show_money_code;
        let task_comment;
        let progress;
        const comment_model = (<View>
                            {this.commentsPrice()}
                            </View>)
        let files = this.state.files

        //view money
        const MainPrice = (<ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}>
                            {this.renderChilds()}
                            </ScrollView>)

        if(this.state.loading) {
            if(this.state.TaskState==0){
                progress=(<View><Text>状态:<Text>关闭</Text></Text></View>)
            }else if(this.state.TaskState==1){
                progress=(<View><Text>状态:<Text>完成</Text></Text></View>)
            }else if(this.state.TaskState==2){
                progress=(<View><Text>状态:<Text> 等待付款</Text></Text></View>)
            }else if(this.state.TaskState==3){
                progress=(<View><Text>状态:<Text>等待发货</Text></Text></View>)
            }else if(this.state.TaskState==4){
                progress=(<View><Text>状态:<Text>等待修改</Text></Text></View>)
            }else if(this.state.TaskState==5){
                progress=(<View><Text>状态:<Text>等待确认收货</Text></Text></View>)
            }else if(this.state.TaskState==6){
                progress=(<View><Text>状态:<Text>等待修改</Text></Text></View>)
            }else if(this.state.TaskState==7){
                progress=(<View><Text>状态:<Text>等待发货</Text></Text></View>)
            }
            if(this.state.event==1){
                show_money_code=(<View>
                            <Text style={{fontSize:11}}> ￥
                            <Text style={{fontSize:25, color:'#dc3232'}}>
                            {this.state.buyer_money-(this.state.buyNum*this.state.buyPrice)}
                            </Text>
                                <Text>
                                    拍:{this.state.buyPrice}元x{this.state.buyNum}件=
                                    <Text style={{color: "red"}}>
                                        {this.state.buyPrice*this.state.buyNum}
                                    </Text>
                                    元, 返现:
                                    <Text style={{color: "red"}}>
                                        {this.state.buyer_money}
                                    </Text>
                                    元
                                </Text>
                            </Text>
                            <Text>类别:红包试用</Text>
                            </View>
                                )
            }else if(this.state.event==2){
                show_money_code=(<View>
                            <Text style={{fontSize:11}}> ￥
                            <Text style={{fontSize:25, color:'#dc3232'}}>
                                 {(this.state.buyNum*this.state.buyPrice)-this.state.ReturnBuyPrice}
                                 </Text>
                                 <Text>
                                付:{this.state.buyPrice}元x{this.state.buyNum}件=
                                <Text style={{color: "red"}}>
                                {this.state.buyPrice*this.state.buyNum}
                                </Text>元, 返:<Text style={{color: "red"}}>{this.state.buyer_money}</Text>元</Text>
                                </Text>
                                <Text> 类别:免费折扣试用</Text>
                                </View>
                                )
            }
            if(this.state.TaskState == 2 || this.state.TaskState == 3 || this.state.TaskState == 4) {
                FootButton =(<View style={styles.shopcart}>
                    <View style={[styles.bottomItem, {width: window.width * 0.2}]}>
                        <Text
                            onPress={() => {Alert.alert('取消订单','', [{text: '确定', onPress: () => this.closeTask()},{text: '不取消'}])}}
                        >取消</Text>
                            </View>
                        <View style={[styles.bottomItem, {width: window.width * 0.8, backgroundColor: 'red'}]}>
                        <Text
                            onPress={() => {Alert.alert('确定试用保存吗？','',[{text: '确定', onPress: () => this.TaskStateUpdate()},{text: '取消'}])}}
                            >提交试用</Text>
                        </View>
                        </View>
                    )
                productView = (
                            <View>
                                    <Text style={{color: "red"}}>上传截图:
                                        {this.state.AddCoupons}{' '}
                                        {this.state.AddOpenOtherProduct}{' '}
                                        {this.state.AddSaveShop}{' '}
                                        {this.state.AddOpenProduct}{' '}
                                        {this.state.AddShoppingCar}{' '}
                                        {this.state.AddChat}{' '}
                                        {this.state.AddCommandsLike}
                                    </Text>
                                    <ImagePicker
                                        files={this.state.files}
                                        onChange={(files, type, index) => {
                                            if(type=='remove'){
                                                var filtered_data = this.state.files_data.filter(function(value, index3, arr){return index3 != index;});
                                                var filtered = this.state.files.filter(function(value, index1, arr){return index1 != index;});
                                                this.setState({files:filtered,files_data:filtered_data})
                                            }
                                        }}
                                        onImageClick={(index, files) => {
                                            console.log(files[index].url)
                                        }}
                                        onAddImageClick={this.choosePicker}
                                    />
                                <InputItem
                                    clear
                                    type={'number'}
                                    defaultValue={this.state.PlatFormOrderId.toString()}
                                    onChange={(xx)=>{this.setState({PlatFormOrderId:xx});console.log(xx)}}
                                >订单号</InputItem>
                                <InputItem
                                    clear
                                    type={'number'}
                                    defaultValue={this.state.PayMoney.toString()}
                                    onChange={(xx)=>{this.setState({PayMoney:xx});console.log(xx)}}
                                >付款金额</InputItem>
                                <InputItem
                                    clear
                                    type={'number'}
                                    defaultValue={this.state.AddMoney.toString()}
                                    onChange={(xx)=>{this.setState({AddMoney:xx});console.log(xx)}}
                                >截图任务</InputItem>
                                <View style={{flexDirection: 'row'}}>
                                    <Text>店铺类别:
                                    <Text><Text style={{color: "red"}}>{this.state.ShopSort}</Text>
                                    <Text>账号:
                                    <Text style={{color: "red"}}>{this.state.PlatFormUserName}</Text>
                                    </Text></Text>{'\n'}
                                    <Text>
                                    搜索:<Text style={{color: "red"}}>{this.state.keyWord}</Text>{'  '}
                                    城市:<Text style={{color: "red"}}>{this.state.city}</Text>{'  '}
                                    <Text>价格:{this.state.priceMin}-{this.state.priceMax}</Text>{'  '}
                                    </Text>
                                    {'\n'}
                                    <Text>店铺：{this.state.ShopUserName}\{this.state.ShopNickName}</Text>{'\n'}
                                    <Text>页面价格：{this.state.showPrice}</Text>{'\n'}
                                    <Text>购买规格：{this.state.buyRules}</Text>{'\n'}
                                    <Text>账号要求：{this.state.huabeiId}</Text>{'\n'}
                                    <Text>礼物：{this.state.gift} - {this.state.gifturl}</Text>{'\n'}
                                    <Text>备注：{this.state.Node}</Text>{'\n'}
                                    <Text>支付：不允许「
                                    {this.state.PayCard} {' '}
                                    {this.state.PayCoupons} {' '}
                                    {this.state.Payhuabei}{' '}淘客]
                                    </Text>{'\n'}
                                    </Text>
                                </View>
                            </View>
                        )
            } else if (this.state.TaskState === 5||this.state.TaskState === 6||this.state.TaskState === 7) {
                FootButton =(<View style={styles.shopcart}>
                                    <View style={[styles.bottomItem, {width: window.width * 0.2}]}>
                                        <Text
                                            onPress={() => {Alert.alert('取消订单','', [{text: '确定', onPress: () => this.closeTask()},{text: '不取消'}])}}
                                        >取消</Text></View>
                                    <View style={[styles.bottomItem, {width: window.width * 0.8, backgroundColor: 'red'}]}>
                                        <Text
                                            onPress={() => {Alert.alert('确定保存吗？','',[{text: '保存', onPress: () => this.TaskStateUpdate6()},{text: '取消'}])}}
                                        >保存试用报告</Text>
                                    </View>
                                    </View>
                                    )
                task_comment= (
                    <View>
                    <Text
                        onPress={() => this.DownloadImage(this.state.imgURL)}
                        >
                    试用追评：
                    </Text>
                    <TextInput style = {styles.input}
                        name='BuyTaskCommentText'
                        type="number"
                        numberOfLines = {3}
                        value={this.state.BuyTaskCommentText}
                        />
                    </View>
                    )
                productView = (<View>
                                <Text>附加任务:
                        <Text style={{color: "red"}}>评价截图
                         </Text>
                            </Text>
                            <ImagePicker
                            files={this.state.files}
                            onChange={(files, type, index) => {
                                if(type=='remove'){
                                    var filtered_data = this.state.files_data.filter(function(value, index3, arr){return index3 != index;});
                                    var filtered = this.state.files.filter(function(value, index1, arr){return index1 != index;});
                                    this.setState({files:filtered,files_data:filtered_data})
                                }
                            }}
                            onImageClick={(index, files) => {
                                console.log(files[index].url)
                            }}
                            onAddImageClick={this.choosePicker}
                            />
                        <InputItem
                            onChange={(xx)=>{this.setState({PlatFormOrderId:xx});console.log(xx)}}
                        >订单号</InputItem>
                            <Text style={{color: "red"}}>试用体验报告：</Text>
                            <TextInput style = {styles.input}
                            name='xxx'
                            type="number"
                            />
                        <View style={{flexDirection: 'row'}}>

                            <Text>账号:
                        <Text style={{color: "red"}}>{this.state.PlatFormUserName}</Text>{'\n'}
                            </Text>
                            </View>
                            </View>
                        )
                } else {
                    productView=(<ActivityIndicator color="#0000ff" style={{marginTop:50}} />)
                    }
        } else {
                productView=(<ActivityIndicator color="#0000ff" style={{marginTop:50}} />)
        }

        return (
            <View style={{flex: 1}}>
            <View style={styles.container}>
                <ScrollView>
                {MainPrice}
                {show_money_code}
                {progress}
                {task_comment}
                {productView}
                {comment_model}
                </ScrollView>

                </View>
            <View style={styles.shopcart}>
                    {FootButton}
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
   input: {
      margin: 10,
      height: 20,
      borderColor: '#ffffff',
      borderWidth: 1
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
