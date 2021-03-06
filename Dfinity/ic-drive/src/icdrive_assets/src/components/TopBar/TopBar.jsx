import React from 'react';
import styled from 'styled-components';

// custom imports

// 3rd party imports
import {Input} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const TopBar = () =>{

  return(
    <Style>
      <div className="container">
        <div className="left-section">
          <span>IC Drive</span>
        </div>
        <div className="right-section">
          <span><Input placeholder="Search Files" /></span>
          <span><QuestionCircleOutlined style={{ fontSize: '25px' }} /></span>
          <span className="dot"></span>
        </div>
      </div>
    </Style>
  )
}

export default TopBar;

const Style = styled.div`

  .container {
    height: 50px;
    width: 100vw;
    background: #2A3132;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left-section {
    font-size: 22.5px;
    font-weight: 700;
    padding-left: 22px;
  }
  .right-section{
    width: 420px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .ant-input {
    height: 25px;
    width: 250px;
  }
  .dot {
    height: 25px;
    width: 25px;
    background-color: #e5e5e5;
    border-radius: 50%;
    display: inline-block;
  }
`