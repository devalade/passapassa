import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Table, Tag, Space } from 'antd';

import { api } from '@/utils/api';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { data } = api.users.getAll.useQuery();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log(data)

  const dataSource = data?.map((user) => ({
    key: user.id.toString(),
    name: user.name,
    email: user.email,

  }));


  console.log(dataSource)

  const columns = [

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      dataIndex: 'email',
      key: 'address'
    }
  ];


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout ">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>

          <div className='bg-gray-800 text-2xl font-semibold text-black '>
            {data?.length === 0 ? <div className='text-red-600'>
              No user
            </div> :
              <div>
                <Table dataSource={dataSource} columns={columns}></Table>
              </div>}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>TECHIMA ©2023 Created by AWESOME PEOPLE</Footer>
      </Layout>
    </Layout>
  );
};

export default App;