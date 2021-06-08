import React, { useEffect } from 'react'
import { Form, Input, Switch } from 'antd';
import PropTypes from 'prop-types';
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

FolderForm.propTypes = {
    setForm: PropTypes.func,
}

FolderForm.defaultProps = {
    setForm: null
}

export default function FolderForm(props) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (!props.setForm) return;
        props.setForm(form);
    }, [form, props]);

    return (
        // NOTE : 'isPublic': true , phai co  valuePropName="checked"
        <Form {...layout} form={form} name="control-hooks" initialValues={{ 'title': '', 'isPublic': true }}>

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

                    <Item label="Every on can Edit" name="isPublicEdit" valuePropName="checked">
                        <Switch />
                    </Item>
                </div>
            </Item>




        </Form>
    )
}
