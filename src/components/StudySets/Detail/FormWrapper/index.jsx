import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, Button, Select } from 'antd';
import { TYPE } from '../../Constant'
import PicturesWall from '../../../UI/PicturesWall.jsx/index.jsx';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};

// ------ select Option ----------

const typeOptions = Object.entries(TYPE).map((values) => {
    const [key, value] = values;
    return (<Option key={key} > {value} </Option>)
});


function FormWrapper(props) {

    const [form] = Form.useForm();

    const { visible, onSubmit, onCancel, updateItem } = props;

    //ở đây antd bị lỗi không init được nên phải useEffect để reset form
    useEffect(() => {
        form.resetFields();
    }, [form, props.visible]);


    //-----get image info----
    const imgRef = useRef();

    //---------default img----
    let imgObj;
    if (updateItem && updateItem.img) {
        imgObj = {
            uid: -1,
            name: 'image.png',
            status: 'done',
            url: updateItem.img
        }

    }

    //submit : send values to parent
    const onHandelOk = () => {
        form.validateFields().then(values => {
            values._id = updateItem?._id; // this line for update word, if _id exits ==> updateWord
            values.img = updateItem?.img;
            onSubmit(values, imgRef.current.getImgs()[0]); //send cho Detail component xu ly
        });
    }

    return (
        <Form {...layout}
            form={form}
            name={updateItem ? "update-form" : "insert-form"}
            initialValues={{
                word: updateItem ? updateItem.word : '',
                description: updateItem ? updateItem.description : '',
                types: updateItem ? updateItem.types : [],
            }}
        >

            <Modal title={updateItem ? 'Edit word' : 'Add word'} visible={visible} onCancel={onCancel} onOk={onHandelOk} afterClose={() => { form.resetFields(); }}
                footer={[
                    <Button key="cancel" onClick={onCancel}>
                        Cancel
                </Button>,
                    <Button key='submit' type="primary" onClick={onHandelOk} >
                        Save
                </Button>,
                ]}

                destroyOnClose={true}
            >

                <Item
                    name="word"
                    label="Word"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="input folder title" />
                </Item>

                <Item
                    name="types"
                    label="Types"
                >
                    <Select
                        placeholder="Please select"
                        // onChange={}
                        allowClear
                        mode="multiple"
                        style={{ width: '100%' }}
                    >
                        {typeOptions}
                    </Select>
                </Item>

                <Item label='image'>
                    <PicturesWall length={1} ref={imgRef} imgObj={imgObj} />
                </Item>

                <Item
                    name="description"
                    label="Description"
                    rules={[

                    ]}
                >
                    <TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="input folder description" />
                </Item>

            </Modal>
        </Form>
    )
}

FormWrapper.propTypes = {
    updateItem: PropTypes.object,
    visible: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
}

export default FormWrapper

