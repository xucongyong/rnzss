import React from "react";
import {Button, Image, ScrollView, Text, View} from "react-native";
import { Result } from '@ant-design/react-native';

class ResultViewScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<ScrollView style={{ backgroundColor: '#F5F5F9', flex: 1 }}>
            <Text style={{ margin: 10, color: '#999' }}></Text>
            <Result imgUrl={{
                uri: 'https://zos.alipayobjects.com/rmsportal/GcBguhrOdlYvGfnsXgrE.png',
            }} title="完成" message="完成"/>
            <Button
                title="返回首页"
                onPress={() => this.props.navigation.navigate('index')}
            />
        </ScrollView>);
}}

module.exports = ResultViewScreen;
