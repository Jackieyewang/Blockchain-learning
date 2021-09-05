import { NFTE } from '@nfte/react';
import { Descriptions, Modal, Spin, Tag, Layout, Button, Dropdown, Menu } from 'antd';
import type { Bookmark } from 'idx-common';
import { Component } from 'react';
import Masonry from 'react-masonry-component';

// import { ethers } from 'ethers';
// import { FetchWrapper } from 'nft-capture';

import {
  DownOutlined,
  UserOutlined,
  ContainerOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  WalletOutlined,
  TeamOutlined,
  RobotOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { COLLECTION_TYPE, STORAGE_TYPE } from '../../utils/constants';
import { getCustomBookmarks } from './utils';
import storage from '../../utils/storage';
import Menus from './Menus';
import './NFTView.less';
import logo from '../../assets/images/logo.png';
import metamaskLogo from '../../assets/images/metamask-fox.svg';

const { Content, Sider, Header } = Layout;
interface NFTViewState {
  visible: boolean;
  current: Bookmark;
  modalLoading: boolean;
  list: Bookmark[];
  loading: boolean;
  did: string;
}

interface NFTViewProps {
  history: any;
}

function limitWords(txt: any) {
  let str = txt;
  str = `${str.slice(0, 12)}...`;
  return str;
}

export default class NFTView extends Component<NFTViewProps, NFTViewState> {
  constructor(props: NFTViewProps) {
    super(props);

    this.state = {
      list: storage.getItem(STORAGE_TYPE.STORED_COLLECTIONS) || [],
      visible: false,
      modalLoading: false,
      current: { image: '' } as Bookmark,
      loading: false,
      did: '',
    };
  }

  async componentDidMount() {
    this.getBookmarks();
  }

  getBookmarks = async (collection: string = COLLECTION_TYPE.AllBookmarks) => {
    try {
      if (this.state.loading) {
        return;
      }

      if (collection === COLLECTION_TYPE.Unsorted) {
        collection = '';
      }

      this.setState({ loading: true });
      const { list, did } = await getCustomBookmarks(collection);

      // const fetcher = ["ethers", { ethers, provider: ethers.getDefaultProvider() }]
      // const fetchWrapper = new FetchWrapper(fetcher)

      // const nft = await fetchWrapper.fetchNft(
      //   "0xd07dc4262bcdbf85190c01c996b4c06a461d2430",
      //   "90473"
      // )

      // console.log(nft)

      this.setState({ list, did });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  };

  open = (item: Bookmark) => {
    this.setState({
      current: item,
      visible: true,
      modalLoading: true,
    });

    setTimeout(() => {
      this.setState({ modalLoading: false });
    }, 1000);
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  renderModal = () => {
    const { current, visible, modalLoading } = this.state;

    return (
      <Modal title="" visible={visible} onCancel={this.onClose} footer={null} width="1020px">
        <Spin spinning={modalLoading}>
          <div className="modal-wrapper">
            <div className="modal-left">
              {current.image?.includes('.mp4') ? (
                <video autoPlay src={current.image} className="pic" />
              ) : (
                <img src={current.image} className="pic" />
              )}
            </div>

            <div className="modal-right">
              <div className="title">{current.title}</div>
              <NFTE contract={current.contract} tokenId={current.tokenId}>
                {({ data }) => (
                  <Descriptions title="" column={1}>
                    <Descriptions.Item label="tokenId">{current.tokenId}</Descriptions.Item>
                    <Descriptions.Item label="collections">
                      {current?.collections}
                    </Descriptions.Item>
                    <Descriptions.Item label="tags">
                      <Tag color="orange">{current?.tags}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="description">
                      <div className="desc">{data?.description}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="platform">OpenSea</Descriptions.Item>
                    <Descriptions.Item label="blockNumber">{data?.blockNumber}</Descriptions.Item>
                    <Descriptions.Item label="timestamp">{data?.timestamp}</Descriptions.Item>
                    <Descriptions.Item label="href">
                      <a target="_blank" href={current.url} rel="noreferrer">
                        {current.url}
                      </a>
                    </Descriptions.Item>
                  </Descriptions>
                )}
              </NFTE>
            </div>
          </div>
        </Spin>
      </Modal>
    );
  };

  renderNFTView = () => {
    const { list, loading } = this.state;

    return (
      <div className="nft-view">
        <Spin spinning={loading}>
          <div className="masonry-wrapper">
            <Masonry style={{ marginTop: '20px' }}>
              {list.map((item, index) => (
                <div className="nft-item" key={item.contract} onClick={() => this.open(item)}>
                  <div className="item-inner">
                    <div className="pic-wrapper">
                      {item.image?.includes('.mp4') ? (
                        <video autoPlay src={item.image} className="pic" />
                      ) : (
                        <img src={item.image} className="pic" />
                      )}
                    </div>
                    <div className="text-wrapper">
                      <div className="name">{item.title}</div>
                      <div className="description">{item.description}</div>

                      <div className="tag">OpenSea</div>
                    </div>
                  </div>
                </div>
              ))}
            </Masonry>
          </div>
        </Spin>
      </div>
    );
  };

  renderLoginButton = () => {
    const { SubMenu } = Menu;
    const { did } = this.state;

    const _menu = (
      <Menu className="Drop-menu" theme="dark">
        <SubMenu title="My Account" icon={<UserOutlined />}>
          <Menu.Item key="Profile" icon={<ContainerOutlined />}>
            My Profile
          </Menu.Item>
          <Menu.Item key="Setting" icon={<SettingOutlined />}>
            Setting
          </Menu.Item>
          <Menu.Item key="Help" icon={<QuestionCircleOutlined />}>
            Help
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Log Out
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="wallet" icon={<WalletOutlined />}>
          My Wallet
        </Menu.Item>
        <Menu.Item key="idea" icon={<RobotOutlined />}>
          My Collections
        </Menu.Item>
        <Menu.Item key="tribe" icon={<TeamOutlined />}>
          My Tribe
        </Menu.Item>
        <Menu.Item key="metaverse" icon={<CrownOutlined />}>
          Metaverse
        </Menu.Item>
      </Menu>
    );

    if (!did) {
      return (
        <Button className="login-wrapper" onClick={() => this.getBookmarks()}>
          Login with <img src={metamaskLogo} />
        </Button>
      );
    }

    return (
      <Dropdown overlay={_menu}>
        <Button className="login-wrapper">
          {limitWords(did)}
          <DownOutlined />
        </Button>
      </Dropdown>
    );
  };

  render() {
    return (
      <>
        <Header>
          <div className="logo-wrapper">
            <img src={logo} />
            <span>DataDiDi</span>
          </div>

          {this.renderLoginButton()}
        </Header>

        <Layout className="content-layout">
          <Sider className="menus" width="164px">
            <Menus getBookmarks={this.getBookmarks} />
          </Sider>

          <Content>{this.renderNFTView()}</Content>
        </Layout>

        {this.renderModal()}
      </>
    );
  }
}
