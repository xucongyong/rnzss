import React from "react";
import {StyleSheet,Dimensions,Text, View, ScrollView, Button,Image} from "react-native";

const window = Dimensions.get('window');
const imageWidth = (window.width/3)+30;
const imageHeight = window.width/3;

var CommonCell = require('./CommonCell');

class Hometitle extends React.Component{
    render(){
        return(
            <View style={styles.HeaderTitle}>
                <Text style={{color:'white',fontSize:17}}>
                    产品详情</Text>

            </View>
        )}}

class ProductScreen extends React.Component{

    static navigationOptions =({
        headerTitle: <Hometitle/>, //<TextInput></TextInput>,
        headerLeft:  <Button
            title="Back"
            onPress={() => this.props.navigation.goBack()}/>,
        headerRight: <Button
            title="Back"
            onPress={() => this.props.navigation.goBack()}/>,
        headerTransparent:true})
    render(){
        return(
            <View>
                <ScrollView style={styles.container}>
                    <View style={styles.child}>
                    <Image
                        source={{uri: 'https://mcdn.pinduoduo.com/assets/img/mpdd_brand_sale.jpg'}}
                            />
                </View>
                    <View style={styles.child}>
                    <Image
                    source={{uri: 'https://mcdn.pinduoduo.com/assets/img/mpdd_sale.png'}}
                        />
                        </View>
                    <View style={styles.child}>
                    <Image
                    source={{uri: 'https://mcdn.pinduoduo.com/assets/img/mpdd_you.png'}}
                        />
                        </View>
                </ScrollView>
                <ScrollView>
                    <View>
                        <CommonCell
                            title={'余额提现'}
                        />
                        <CommonCell
                            title={'手机号'}
                        />
                        <CommonCell
                            title={'身份验证'}
                        />
                        <Button
                            title="登陆"
                            onPress={() => this.props.navigation.navigate('Details')}
                        />
                        <Button
                            title="注册"
                            onPress={() => this.props.navigation.navigate('Reg')}
                        />
                        <Button
                            title="登陆"
                            onPress={() => this.props.navigation.navigate('Login')}
                        />
                        <Button
                            title="订单"
                            onPress={() => this.props.navigation.navigate('订单')}
                        />
                        <Button
                            title="ModalScreen"
                            onPress={() => this.props.navigation.navigate('MyModal')}/>
                        <Button
                            title="X1x"
                            onPress={() => this.props.navigation.navigate('X1x')}/>
                    </View>

                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({

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
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    image:{
        width: imageWidth,
        height: imageHeight
    },
    child:{
        width: window.width/2,
        alignItems: 'center',
        height: imageHeight+5,
        marginTop: 10,
    },
});

module.exports = ProductScreen;