import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import { reqLogin } from '../../api';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { saveUser } from '../../redux/actions'

const Item = Form.Item;

class LoginForm extends Component {

    onFinish = async (values) => {
        //send request
        const { username, password } = values;
        const rs = await reqLogin(username, password);
        if (rs.status === 0) {
            let fullName = rs.data.username;
            if (rs.data.firstName && rs.data.lastName) {
                fullName = rs.data.lastName + ' ' + rs.data.firstName;
                rs.data.fullName = fullName;
            }
            message.success('Login success ! Welcome to QLearn, ' + fullName);
            //save user to redux , avoid login again
            this.props.saveUser(rs.data);
            //redirect to admin page
            this.props.history.replace('/admin');
        } else {
            message.error(rs.msg);
        }
    }


    render() {
        return (
            <div>
                <Form
                    name="normal_login"
                    onFinish={this.onFinish}
                >
                    <Item
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your Username!', },
                            { min: 5, message: 'Password cannot be less than 5 digits!' },
                            { max: 25, message: 'Password cannot be less than 25 digits!' },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Item>
                    <Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your Password!' },
                            { min: 5, message: 'Password cannot be less than 5 digits!' },
                            { max: 25, message: 'Password cannot be less than 25 digits!' },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Item>
                    <Item>
                        <Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Item>
                    </Item>

                    <Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>

                        <a className="login-form-forgot" href="/forgetPassword" style={{ float: 'right' }}>
                            Forgot password
                        </a>
                    </Item>
                </Form>
            </div>
        )
    }
}


export default connect(
    state => ({}),
    {
        saveUser
    }
)(withRouter(LoginForm));