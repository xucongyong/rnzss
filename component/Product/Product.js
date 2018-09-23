import React from "react";
import {StyleSheet,Dimensions,Text, View, ScrollView, Button,Image} from "react-native";
const ProductScrollView = require('./ProductScrollView')
const window = Dimensions.get('window');
const imageWidth = (window.width/3)+30;
const imageHeight = window.height;

var CommonCell = require('./CommonCell');



class ProductScreen extends React.Component{
    // static navigationOptions =({
    //     headerTransparent:true
    // })
    render(){
        const productID = this.props.navigation.getParam('productID','NO-ID')
        const imageUrl = this.props.navigation.getParam('imageUrl','NO-ImageUrl')
        //const imageUrl = JSON.stringify(this.props.navigation.getParam('imageUrl','NO-ImageUrl'))
        console.log(imageUrl)
        return(
            <View>

                <ProductScrollView />
                <View style={styles.comments}><Image source={imageUrl}/></View>

                <View style={styles.comments}>
                <View><Text>{productID}</Text></View>
                    <View><Text>活动类型：</Text></View>
                <View><Text>剩余活动：</Text></View>
                </View>

                <ScrollView>
                    <View>
                        <Text>PPRODUCTDETAILS</Text>
                        <CommonCell
                            title={'余额提现'}
                        />

                    </View>
                <View style={styles.shopcart}>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={styles.bottomItem}>
                            <Text>客服</Text>
                        </View>
                        <View style={styles.bottomItem}>
                            <Text>后仓</Text>
                        </View>

                        <View style={styles.bottomItem}>

                            <Text>购物车</Text>

                        </View>

                    </View>

                    <View style={[styles.bottomItem, {backgroundColor: 'red'}]}>

                        <Text>加入购物车</Text>
                    </View>
                    <View style={[styles.bottomItem, {backgroundColor: 'green'}]}>
                        <Text>看左面{'\n'}加入{'\n'}购物车</Text>
                    </View>

                </View>
                </ScrollView>

            </View>

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
});

module.exports = ProductScreen;