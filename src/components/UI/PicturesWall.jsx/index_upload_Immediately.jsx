import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteImg } from '../../../api';

const BASE_IMG_URL = 'http://localhost:5000/images/';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);


const PicturesWall = React.forwardRef((props, ref) => {

    const { imgs, length } = props;

    const [state, setState] = useState(
        {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
        }
    );

    const [fileList, setFileList] = useState(
        () => {
            if (imgs && imgs.length > 0) {
                return imgs.map((img, index) => ({
                    uid: -index,
                    name: img,
                    status: 'done',
                    url: BASE_IMG_URL + img,
                }));
            } else {
                return []
            }
        }
    )

    //显示指定file对应的大图
    const handlePreview = async (file) => {
        console.log(file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    }


    // file: 当前操作的图片文件（上传/删除）
    // fileList: 所有已上传图片文件对象的数组
    const handleChange = async ({ file, fileList }) => {
        //一旦上传成功了， 将当前上传的file的信息修正（name,url）
        if (file.status === 'done') {
            const rs = file.response; // 获取上传返回值 ： 返回值为 {status : 0 , data : {name:'xx.jpg' , url : '图片地址'} }
            if (rs.status === 0) {
                message.success('Upload file success！');
                const { name, url } = rs.data;
                //我们所操作的 其实是fileList 里的最后一个对象 ， 因为每次添加新的都是从后面那个点的
                //所以file 其实 === fileList[ fileList.length-1 ]  , 2个包含的信息是同样的（属性同） ， 当不同对象 ， 不同值, 所以下面的我们要改 fileList最后一个的值 === file
                file = fileList[fileList.length - 1];
                file.name = name;
                file.url = url;
            } else {
                message.error('Upload file failure ！');
            }
        } else if (file.status === 'removed') {//删除图片
            const rs = await reqDeleteImg(file.name);
            if (rs.status === 0) {
                message.success('Delete file success！');
            } else {
                message.error('Delete file failure！');
            }
        }

        //在操作过程中（上传/删除） 更新fileList状态
        setFileList(fileList);
    }


    ///---------------------------------Modal --------------------------------
    //隐藏modal
    const handleCancel = () => {
        setState({ previewVisible: false });
    }


    //parent 组件 用ref来使用这个函数 获取所有已上传图片文件名的数组 

    React.useImperativeHandle(ref, () => ({
        getImgs: () => {
            return fileList.map(file => file.name);
        }
    })
    );



    return (
        <>
            <Upload
                action="/upload/img"
                accept='image/*' //只接受图片格式
                listType="picture-card"  //显示样式
                fileList={fileList}
                name='image'
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= length ? null : uploadButton}
            </Upload>

            <Modal
                visible={state.previewVisible}
                title={state.previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
            </Modal>
        </>
    )
}
)

PicturesWall.propTypes = {
    imgs: PropTypes.array,
    length: PropTypes.number.isRequired,
}

export default PicturesWall

