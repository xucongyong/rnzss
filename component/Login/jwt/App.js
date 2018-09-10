import React, { Component } from 'react';
import { Loading } from './components/common/';
import Auth from './screens/Auth';
import LoggedIn from './screens/LoggedIn';
import deviceStorage from './services/deviceStorage.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true,
    }

    this.newJWT = this.newJWT.bind(this); //set new jwt of static
    this.deleteJWT = deviceStorage.deleteJWT.bind(this); //删除JWT
    this.loadJWT = deviceStorage.loadJWT.bind(this); //加载jwt
    this.loadJWT();//启动时，会先加载jwt
  }

  newJWT(jwt){
    this.setState({
      jwt: jwt
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <Loading size={'large'} />
       );
    }
      else if (!this.state.jwt) {
      return (
          <Auth newJWT={this.newJWT} />
      );
    } else if (this.state.jwt) {
        return (
        <LoggedIn jwt={this.state.jwt} deleteJWT={this.deleteJWT} />
      );
    }
  }
}
