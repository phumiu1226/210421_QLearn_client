import React, { useState } from 'react'
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);


const PicturesWall = React.forwardRef(
    (props, ref) => {

        const { imgObj } = props;

        const [fileList, setFileList] = useState(() => {
            if (imgObj) return [imgObj];
            else return []
        });

        const { length } = props;


        React.useImperativeHandle(ref, () => ({
            getImgs: () => {
                return fileList.map(file => file); //send to formWrapper , then formWrapper submit
            }
        })
        );

        const uploadProps = {
            fileList,
            listType: 'picture-card',
            accept: 'image/*',
            onRemove: file => {

                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                setFileList(newFileList);
            },
            beforeUpload: file => {

                file.thumbUrl = URL.createObjectURL(file); //show preview picture url
                const newFileList = [...fileList, file];
                setFileList(newFileList);

                return false;
            },
        };

        return (
            <div>
                <Upload {...uploadProps}
                >
                    {/* <Button icon={<UploadOutlined />}>Select File</Button> */}
                    {fileList.length < length ? uploadButton : null}
                </Upload>
            </div>
        )
    }
)




export default PicturesWall

