import React from "react";
import {StyleSheet,Text, View, ScrollView, Button,Image} from "react-native";
import {StackNavigation} from 'react-navigation';


var CommonCell = require('./CommonCell');
var ProductDetails = require('./Product');

const productScreen = StackNavigation({
    Home: {
        screen: ProductDetails}
})


module.exports = ProductScreen;