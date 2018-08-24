
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
                <View style={styles.text}>
                <Text>{this.props.title}</Text></View>
                <View style={styles.icon}>
                <MaterialIcons name="keyboard-arrow-right" size={23} color="#4F8EF7"/>
                </View>
            </View>
    )
    }
});


const styles = StyleSheet.create({
    container:{
        height:55,
        flexDirection:'row',//column
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0.5,
        justifyContent: 'space-between',//flex-end
        alignItems: 'center',//flex-start
    },
    text:{
        padding: 10,
        alignItems:'center',
        fontSize: 15,
    },
    icon:{
        //padding:-100,
        alignItems: 'flex-end',
    }

});

// 输出组件类
module.exports = CommonCell;
