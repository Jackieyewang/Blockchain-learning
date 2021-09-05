import React, { Component } from 'react';
import { isLogin } from '../apis/ceramic';

interface AuthProps {
  history: any;
}

export default function (ComposedComponent: any) {
  class Auth extends React.Component<AuthProps> {
    componentDidMount() {
      if (!isLogin()) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Auth;
}
