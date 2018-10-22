import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
//var JsonData = require('text2.json');
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var boxWidth = ScreenWidth/3;
var productDetail = [];
class BagView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: 0
        };
    }
    DefaultProps(){
        return {
            productDetail: [{"img" : "xx1.jpg","title" : "xx1"},{"img" : "xx2.jpg", "title" : "xx2"}]
        }
    }
    //渲染图
    renderChilds(){
        var productDetailNum = 0
        return productDetail.map((x)=>{
            productDetailNum +=1
            return <Image key={productDetailNum} source={{x}} style={{width:100, height:100}} />;
        })
    }
    // //渲染圆
    // renderCircles = () =>{
    //     return productDetail.map((x)=>{
    //         var style = {};
    //     var productDetailNum = 0
    //         if (i === this.state.currentPage){
    //             style = {color: 'orange'};
    //         }
    //         return <Text key={productDetailNum} style={[styles.circleStyle.style]}>&bull;</Text>
    //     })}

    //滚动回调
    handleScroll = (e) => {
        var x = e.nativeEvent.contentOffset.x;
        var currentPage = Math.foor(e.nativeEvent.contentOffset.x / ScreenWidth);
        this.setState({currentPage: currentPage});
        console.log('creentPage:'+creentPage);
    }

    //定时器
    startTimer = () => {
        this.timer = setInterval(() => {
            //计算出滚动的页面索引，改变state
            var currentPage = ++ this.state.currentPage == productDetail.length ? 0 : this.state.currentPage;
            this.setState({currentPage: currentPage});
            //计算滚动的距离
            var offsetX = currentPage * ScreenWidth;
            this.refs.scrollView.scrollTo({x: offsetX, y:0, animated: true})
            console.log(currentPage);
        }, 3000)
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
        return  <View style={styles.container}>
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
                //<View style={styles.circleWrapperStyle}>
                //{this.renderCircles()}
                // </View>
                </ScrollView>
        </View>;
        }

//定时器
componentDidMount = () =>{
        this.startTimer();}
//取消定时器
componentWillUnmount = ()=>{
        clearInterval(this.timer);}
}

var styles = StyleSheet.create({
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
                })

module.exports = BagView;