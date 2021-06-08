import axios from 'axios';
import { useEffect, useState, useRef } from 'react';


function useStudySetList(query, pos, pageSize, userId, sort) {


    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [studySetList, setStudySetList] = useState([]);
    const [total, setTotal] = useState(0);

    const currentPos = useRef();

    //cai nay moi khi query thay doi moi reset la list
    //==> luc search moi chay
    useEffect(() => {
        setStudySetList([]);
        setTotal(0);
    }, [query, sort]);


    useEffect(() => {

        if (currentPos.current > pos) {
            currentPos.current = pos;
            return;
        }

        setLoading(true);
        let cancel;

        axios({
            method: 'GET',
            url: '/studysets/list',
            params: { q: query, pos, pageSize, userId, sort },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {

            setStudySetList(preList => {
                return [...preList, ...response.data.data];
            });

            setTotal(response.data.total);
            setHasMore(response.data.data.length > 0);
            setLoading(false);

            currentPos.current = pos;
        }).catch(e => {
            if (axios.isCancel(e)) return;
        });

        //truoc khi chay 1 axios moi , se huy axios cu~
        return () => cancel();

    }, [query, pos, pageSize, userId, sort]);

    return {
        loading, hasMore, studySetList, total,
        setStudySetList: (newList) => { setStudySetList(newList) }
    };

}



export default useStudySetList;