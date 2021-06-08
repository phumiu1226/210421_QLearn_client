import React from 'react'
import PropTypes from 'prop-types'
import { Input, Tooltip, Button, Dropdown, Menu, Modal } from 'antd';
import { BellOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'

const { Search } = Input;
const { confirm } = Modal;

function NavRight({ user, logout }) {

    //----- search-------------
    const onSearch = () => {
        console.log('asd');
    }

    //----- user settings ------



    function handleMenuClick(e) {
        // console.log('click', e.key === "1");
        if (e.key === 'logout') {
            confirm({
                title: 'Do you want to logout?',
                icon: <ExclamationCircleOutlined />,
                onOk() {
                    logout();
                },
                onCancel() {

                },
            });
        }

    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                Logout
          </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Search placeholder="input search text" onSearch={onSearch} className='search-input' />

            <Tooltip title="Notification">
                <Button shape="circle" icon={<BellOutlined />} />
            </Tooltip> &nbsp;&nbsp;


            <Dropdown overlay={menu} trigger={['click']}>
                <div className='img-box'>
                    <img src={user.avatar} alt='avatar' />
                </div>
            </Dropdown>

        </>
    )
}

NavRight.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

export default React.memo(NavRight);
