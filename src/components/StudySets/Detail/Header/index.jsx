import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider, Dropdown, Menu, Tooltip } from 'antd';
import { PlusCircleOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined, SortAscendingOutlined } from '@ant-design/icons';
import './index.less'

const { Title } = Typography;

function StudySetHeader(props) {

    const { title, total } = props;


    function handleMenuClick(e) {
        // console.log('click', e.key === "1");
        if (e.key === 'addToFolder') {
            console.log('addToFolder');
        }

    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="addToFolder" icon={<PlusCircleOutlined />}>
                Add to folder
          </Menu.Item>
            <Menu.Item key="deleteStudySet" icon={<DeleteOutlined />}>
                Delete
          </Menu.Item>
        </Menu>
    );


    const onAddWord = () => {
        props.onAddWord();
    }

    return (
        <div className='study-set-header'>
            <div className='title'>
                <Title level={2}>{title}</Title>
                <p>{total} words</p>
            </div>
            <div className='tool'>
                <div className='left'>
                    <Button type="primary" onClick={onAddWord} icon={<PlusCircleOutlined />}>
                        Add word
                    </Button>
                    &nbsp;
                    <Button type="primary" icon={<EditOutlined />}>
                        Edit
                    </Button>

                </div>
                <div className='right'>
                    <Tooltip title="Flashcards">
                        <Button type="text" icon={<svg className='svg-icon' id="Capa_1" enableBackground="new 0 0 512 512" height="18px" viewBox="0 0 512 512" width="18px" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m223.545 231.428c.879 0 1.774-.156 2.646-.485 3.875-1.462 5.832-5.789 4.37-9.665l-51.788-137.254c-.027-.072-.056-.145-.085-.216-1.654-4.005-5.521-6.593-9.852-6.593-4.33 0-8.197 2.588-9.852 6.593-.026.064-.052.129-.077.194l-52.27 137.254c-1.474 3.871.469 8.204 4.34 9.678s8.204-.469 9.678-4.339l11.179-29.355h73.623l11.068 29.333c1.135 3.004 3.989 4.855 7.02 4.855zm-85.997-49.188 31.27-82.111 30.981 82.111z" /><path d="m278.421 226.21c13.147 0 25.09-5.227 33.885-13.7v11.699c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-93.799c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v11.707c-8.795-8.478-20.737-13.708-33.885-13.708-26.955 0-48.885 21.943-48.885 48.915.001 26.956 21.93 48.886 48.885 48.886zm0-82.8c18.684 0 33.885 15.214 33.885 33.915 0 18.685-15.201 33.886-33.885 33.886s-33.885-15.201-33.885-33.886c.001-18.701 15.201-33.915 33.885-33.915z" /><path d="m126.035 353.458h75.598c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-75.598c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5z" /><path d="m245.115 353.458h75.598c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-75.598c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5z" /><path d="m126.035 392.831h194.679c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-194.679c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5z" /><path d="m438.349 239.845c4.142 0 7.5-3.358 7.5-7.5v-126.624c0-17.765-14.453-32.218-32.218-32.218h-3.016v-5.143c0-17.765-14.453-32.218-32.218-32.218h-4.178v-3.923c0-17.766-14.466-32.219-32.246-32.219h-243.604c-17.765 0-32.218 14.453-32.218 32.218v374.061c0 17.765 14.453 32.218 32.218 32.218h4.178v3.923c0 17.765 14.465 32.218 32.246 32.218h2.988v5.143c0 17.765 14.453 32.218 32.218 32.218h243.632c17.765 0 32.218-14.453 32.218-32.218v-212.825c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v100.727h-20.234v-279.181h3.016c9.494 0 17.218 7.724 17.218 17.218v126.624c0 4.143 3.358 7.501 7.5 7.501zm-59.952-188.703c9.494 0 17.218 7.724 17.218 17.218v261.962h-21.396v-279.18zm-297.246 355.137v-97.125l123.06.027h.001c4.141 0 7.499-3.357 7.5-7.499s-3.356-7.5-7.499-7.501l-123.062-.027v-261.936c0-9.494 7.724-17.218 17.218-17.218h243.604c9.51 0 17.246 7.724 17.246 17.218v261.936l-120.398.027c-4.143.001-7.5 3.359-7.499 7.501s3.359 7.5 7.501 7.499l120.395-.027v97.125c0 9.494-7.736 17.218-17.246 17.218h-243.603c-9.494.001-17.218-7.724-17.218-17.218zm36.396 36.142v-3.923h224.425c17.781 0 32.246-14.453 32.246-32.218v-60.957h21.396v97.099c0 9.494-7.724 17.218-17.218 17.218h-243.603c-9.509-.001-17.246-7.725-17.246-17.219zm313.302-59.738v97.099c0 9.494-7.724 17.218-17.218 17.218h-243.632c-9.494 0-17.218-7.724-17.218-17.218v-5.143h225.616c17.765 0 32.218-14.453 32.218-32.218v-59.738z" /></g></g></svg>} />
                    </Tooltip>
                    <Tooltip title="Test">
                        <Button type="text" icon={<svg className='svg-icon' height="18px" viewBox="-27 0 512 512" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="m215 492c0 11.046875-8.953125 20-20 20h-115c-44.113281 0-80-35.886719-80-80v-352c0-44.113281 35.886719-80 80-80h245.890625c44.109375 0 80 35.886719 80 80v212c0 11.046875-8.957031 20-20 20-11.046875 0-20-8.953125-20-20v-212c0-22.054688-17.945313-40-40-40h-245.890625c-22.054688 0-40 17.945312-40 40v352c0 22.054688 17.945312 40 40 40h115c11.046875 0 20 8.953125 20 20zm235.640625-166.261719c-8.980469-6.429687-21.472656-4.359375-27.902344 4.617188l-98.582031 137.703125c-2.691406 3.121094-6.066406 3.792968-7.871094 3.914062-1.867187.121094-5.476562-.113281-8.574218-3.0625l-63.820313-61.28125c-7.964844-7.648437-20.625-7.394531-28.277344.574219-7.652343 7.96875-7.394531 20.628906.574219 28.277344l63.882812 61.34375c9.570313 9.105469 22.339844 14.175781 35.480469 14.175781 1.128907 0 2.261719-.039062 3.394531-.113281 14.3125-.953125 27.675782-7.914063 36.664063-19.101563.230469-.285156.457031-.582031.671875-.882812l98.980469-138.261719c6.429687-8.980469 4.363281-21.472656-4.621094-27.902344zm-144.75-205.738281h-206c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h206c11.042969 0 20-8.953125 20-20s-8.957031-20-20-20zm20 100c0-11.046875-8.957031-20-20-20h-206c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h206c11.042969 0 20-8.953125 20-20zm-226 60c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h125.109375c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm0 0" /></svg>} />
                    </Tooltip>
                    <Tooltip title="Sort">
                        <Button type="text" icon={<SortAscendingOutlined />} />
                    </Tooltip>
                    &nbsp;
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                        <Button type="text" icon={<EllipsisOutlined />} />
                    </Dropdown>
                </div>
            </div>
            <Divider />
        </div>
    )
}

StudySetHeader.propTypes = {
    title: PropTypes.string,
    total: PropTypes.number,
    onAddWord: PropTypes.func,
}

export default memo(StudySetHeader);

