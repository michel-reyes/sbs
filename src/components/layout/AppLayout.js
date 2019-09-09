import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import RenderForm from '../forms/DynamicForm';

const AppLayout = () => {
  const [collapsed, setCollaped] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;

  const toggle = () => {
    setCollaped(!collapsed);
  }

  const business = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="#fff" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" /></svg>
  }

  return (
    <Layout>

      {/* Sidebar */}
      <Sider id="app__sidebar" collapsed={collapsed} width="244">

        {/* Header */}
        <Header
          className="px-0 d-flex flex-row justify-content-between align-items-center">
          <a className="app__logo" style={{paddingLeft: 24}} href="/#">
            <Icon style={{ fontSize: '32px', color: '#fff' }} component={business} />
          </a>
          <Icon
            style={{color: '#fff', paddingRight: 24, fontSize: 18}}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </Header>

        {/* Menu */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="project" />
            <span className="nav-text">Products</span>
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
        </Menu>
      </Sider>

      {/* Main */}
      <Layout id="app__main">

        {/* Header */}
        <Header id="app__header"></Header>

        {/* Content */}
        <Content id="app__main__content" style={{minHeight: '100vh', paddingBottom: 24}}>
          <RenderForm />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;