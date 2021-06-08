import { useState, useEffect } from 'react'


function useData(initValue, requestApi) {
    const [data, setData] = useState(initValue);

    useEffect(() => {
        const getData = async () => {
            let rs;
            try {
                rs = await requestApi();
                if (rs.status === 0) {
                    const list = rs.data.map((folder, index) => ({ ...folder, index }));
                    setData(list);
                }
            } catch (err) {
                console.log(err);
            }
        }
        if (data === null) getData();

    }, [data, requestApi]);


    return [
        data,
        (values) => {
            setData(values);
        }
    ]
}


export default useData;