// !: this less file must be imported first
import './assets/styles/index.less';

import ReactDOM from 'react-dom';
import { HashRouter, Switch } from 'react-router-dom';

import BasicLayout from './layouts/BasicLayout';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <HashRouter>
    <BasicLayout />
  </HashRouter>,
  document.querySelector('#root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
