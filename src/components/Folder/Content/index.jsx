import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import folderImg from '../../../assets/images/folder-pic.png'
import './index.less'
import { dateFormatter } from '../../../utils/format'

const { confirm } = Modal;

function FolderContent(props) {


    const { folders } = props;


    //chuc nang delete , o day lay index de xoa phan tu trong folders array
    const handleDelete = (folderId, index) => {
        confirm({
            title: 'Do you want to delete this folder?',
            icon: <ExclamationCircleOutlined />,
            content: 'The folder will not be recoverable if it is deleted, will you definitely delete it? ',
            onOk() {
                props.deleteFolder(folderId, index);
            },
            onCancel() {

            },
        });
    }


    //chuc nang update , send du lieu cho Folder xu ly , components nay nhu 1 cai middleware xu ly giua~ 2 ben
    const handleUpdate = (folder, index) => {
        props.setModalVisible(true, folder, index);
    }



    return (
        <div className='folder-content'>
            <Row gutter={[16, 16]}>
                {
                    folders.map((folder, index) => {
                        return (
                            //animation for add new folder 
                            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} key={folder._id} className='folder-col' >
                                {/* -----Card ------------  */}
                                <Card
                                    bodyStyle={{ padding: '0' }}
                                    //--------------- footer Edit and Delelte
                                    actions={[
                                        <EditOutlined key="edit" onClick={() => { handleUpdate(folder, index) }} />,
                                        <DeleteOutlined key="delete" onClick={() => { handleDelete(folder._id, index) }} />,
                                    ]}
                                >
                                    {/* ---------------folder info ------------------ */}
                                    <a className='link-item' href='/folderID' style={{ display: 'block' }}>
                                        <Row>
                                            <Col span='18'>
                                                <b className='item-title'>{folder.title}</b>
                                                <p className='date-created'>{dateFormatter(folder.createdAt)}</p>
                                            </Col>
                                            <Col span='4'>
                                                <img className='folder-content-icon' src={folderImg} alt='folder icon' style={{ width: '100%' }} />
                                            </Col>
                                        </Row>
                                        <Col span='24' className='user-info-box'>
                                            <div className='avatar-box'>
                                                <img src={props.user.avatar} alt='avatar' />
                                            </div>
                                            <span className='user-info'>{props.user.fullName ? props.user.fullName : props.user.username}</span>
                                        </Col>
                                    </a>
                                </Card>
                            </Col>
                        )
                    })
                }
                {/* <Col span={6}>
                <Card bodyStyle={{ padding: 0 }}>
                    <a href='/folderID' style={{ display: 'block' }}>
                        <Col span='18'>
                            title
                        </Col>
                        <Col span='6'>
                            avatar
                        </Col>
                        <Col span='24'>
                            username
                        </Col>
                    </a>
                </Card>
            </Col> */}
            </Row>

        </div>
    )
}

FolderContent.propTypes = {
    folders: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    setModalVisible: PropTypes.func.isRequired,
}

export default FolderContent

