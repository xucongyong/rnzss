import React from 'react';
import {TabBarBottom, TabNavigator} from 'react-navigation';
import {
    Text,
    ScrollView,
    ListView,
    StyleSheet,
    RefreshControl,
    View,
    ActivityIndicator,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dimensions from 'Dimensions';

var doubanComponent = require('./doubanComponent');


const {width, height} = Dimensions.get('window');

const dataUrl = 'https://api.douban.com/v2/movie/top250?count=350';

class MyComponent extends React.Component {
    static navigationOptions = ({

        mode: 'modal',
        headerMode: 'none',

    })
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged : (row1, row2) =>  row1 !== row2});
        this.state = {
            dataSource : ds,
            isLoading:false,
            refreshing:false,
            isMoreloading:true
        }
    }

    componentDidMount(){
        // 菊花加载
        this.setState({
            isLoading:true,
        })

        this.fetchData();
    }


    fetchData(refresh){

        if(refresh){
            this.setState({
                refreshing:true
            });
        }

        fetch(dataUrl)
            .then((response) => response.json())
            .then((data) => {
                let dataList = data.subjects;
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(dataList),
                    isLoading:false,
                    refreshing:false
                })

            })
            .catch((err) => {
                console.log(err)
            })
            .done()
    }

    _renderRow(data){
        return (
            <View style={styles.cellBoxStyle}>
                <Image source={{uri:data.images.large}} style={{width:70,height:70}} />
                <View>
                    <Text style={styles.cellTxt}>{data.title}</Text>
                    <Text style={styles.cellTxt}>{data.genres}</Text>
                </View>

            </View>
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
                <View style={{marginVertical: 10}}>
                    <ActivityIndicator color="red"/>
                </View>
            )
        }else{
            return(
                <View style={{marginVertical: 10,justifyContent:'center',alignItems:'center'}}>
                    <Text>没有更多了。</Text>
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
                <ActivityIndicator
                    size="large"
                    color='red'
                    style={{marginTop:50}}
                />
            )
        }else{
            viewList = (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => this._renderRow(data)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.reloadNewData.bind(this)}
                            colors={['red','orange']}
                        />}
                    renderFooter={()=>this.renderFooter()}
                    onEndReached={ ()=>this._toEnd() }
                />
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
        fontSize:16,
        color:'red'
    }
})


const TopTabNav = TabNavigator(
    {
        全部: { screen: MyComponent },
        红包: { screen: MyComponent },
        报名: { screen: MyComponent },
        返现: { screen: MyComponent },
        有礼: { screen: MyComponent }
    },

    {
        navigationOptions: ({ navigation }) => ({
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: '#DC3C78',
            inactiveTintColor: 'gray',
            showIcon: 'false',
            showLabel: 'false',
            tabStyle: {
                width: 40,
            },
            labelStyle: {
                fontSize: 15,
            },
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);




module.exports= TopTabNav;