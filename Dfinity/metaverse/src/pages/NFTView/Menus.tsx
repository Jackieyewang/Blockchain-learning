import { BugOutlined, CloudOutlined, DesktopOutlined, TagsOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Component } from 'react';

import { COLLECTION_TYPE, STORAGE_TYPE } from '../../utils/constants';
import EventBus from '../../utils/EventBus';
import storage from '../../utils/storage';

const { SubMenu } = Menu;

interface MenusState {
  menus: any[];
}

interface MenusProps {
  getBookmarks: Function;
}

export default class Menus extends Component<MenusProps, MenusState> {
  constructor(props: MenusProps) {
    super(props);

    const DEFAULT_COLLECTIONS_MENUS: string[] = [];

    const storedCollectionsNames = storage.getItem(STORAGE_TYPE.STORED_COLLECTIONS_NAMES) || [];

    this.state = {
      menus: [
        {
          title: 'Collections',
          icon: <TagsOutlined />,
          children: [...DEFAULT_COLLECTIONS_MENUS, ...storedCollectionsNames],
        },
      ],
    };

    EventBus.on('SET_COLLECTIONS_MENUS', (res) => {
      this.setState({
        menus: [
          {
            title: 'Collections',
            icon: <TagsOutlined />,
            children: [...DEFAULT_COLLECTIONS_MENUS, ...res],
          },
        ],
      });
    });
  }

  onSelect = (val: any) => {
    this.props.getBookmarks(val.key);
  };

  render() {
    const { menus } = this.state;
    const defaultSelectedKeys = COLLECTION_TYPE.AllBookmarks;

    return (
      <Menu
        expandIcon={() => ''}
        theme="dark"
        defaultSelectedKeys={[defaultSelectedKeys]}
        forceSubMenuRender
        mode="inline"
        openKeys={['Collections']}
        onSelect={this.onSelect}
        style={{ fontSize: '12px' }}
      >
        <Menu.Item key={COLLECTION_TYPE.AllBookmarks} icon={<CloudOutlined />}>
          {COLLECTION_TYPE.AllBookmarks}
        </Menu.Item>
        <Menu.Item key={COLLECTION_TYPE.Trash} icon={<DesktopOutlined />}>
          {COLLECTION_TYPE.Trash}
        </Menu.Item>
        <Menu.Item key={COLLECTION_TYPE.Unsorted} icon={<BugOutlined />}>
          {COLLECTION_TYPE.Unsorted}
        </Menu.Item>
        {menus.map((menu) => (
          <SubMenu key={menu.title} title={menu.title} icon={menu.icon}>
            {menu.children.map((item: string) => (
              <Menu.Item key={item}>{item}</Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    );
  }
}
