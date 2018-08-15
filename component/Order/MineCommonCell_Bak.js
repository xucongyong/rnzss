import React from 'react';
import createReactClass from 'create-react-class';
import { Text,Button } from 'react-native';

class Mine extends React.Component{
    render(){
        return(
            <Text>MineDetails</Text>
        )
    }
}


var MineCommonCell = createReactClass({
    render() {
        return (
            <Mine />
        );
    }
})

module.exports = MineCommonCell;