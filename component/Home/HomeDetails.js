import React from 'react';
import createReactClass from 'create-react-class';
import { Text,Button } from 'react-native';

class Home extends React.Component{
    render(){
        return(
            <Text>HomeDetails</Text>
        )
    }
}


var HomeDetails = createReactClass({
    render() {
        return (
            <Home />
        );
    }
})

module.exports = HomeDetails;