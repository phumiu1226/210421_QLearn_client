export function dateFormatter(dateString) {
    const date = new Date(dateString);
    return (date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2)
    );
}

//sortName : arr[i][sortName] , sortType : true=asc, false:desc
export function sortList(arr, sortName, sortType = true) {
    //neu arr khong co 2 phan tu tro len thi khoi xet
    if (arr.length <= 1) return arr;
    //neu khong co sortName (cai nay la property cua object) => thi return arr , vi khong co property tho ko so sanh duoc
    if (sortName === null || sortName === '') return arr;

    //xet xem arr[0][sortName] (property muon so sanh) cua arr la kieu gi , vd kieu string, kieu date, number
    const type = typeof arr[0][sortName];
    //sortName khong dung
    if (type === undefined) return arr;

    //so sanh kieu string
    if (type === 'string') {
        return sortStringArr(arr, sortName, sortType);
    } else //so sanh kieu string
        if (type === 'date') {
            return sortDateArr(arr, sortName, sortType);
        }

}


function sortStringArr(arr, sortName, sortType) {
    return arr.sort((a, b) => {
        const strA = a[sortName].toLowerCase();
        const strB = b[sortName].toLowerCase();
        if (sortType) {
            if (strA < strB) return -1;
            else if (strA > strB) return 1;
            return 0;
        } else {//sort theo desc
            if (strA > strB) return -1;
            else if (strA < strB) return 1;
            return 0;
        }
    });
}

function sortDateArr(arr, sortName, sortType) {
    return arr.sort((a, b) => {
        const strA = a[sortName];
        const strB = b[sortName];
        //sort theo asc
        if (sortType) {
            if (strA < strB) return -1;
            else if (strA > strB) return 1;
            return 0;
        } else {//sort theo desc
            if (strA > strB) return -1;
            else if (strA < strB) return 1;
            return 0;
        }
    });
}