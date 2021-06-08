import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Row, Col, Radio, Divider, Input, Button, Select } from 'antd'
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

const { Group } = Radio;
const { Option } = Select;

function FolderOption({ setFilterText, setModalVisible, sortOption, setSortOption }) {

    const [searchInput, setSearchInput] = useState({ text: null, field: 'title' });

    //this is for input search
    useEffect(() => {
        if (searchInput.text === null) return;
        const timeOut = setTimeout(() => {
            setFilterText(searchInput);
        }, 300);

        return () => {
            clearTimeout(timeOut);
        }
    }, [searchInput, setFilterText])
    /*
        React Hook useEffect has a missing dependency: 'findByFilter'. Either include it or remove the dependency array. 
        If 'findByFilter' changes too often, find the parent component that defines it and wrap that definition in useCallback.eslint
    */

    //----------------search input------------------

    const selectBefore = (
        <Select defaultValue="title" onChange={handleSearchSelectChange} >
            <Option value="title">Title</Option>
            <Option value="createdAt">Date</Option>
        </Select>
    )

    //ket hop voi useState , useEffect de lam debounce
    const handleInputChange = (e) => {
        setSearchInput({ ...searchInput, text: e.target.value });
    }

    function handleSearchSelectChange(value) {
        setSearchInput({ ...searchInput, field: value });
    }


    //--------------Modal -------------------------------------
    const handleCreateClick = () => {
        //show modal
        setModalVisible(true);
    }


    //------------Sort----------------------
    // const handleSortNameChange = (e) => {
    //     const { target } = e;
    //     //target checked = true  ==> uncheck it
    //     console.log(target.value === searchOption.sortName);
    //     if (target.value === searchOption.sortName) {
    //         setSearchOption({ ...searchOption, sortName: '' });
    //     } else {
    //         //target checked = false  ==> check it  
    //         setSearchOption({ ...searchOption, sortName: target.value });
    //     }
    // }

    //cai nay dung de thay doi khi , click vao radio, click vao` lan 1 checked, lan 2 unchecked , radioGroup chan chuc nang nay, nen dung onClick radio
    const handleSortNameClick = (e) => {
        if (!setSortOption) return; //ko co props.setSortOption thi bye bye
        const { target } = e;
        //target checked = true  ==> uncheck it
        if (target.value === sortOption.sortName) {
            setSortOption({ ...sortOption, sortName: '' });
        } else {
            //target checked = false  ==> check it  
            setSortOption({ ...sortOption, sortName: target.defaultValue });
        }
    }

    const handleSortTypeChange = (e) => {
        if (!setSortOption) return; //ko co props.setSortOption thi bye bye
        const { target } = e;
        setSortOption({ ...sortOption, sortType: target.value });
    }



    return (
        <div className="tools" style={{ backgroundColor: 'inherit' }}>
            <Row>
                {/* create */}
                <Col span={3}>
                    <Button type="primary" onClick={handleCreateClick} icon={<PlusCircleOutlined />}>
                        Create
                    </Button>
                </Col>
                {/* sort */}
                <Col span={6}>
                    Sort by : &nbsp;
                    <Group value={sortOption.sortName} buttonStyle="solid"
                    // onChange={handleSortNameChange}
                    >
                        <Radio.Button value="title" onClick={handleSortNameClick}>Title</Radio.Button>
                        <Radio.Button value="createdAt" onClick={handleSortNameClick}>Date</Radio.Button>
                    </Group>
                    &nbsp;
                    <Group
                        value={sortOption.sortType}
                        disabled={sortOption.sortName ? false : true}
                        buttonStyle="solid"
                        onChange={handleSortTypeChange}
                    >
                        <Radio.Button value="asc">Ascending</Radio.Button>
                        <Radio.Button value="desc">Descending</Radio.Button>
                    </Group>
                </Col>
                {/* search */}
                <Col span={15}>
                    <Input
                        placeholder="input title text here"
                        addonBefore={selectBefore}
                        suffix={<SearchOutlined />}
                        style={{ width: '60%' }}
                        value={searchInput.text}
                        onChange={handleInputChange}
                    />

                </Col>
            </Row>
            <Divider />
        </div>
    )
}

FolderOption.propTypes = {
    setModalVisible: PropTypes.func,
    setFilterText: PropTypes.func,
    sortOption: PropTypes.object,
    setSortOption: PropTypes.func,
}

FolderOption.defaultProps = {
    setModalVisible: null,
    setFilterText: null,
    sortOption: { sortName: null, sortType: 'asc' },
    setSortOption: null,
}
export default FolderOption;

