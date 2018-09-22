import React, { Component } from 'react'
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default class App extends Component {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <ActivityIndicator size="small" color="#00ff00" />
                <ActivityIndicator size="large" color="#0000ff" />
                <ActivityIndicator size="small" color="#00ff00" />
            </View>
        )
    }
}

// import {AsyncStorage} from 'react-native';
//
// export default class DataGet{
//     fetchRepository(url){
//         return new Promise((resolve,reject)=>{
//             this.fetchLoaclRepository(url)
//                 .then(result=>{resolve(result);})
//                 .catch(e=> {resolve(e)});
//         }
//     }
// }
//
// fetchLocalRepository(url){
//     return new Promise((resolve, reject) =>{
//         AsyncStorage.getItem(url,(error,result)=>{
//             if(!error){
//                 try{
//                     resolve(JSON.parse(result));
//                 }catch (e){
//                     reject(e);
//                 }
//             }else {
//                 reject(error);
//             }
//         })
//     }





const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

AppRegistry.registerComponent('App', () => App)
