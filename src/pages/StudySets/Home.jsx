import React, { useState, useEffect } from 'react';
import useStudySetList from '../../hooks/useStudySetList';
import { useSelector } from 'react-redux';
import { reqDeleteStudySet } from '../../api';

import { Empty, message } from 'antd';


import StudySetList from '../../components/StudySets/Home/List'
import Header from '../../components/StudySets/Home/Header'

const pageSize = 10;


export default function StudySetHome() {




    const user = useSelector(state => state.user);

    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('updateAt');
    const [pos, setPos] = useState(0);

    const changeSort = React.useCallback(
        (value) => {
            setSort(value)
        },
        [],
    );
    const changeQuery = React.useCallback(
        (value) => {
            setQuery(value)
        },
        [],
    );

    useEffect(() => {
        setPos(0);
    }, [query, sort]);

    const { hasMore, loading, studySetList, total, setStudySetList } = useStudySetList(query, pos, pageSize, user._id, sort);



    //---------------delete Folder set ---------------
    const handleDelete = async (studySetId, index) => {

        try {
            const rs = await reqDeleteStudySet(studySetId);
            // delete success , show message and update list
            if (rs.status === 0) {
                message.success(rs.msg);
                const newList = [...studySetList];
                newList.splice(index, 1);
                setStudySetList(newList);
                setPos(prePos => prePos - 1); // giam position xuong 1 , de luc req chinh xac 
            } else {
                // delete failure , show message
                message.error(rs.msg);
            }
        } catch (err) {
            message.error(err.message);
        }
    }






    return (
        <div style={{ maxWidth: '1200px', margin: 'auto' }}>

            {/* -------- header ------------ */}

            <Header
                sort={sort}
                changeSort={changeSort}
                query={query}
                changeQuery={changeQuery}
            />


            {studySetList.length > 0 ?
                /* ---------------when have data ---------------    */
                /* ------- StudySet List ---------- */
                <StudySetList
                    hasMore={hasMore} loading={loading} studySetList={studySetList} total={total}
                    setPos={() => setPos(prePos => prePos + pageSize)}
                    handleDelete={handleDelete}
                />
                :
                /* ---------------when have no data ---------------    */
                <Empty />
            }
        </div >
    )
}



