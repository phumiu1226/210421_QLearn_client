import React, { useReducer } from 'react'
import { Upload, Button, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';



const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);


const fileUploadReducer = (state, action) => {
    switch (action.type) {
        case "UPLOADING":
            return {
                ...state,
                uploading: true,
            };
        case "SUCCESS":
            return {
                ...state,
                uploading: false,
            };
        case "BEFORE_UPLOAD":
            return {
                ...state,
                fileList: action.fileList,
            };
        case "REMOVE":
            return {
                ...state,
                fileList: action.fileList,
            }
        default:
            throw new Error();
    }
};


function Test() {

    const [upload, dispatch] = useReducer(fileUploadReducer, { uploading: false, fileList: [] });



    const handleUpload = () => {
        const formData = new FormData();
        // upload.fileList.forEach(file => {
        //     formData.append('image', file);
        // });

        formData.append('image', upload.fileList[0]);


        dispatch({ type: "UPLOADING" });

        axios({
            method: "post",
            url: "/upload/img",
            data: formData,
            headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` },
        }).then(response => {
            console.log(response.data);
            dispatch({ type: "SUCCESS" });
        }).catch(err => {
            console.log(err.message);
        });

    }
    const props = {
        fileList: upload.fileList,
        listType: 'picture-card',
        accept: 'image/*',
        onRemove: file => {

            const index = upload.fileList.indexOf(file);
            const newFileList = upload.fileList.slice();
            newFileList.splice(index, 1);
            dispatch({ type: 'REMOVE', fileList: newFileList });
        },
        beforeUpload: file => {
            file.thumbUrl = URL.createObjectURL(file);
            const newFileList = [...upload.fileList, file];
            dispatch({ type: 'BEFORE_UPLOAD', fileList: newFileList });

            return false;
        },
    };

    return (
        <div>
            <Upload {...props}
            >
                {/* <Button icon={<UploadOutlined />}>Select File</Button> */}
                {uploadButton}
            </Upload>


            <Button
                type="primary"
                onClick={handleUpload}
                disabled={upload.fileList.length === 0}
                loading={upload.uploading}
                style={{ marginTop: 16 }}
            >
                {upload.uploading ? 'Uploading' : 'Start Upload'}
            </Button>
        </div>
    )
}



export default Test

