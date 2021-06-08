import React, { Component } from 'react'
import './Login.less'
import img from './images/login-bg.jpg'
// import LoginMenu from './LoginMenu'
import { Row, Col, Tabs } from 'antd'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import LoginForm from './LoginForm'
import SignUp from './SignUp'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const { TabPane } = Tabs;
class Login extends Component {

    render() {
        //the user has logged in
        if (this.props.user) return <Redirect to='/' />

        return (
            <div className="login-container">
                <div className="img-box">
                    <img src={img} alt='login-background' />
                </div>
                <div className="login-form">
                    <Row align="middle" style={{ height: '100%' }}>
                        <Col span='12' style={{ marginLeft: '30px' }}>
                            <Tabs defaultActiveKey="1">
                                <TabPane
                                    tab={<span><UserOutlined /> Login</span>}
                                    key="1"
                                >
                                    {/* ------------------Login form --------------------- */}
                                    <LoginForm />
                                </TabPane>
                                <TabPane
                                    tab={<span><UserAddOutlined />Sign up </span>}
                                    key="2"
                                >
                                    {/* ------------------Sign up form --------------------- */}
                                    <SignUp />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({ user: state.user }),
    {}
)(Login);