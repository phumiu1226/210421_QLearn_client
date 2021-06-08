import { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FixedSizeList } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'
import { dateFormatter } from '../../../../utils/format'
import { Link } from 'react-router-dom';
import { Col, Row, Typography, Skeleton, Button, Tag, Switch, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import './index.less'

const { Title, Text } = Typography;
const { confirm } = Modal;

function StudySetList(props) {

    const { hasMore, loading, studySetList } = props;

    // dung de giam sat scroll (that ra la giam sat phan tu cuoi cung cua list co xuat hien tren man hinh chua)
    const observer = useRef();

    const lastStudySetRef = useCallback(node => {
        if (loading) return;

        // huy giam sat neu co giam sat
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            /*
                entries[0].isIntersecting : vi chi theo doi~ 1 thang node cuoi cung nen lay truc tiep entries[0] ,     
                isIntersecting la` khi thang root(parent, o day root la null === viewport cua trinh duyet) voi thang entries[0] giao nhau
                            y' la khi thang entries[0] xuat hien tren viewport 
                &&hasMore : du~ lieu van~ con` 
            */
            if (entries[0].isIntersecting && hasMore) {
                // props.setPageNum(prevPageNumber => prevPageNumber + 1);
                props.setPos();
            }
        })

        if (node) observer.current.observe(node);

    }, [loading, hasMore, props]);


    const handleDelete = (studySetId, index) => {
        confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleOutlined />,
            content: 'You will not be able to recover this study set!',
            onOk() {
                props.handleDelete(studySetId, index);
            },
            onCancel() {

            },
        });
    }



    return (
        <ReactWindowScroller>
            {({ ref, outerRef, style, onScroll }) => (
                // thang itemCount nen set thanh`  size cua phan tu list hien co , y la total co 22 , ma` list bay gio chi co 10 thoi , thi` itemCount = 10 
                <FixedSizeList
                    ref={ref} outerRef={outerRef} onScroll={onScroll} style={style}
                    height={window.innerHeight} itemCount={studySetList.length} itemSize={150}
                >
                    {
                        ({ index, style }) => (
                            <div className="studyset-item-box" style={style}>
                                {
                                    loading ? <Skeleton active /> :
                                        (
                                            <div ref={studySetList.length === index + 1 ? lastStudySetRef : null}
                                                className='studyset-item-inner-box'>
                                                <Row className='box'>
                                                    <Col span={16} className='left'>
                                                        {/* ----------route /detail using params ------------------*/}
                                                        <Link to={`/study-sets/detail/${studySetList[index]._id}`} className='link'>
                                                            <Title level={4}> {studySetList[index].title}</Title>
                                                            <Text type="secondary">{dateFormatter(studySetList[index].updatedAt)}</Text>
                                                            <p>
                                                                <Text type="default">{studySetList[index].description}</Text>
                                                            </p>
                                                        </Link>
                                                    </Col>
                                                    {/* item count tag */}
                                                    <Col span={2} className='middle'>
                                                        <Tag color="#108ee9">{studySetList[index].count} items</Tag>
                                                    </Col>
                                                    {/* isPublic */}
                                                    <Col span={2} className='middle'>
                                                        <Switch checkedChildren="Public" unCheckedChildren="Private" defaultChecked={studySetList[index].isPublic} />
                                                    </Col>

                                                    <Col span={4} className='right'>
                                                        {/* edit button */}
                                                        <Button
                                                            type="primary"
                                                            icon={<EditOutlined />}
                                                        >
                                                            Edit
                                                        </Button>
                                                        &nbsp;
                                                        {/* delete button */}
                                                        <Button
                                                            type="primary"
                                                            icon={<DeleteOutlined />}
                                                            onClick={() => { handleDelete(studySetList[index]._id, index) }}
                                                            danger
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                }
                            </div>
                        )
                    }
                </FixedSizeList>

            )
            }
        </ReactWindowScroller>

        // {
        //     studySetList.map((values, index) => {
        //         if (studySetList.length === index + 1) {
        //             return <div style={{ background: 'red', color: 'white' }} ref={lastStudySetRef} key={values._id}>last</div>
        //         }
        //         return <div key={values._id}>{values.title}</div>
        //     })
        // } 
    )
}

StudySetList.propTypes = {
    studySetList: PropTypes.array,
    setPos: PropTypes.func,
    hasMore: PropTypes.bool,
    loading: PropTypes.bool,
    handleDelete: PropTypes.func,
}

StudySetList.defaultProps = {
    studySetList: [],
    setPos: null,
    hasMore: false,
    loading: true,
    handleDelete: null,
}


export default StudySetList

