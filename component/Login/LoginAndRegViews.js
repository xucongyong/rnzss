import React from 'react';

import { createStackNavigator } from 'react-navigation';

var LoginScreen = require('./Login')
var RegScreen = require('./Reg')

const LoginScreenNav =  createStackNavigator(
    {
        Login: {screen: LoginScreen},
        Reg: {screen: RegScreen}
    },
)


module.exports = LoginScreenNav;
