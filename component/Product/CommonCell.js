
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,

} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class CommonCell extends React.Component {
    DefaultProps(){
        return{
            title: '',
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.title}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
            </View>

            // <Image source={{url: <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/> }} style={{width:8, height:13}} />

        )
    }
}


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
