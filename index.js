/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
//import App from './TestApp/App';
//import App from './TestApp/AsyncStorage';
//import App from './TestApp/ActivityIndicator';
//import App from './component/Login/jwt/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent('RootStack', () => RootStack);
AppRegistry.registerComponent('TabView', () => TabView);
AppRegistry.registerComponent(appName, () => App);
