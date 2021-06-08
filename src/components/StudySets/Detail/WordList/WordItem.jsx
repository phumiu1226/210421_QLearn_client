import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Tag, Button, Tooltip, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { myContext } from '../../../../pages/StudySets/Detail'; //lay context, trong context co function de setModal hien thi
import { TYPE_COLER } from '../../Constant'

const { Title } = Typography;
const { confirm } = Modal;





const WordItem = React.forwardRef(
    (props, ref) => {
        const { item, index } = props;

        //use context get function
        const { visibleModal, deleteItem } = React.useContext(myContext); //visibleModal la 1 function 

        const type = item.types.map(value => (
            <Tag key={value} color={TYPE_COLER[value]}>{value}</Tag>
        ))

        //delete confirm
        function showConfirm(index) {
            confirm({
                title: 'Are you sure to remove this word ?',
                icon: <ExclamationCircleOutlined />,
                content: 'This action cannot be undone',
                onOk() {
                    deleteItem(index);
                },
                onCancel() {

                },
            });
        }


        return (
            <div className='word-item-outter-box' ref={ref} style={props.style}>
                <div className='word-item-box'>
                    <div className='word-item-box-left'>
                        {/* -------------word ---------------------- */}
                        <Title level={4}>{item.word} - {index}</Title>
                        {/* -------------tag ---------------------- */}
                        <div className='word-tag'>
                            {type}
                        </div>
                        {/* -------------description ---------------------- */}
                        <p>
                            {item.description}
                        </p>
                    </div>
                    {/* -------------Image ---------------------- */}
                    <div className='word-item-box-middle'>
                        {
                            item.img ? (
                                <div className='img-box'>
                                    <img src={item.img} alt={item._id} onLoad={props.measure} />
                                </div>
                            ) : null
                        }
                    </div>
                    <div className='word-item-box-right'>
                        {/* -------------EDIT Button ---------------------- */}
                        <Tooltip title="Edit">
                            <Button type="text"
                                onClick={() => { visibleModal(item) }} //khi click vao edit se hien thi modal
                                icon={<EditOutlined />}
                            />
                        </Tooltip>
                        {/* -------------DELETE Button ---------------------- */}
                        <Tooltip title="Delete">
                            <Button type="text" icon={<DeleteOutlined />}
                                onClick={() => showConfirm(index)}
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
        )
    }

);

WordItem.propTypes = {
    item: PropTypes.object,
}

export default React.memo(WordItem);

