import { Layout } from 'antd';
import { Route } from 'react-router-dom';

import NFTView from '../pages/NFTView/NFTView';
import Login from '../pages/Login/Login';
import './BasicLayout.less';
import Auth from '../components/Auth';

export default function BasicLayout() {
  return (
    <div className="root-wrapper">
      <Layout className="basic-layout">
        <Route component={Auth(NFTView)} path="/" exact />
        <Route component={Login} path="/login" exact />
      </Layout>
    </div>
  );
}
