import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
var JsonData=require('./test2.json');
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var boxWidth = Dimensions.get('window').width / 3;

class BagView extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:0
        };
    }

    //渲染图片列表
    renderChilds = ()=> {
        return JsonData.data.map((item, i)=> {
            return <Image key={`item${i}`} source={{uri:item.img}} style={styles.imageStyle}></Image>;
        });
    }
    //渲染圆
    renderCircles = ()=>{
        return JsonData.data.map((item, i)=> {
            var style = {};
            //当前页面的的指示器，橘黄色
            if(i === this.state.currentPage){
                style = {color:'orange'};
            }
            return <Text key={`text${i}`} style={[styles.circleStyle,style]}>&bull;</Text>
        });
    }
    //滚动的回调
    handleScroll = (e)=>{
        var x = e.nativeEvent.contentOffset.x;
        var currentPage = Math.floor(e.nativeEvent.contentOffset.x / ScreenWidth);
        this.setState({currentPage:currentPage});
        console.log("currentPage:"+currentPage);
    }

    //定时器
    startTimer = ()=>{
        this.timer = setInterval(()=>{
            //计算出要滚动到的页面索引，改变state
            var currentPage = ++this.state.currentPage == JsonData.data.length ? 0 : this.state.currentPage;
            this.setState({currentPage:currentPage});
            //计算滚动的距离
            var offsetX = currentPage * ScreenWidth;
            this.refs.scrollView.scrollTo({x:offsetX,y:0,animated:true});
            console.log(currentPage);
        },4000);
    }
    //开始滑动
    handleScrollBegin = ()=>{
        console.log("handleScrollBegin");
        clearInterval(this.timer);
    }

    handleScrollEnd = ()=>{
        console.log("handleScrollEnd");
        this.startTimer();
    }

    render() {
        return <View style={styles.container}>
            {/*注释不能卸载<>括号里面，
             其他的事件：http://blog.csdn.net/liu__520/article/details/53676834
             ViewPager onPageScoll onPageSelected onScroll={this.handleScroll}*/}
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
            </ScrollView>
            <View style={styles.circleWrapperStyle}>
                {this.renderCircles()}
            </View>
        </View>;
    }

    //定时器
    componentDidMount = ()=>{
        this.startTimer();
    }
    //取消定时器
    componentWillUnmount =() => {
        clearInterval(this.timer);
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection:'column'
    },
    imageStyle: {
        width: ScreenWidth,
        height: 120
    },
    circleWrapperStyle:{
        flexDirection:'row',
        //absolute“绝对”定位，参照标准父容器
        //relative “相对”对位，相对于原来的位置
        position:'absolute',
        bottom:0,
        left:10
    },
    circleStyle:{
        fontSize:25,
        color:'#FFF'
    }
});

module.exports=BagView;