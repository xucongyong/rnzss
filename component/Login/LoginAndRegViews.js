import React from 'react';

import { StackNavigator } from 'react-navigation';

var LoginScreen = require('./Login')
var RegScreen = require('./Reg')

const LoginScreenNav =  StackNavigator(
    {
        Login: {screen: LoginScreen},
        Reg: {screen: RegScreen}
    },
     {
        //headerMode: 'none',
        //headerTransparent:true

}
)


module.exports = LoginScreenNav;
