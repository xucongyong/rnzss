import React from 'react';
let me = require('./Me');
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
function App() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="me" component={me}/>
        </Tab.Navigator>
    );
}
module.exports= me;
