import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const Sidebar = () => {
  const { Header, Sider } = Layout;
  return (
    <Sider id="app__sidebar" collapsed={collapsed} width="244" >

      < Header
        className="px-0 d-flex flex-row justify-content-between align-items-center" >
        <Icon className="app__logo" style={{ paddingLeft: 24 }} type="build" theme="twoTone" />

        <Icon
          style={{ color: '#fff', paddingRight: 24, fontSize: 18 }}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
      </Header >

      < Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} >
        <Menu.Item key="1">
          <Icon type="user" />
          <span className="nav-text">Option 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span className="nav-text">Option 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span className="nav-text">Option 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="user" />
          <span className="nav-text">Option 4</span>
        </Menu.Item>
      </Menu >

    </Sider >
  );
}

export default Sidebar;