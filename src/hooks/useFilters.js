import { useState, useRef } from 'react';
import { dateFormatter } from '../utils/format';

function useFilters(init, filterText, arr, property) {
    const [filterList, setFilterList] = useState(init);
    const refFilterText = useRef(filterText);
    const refArr = useRef(arr);
    const refProperty = useRef(property);


    if (refArr.current !== arr || refProperty.current !== property || refFilterText.current !== filterText) {
        if (!arr) return;
        if (!(arr.length <= 1)) {
            if (filterText) {
                let list;
                if (property === 'createdAt') {
                    list = arr.filter(item => dateFormatter(item[property]).indexOf(filterText) > -1);
                }
                else {
                    list = arr.filter(item => item[property].toLowerCase().indexOf(filterText.toLowerCase()) > -1);
                }
                setFilterList(list);
            } else {
                setFilterList(arr);
            }
        } else {
            setFilterList(arr);
        }

        refFilterText.current = filterText;
        refArr.current = arr;
        refProperty.current = property;
    }


    return [
        filterList
    ]
}

export default useFilters;