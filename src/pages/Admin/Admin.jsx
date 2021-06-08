import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { removeUser } from '../../redux/actions';

import { Layout } from 'antd';

import './Admin.less';

import NavLeft from '../../components/Admin/NavLeft';
import NavRight from '../../components/Admin/NavRight';
import Home from '../Home/Home';
import Folder from '../Folder';
import StudySets from '../StudySets';
import Test from '../Test';

const { Header, Content } = Layout;




class Admin extends Component {

    logout = () => {
        this.props.removeUser();
    }

    render() {
        //the user is still not logged in
        if (!this.props.user) return <Redirect to='/login' />
        return (
            <Layout className='container-layout'>
                <Header className="header" style={{ padding: '0', display: 'flex', position: 'fixed', zIndex: 100, width: '100%' }}>
                    <div className="logo" style={{ padding: '0 50px', color: 'white', fontSize: '20px', fontFamily: 'cursive', cursor: 'pointer' }}>
                        QLearn.com
                    </div>

                    <div className="navbar-left">
                        <NavLeft />
                    </div>

                    <div className="navbar-right">
                        <NavRight user={this.props.user} logout={this.logout} />
                    </div>

                </Header>
                <Layout style={{ marginTop: 64 }}>
                    {/* <Sider width={200} style={{ position: 'fixed', zIndex: 100, height: '100%' }} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Game">
                                <Menu.Item key="1">ten game</Menu.Item>
                                <Menu.Item key="2">asd</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Tat ca cac tu vung">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider> */}
                    <Layout>
                        <Content
                            style={{
                                // padding: '0 0  0 210px',
                            }}
                        >
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/folders" component={Folder} />
                                <Route path="/study-sets" component={StudySets} />
                                <Route path="/test" component={Test} />
                                <Redirect from='/' to='/home' />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout >
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {
        removeUser,
    }
)(Admin);