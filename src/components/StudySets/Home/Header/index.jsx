import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Divider, Select, Button } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './index.less';


const { Option } = Select;

const LAST_UPDATE = 'updateAt'
const NAME = 'title'

function Header(props) {

    const [searchValue, setSearchValue] = React.useState('');

    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            props.changeQuery(searchValue);
        }, 300);

        return () => {
            clearTimeout(timeOut);
        }

    }, [props, searchValue]);

    function handleSelectChange(value) {
        props.changeSort(value);
    }

    function handleInputChange(e) {
        setSearchValue(e.target.value);
    }

    return (
        <div className='study-sets-list-header'>
            <Row>
                <Col span={18}>
                    <Button type="primary" icon={<PlusCircleOutlined />}>
                        Create
                    </Button>

                    <Divider type="vertical" />

                    <Select defaultValue={props.sort} style={{ width: 130 }} onChange={handleSelectChange}>
                        <Option value={LAST_UPDATE}>Last updated</Option>
                        <Option value={NAME}>Name</Option>
                    </Select>
                </Col>
                <Col span={6}>
                    <div className='search-box'>
                        <span className='search-input-icon'> <SearchOutlined /></span>
                        <input type='text' className='search-input' placeholder='Search' value={searchValue} onChange={handleInputChange} />
                    </div>

                </Col>
            </Row>
            <Divider />
        </div>
    )
}

Header.propTypes = {
    changeSort: PropTypes.func,
}

export default React.memo(Header)

