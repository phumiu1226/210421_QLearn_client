import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, Switch, Button } from 'antd'
const { Item } = Form;
const { TextArea } = Input;


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};

function FolderModalForm(props) {
    const [form] = Form.useForm();

    const { visible, onSubmit, onCancel, updateFolder } = props;


    //ở đây antd bị lỗi không init được nên phải useEffect để reset form
    useEffect(() => {
        form.resetFields();
    }, [form, props.visible]);

    //submit : send values to parent
    const onHandelOk = () => {
        form.validateFields().then(values => {
            values.title = values.title.trim();
            values.description = values.description.trim();
            const newValues = { ...updateFolder, ...values }; // this line for update
            onSubmit(newValues);
        });
    }

    return (
        <Form {...layout}
            form={form}
            name={updateFolder ? "update-form" : "insert-form"}
            initialValues={{
                title: updateFolder ? updateFolder.title : '',
                description: updateFolder ? updateFolder.description : '',
                isPublic: updateFolder ? updateFolder.isPublic : true,
                isPublicEdit: updateFolder ? updateFolder.isPublicEdit : false,

            }}
        >

            <Modal title={updateFolder ? 'Update folder' : 'Insert folder'} visible={visible} onCancel={onCancel} onOk={onHandelOk} afterClose={() => { form.resetFields(); }}
                footer={[
                    <Button key="cancel" onClick={onCancel}>
                        Cancel
                    </Button>,
                    <Button key='submit' type="primary" onClick={onHandelOk} >
                        Submit
                    </Button>,
                ]}

                destroyOnClose={true}
            >
                <Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="input folder title" />
                </Item>

                <Item
                    name="description"
                    label="description"
                    rules={[

                    ]}
                >
                    <TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="input folder description" />
                </Item>

                <Item style={{ margin: 0 }} wrapperCol={{ span: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        {/* valuePropName : value ma Switch se~ tra ve khi submit, neu checked thi se tra ve true , neu khong tra ve undefined  */}
                        {/* tren form co the set initialValues */}
                        <Item label="Public" name="isPublic" valuePropName="checked" >
                            <Switch />
                        </Item>

                        <Item label="Every one can Edit" name="isPublicEdit" valuePropName="checked">
                            <Switch />
                        </Item>
                    </div>
                </Item>
            </Modal>
        </Form>
    )
}

FolderModalForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    updateFolder: PropTypes.object,
}

FolderModalForm.defaultProps = {
    updateFolder: null
}



export default FolderModalForm;

