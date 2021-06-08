import React, { Component } from 'react'
import { Button, Form, Input, Row, Col, Checkbox, Result, Modal, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqAddUser } from '../../api'
import { connect } from 'react-redux'
import { saveUser } from '../../redux/actions'
import { withRouter } from 'react-router-dom'

const { Item } = Form;



class SignUp extends Component {

    state = {
        user: {},
        isModalVisible: false,
    }

    /*
        1.insert to db
        2.if success : 
            -show msg , save to redux
          else 
            -show msg
    */
    onFinish = async (values) => {
        const rs = await reqAddUser(values);
        if (rs.status === 0) {
            this.setState({
                user: rs.data,
                isModalVisible: true
            });
        } else {
            message.error(rs.msg);
        }
    }

    onGoHomePage = () => {
        this.props.saveUser(this.state.user); //save to redux , auto redirect to homepage
    }

    render() {

        const { isModalVisible } = this.state;

        return (
            <Form
                onFinish={this.onFinish}
            >
                <Item
                    name="username"
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please input your Username!', },
                        { min: 5, message: 'Username cannot be less than 5 digits!' },
                        { max: 25, message: 'Username cannot be less than 25 digits!' },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Item>

                <Item
                    name="password"
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please input your Password!', },
                        { min: 5, message: 'Password cannot be less than 5 digits!' },
                        { max: 25, message: 'Password cannot be less than 25 digits!' },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                </Item>

                <Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your password !', },
                        { min: 5, message: 'Password cannot be less than 5 digits!' },
                        { max: 25, message: 'Password cannot be less than 25 digits!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || value.length < 5 || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            }
                        })
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
                </Item>


                {/* here we have 2 item below  */}
                <Item style={{ marginBottom: '0' }}>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                            >
                                <Input placeholder="First Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                            >
                                <Input placeholder="Last Name" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Item>

                <Item
                    name="email"
                    hasFeedback
                    rules={[
                        { type: 'email', message: 'Please input a valid email! !', },
                    ]}
                >
                    <Input placeholder="Email" />
                </Item>

                <Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                >
                    <Checkbox>
                        I have read the <a href="/#">agreement</a>
                    </Checkbox>
                </Item>

                <Item>
                    <Button type="primary" htmlType="submit" className="signup-form-button">
                        Sign up
                    </Button>
                </Item>


                <Modal
                    closable={false}//是否显示右上角的关闭按钮
                    //mask={false} //是否显示遮盖
                    //maskClosable={true} //	点击蒙层是否允许关闭
                    visible={isModalVisible}
                    footer={null} //不要底部按钮

                >
                    <Result
                        status="success"
                        title="You have signed up successfully !"
                        subTitle="Thankyou for choosing QLearn, please check your email for activation"
                        extra={[
                            <Button type="primary" key="console" onClick={this.onGoHomePage}>
                                Go to home page
                            </Button>,
                        ]}
                    />
                </Modal>
            </Form >


        )
    }
}


export default connect(
    state => ({}),
    {
        saveUser
    }
)(withRouter(SignUp));