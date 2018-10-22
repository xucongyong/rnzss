import React from "react";
import {StyleSheet,Dimensions,Text, View, ScrollView, Button,Image,ActivityIndicator} from "react-native";
const window = Dimensions.get('window');
const imageWidth = (window.width/3)+30;
const imageHeight = window.height;
var CommonCell = require('./CommonCell');
const productUrl = 'http://127.0.0.1:7001/m/product';
const axios = require('axios');
import deviceStorage from "../Login/jwt/services/deviceStorage";
var ScreenWidth = Dimensions.get('window').width;
var boxWidth = Dimensions.get('window').height/2;
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
            loading: false,
            taskId:this.props.navigation.getParam('taskId','NO-ID'),
        }
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
                    this.setState({loading:true})
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
    //渲染图
    renderChilds(){
        var productDetailNum = 0
        return this.state.ImageMain.map((x)=>{
            productDetailNum +=1
            return <Image key={{productDetailNum}} source={{uri:x}} style={styles.imageStyle} />;
        })
        }
   // 渲染圆
    renderCircles = () =>{
        return this.state.productDetail.map((x)=>{
            var style = {};
            var productDetailNum = 0
            if (i === this.state.currentPage){
                style = {color: 'orange'};
            }
            return <Text key={productDetailNum} style={[styles.circleStyle.style]}>&bull;</Text>
        })}

    //滚动回调
    handleScroll = (e) => {
        var x = e.nativeEvent.contentOffset.x;
        var currentPage = Math.floor(e.nativeEvent.contentOffset.x / ScreenWidth);
        this.setState({currentPage: currentPage});
        console.log('creentPage:'+currentPage);
    }

    //定时器
    startTimer = () => {
        this.timer = setInterval(() => {
            //计算出滚动的页面索引，改变state
            var currentPage = ++ this.state.currentPage == this.state.productDetail.length ? 0 : this.state.currentPage;
            this.setState({currentPage: currentPage});
            //计算滚动的距离
            var offsetX = currentPage * ScreenWidth;
            this.refs.scrollView.scrollTo({x: offsetX, y:0, animated: true})
            console.log(currentPage);
        }, 30000)
    }
    //开始滚动
    handleScrollBegin = () =>{
        console.log('handleScrollBegin');
        clearInterval(this.timer);
    }
    //上面启动，下面关闭
    handleScrollEnd = () =>{
        this.startTimer();
    }
    render(){
        let productView;
        const taskId = this.props.navigation.getParam('taskId','NO-ID')
        const imageUrl = this.props.navigation.getParam('imageUrl','NO-ImageUrl')
        if(this.state.loading){

            productView = (<View style={styles.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={this.handleScroll}
                    onScrollBeginDrag={this.handleScrollBegin}
                    onScrollEndDrag={this.handleScrollEnd}>
                    {/*子元素*/}
                    {this.renderChilds()}
                    {/*<View style={styles.circleWrapperStyle}>*/}
                    {/*{this.renderCircles()}*/}
                    {/*</View>*/}
                </ScrollView>
            </View>)
        }else{
            productView=(<ActivityIndicator color="#0000ff" style={{marginTop:50}} />)
        }
        return(
            <View>{productView}</View>

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
    container:{
        flexDirection:'column'
    },
    imageStyle:{
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