
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import createReactClass from 'create-react-class';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

var CommonCell = createReactClass({

    getDefaultProps(){
      return{
          title: '',
      }
    },
    render(){
        return(
            <View style={styles.container}>
                <Text onPress={()=>{this.props.navigator.navigate('Login')}} >{this.props.title}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
            </View>
    )
    }
});


const styles = StyleSheet.create({
    container:{
        height:44,
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0.5,
        justifyContent:'center',

    }

});

// 输出组件类
module.exports = CommonCell;
