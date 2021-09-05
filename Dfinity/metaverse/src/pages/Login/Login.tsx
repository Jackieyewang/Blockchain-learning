import React, { Component } from 'react';
import './Login.less';
import { Button } from 'antd';
import metamaskLogo from '../../assets/images/metamask-fox.svg';

import { authenticateWithEthereum, initCollections, getDID } from '../../apis/ceramic';
import { connectWithWeb3 } from '../../apis/web3';
import storage from '../../utils/storage';
import { STORAGE_TYPE } from '../../utils/constants';

interface LoginState {
  currentEmoji: string;
  loading: boolean;
}

interface LoginProps {
  history: any;
}

const EMOJIS = [
  '🌈',
  '🌼',
  '🌸',
  '🍔',
  '🍟',
  '🍕',
  '🌮',
  '🥞',
  '🥐',
  '🌭',
  '🍫',
  '🍩',
  '🍪',
  '🍿',
  '🍣',
  '🥪',
  '🍜',
  '🥟',
  '🍬',
  '🍮',
  '💛',
  '💖',
  '🥡',
  '💊',
  '🎁',
  '🎀',
];

let timer: number | undefined;

export default class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      currentEmoji: '',
      loading: false,
    };

    timer = window.setInterval(() => {
      this.setState({
        currentEmoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      });
    }, 800);
  }

  login = async () => {
    try {
      this.setState({ loading: true });
      const { provider, addresses } = await connectWithWeb3();
      await authenticateWithEthereum(provider, addresses[0]);
      await initCollections();
      storage.setItem(STORAGE_TYPE.STORED_DID, getDID());
      this.setState({ loading: false }, () => {
        this.props.history.replace('/');
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    const { currentEmoji, loading } = this.state;
    return (
      <div className="login">
        <div className="title">{currentEmoji} Enter An Incarnatin Radius</div>
        <div className="sub-title">3ID Metamask connect</div>

        <Button className="login-wrapper" onClick={() => this.login()} loading={loading}>
          Login with <img src={metamaskLogo} />
        </Button>
      </div>
    );
  }
}
