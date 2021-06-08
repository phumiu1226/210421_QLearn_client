import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { reqStudySetDetail, reqAddWord, reqUploadImg, reqRemoveWord, reqDeleteImg, reqEditWord } from '../../api'
import WordList from '../../components/StudySets/Detail/WordList'
import StudySetHeader from '../../components/StudySets/Detail/Header'
import FormWrapper from '../../components/StudySets/Detail/FormWrapper'
import { message } from 'antd';


const SIZE = 20;
const BASE_IMG_URL = '/images/';


export const myContext = React.createContext();
const { Provider } = myContext;


function StudySetDetail(props) {


    const studySetId = props.match.params.id;

    const [wordList, setWordList] = useState({ data: [], total: null, title: null });

    //o day hook co van de ve setState nhieu lan nen phai gop 2 setState lai thanh 1, ==> su dung object de gop
    //neu khong gop no moi lan setState lai re-render lai 1 lan
    const [state, setState] = useState({ visible: false, updateItem: {} });



    if (wordList.total === 0) {
        if (wordList.total !== wordList.pos)
            setWordList({ ...wordList, pos: 0 });
    }
    //kiem tra khi add new word xong
    else {
        if (wordList.total < wordList.pos) setWordList({ ...wordList, pos: wordList.total });
    }


    function loadMoreRows({ startIndex, stopIndex }) {
        return reqStudySetDetail(studySetId, SIZE, wordList.pos).then(rs => {
            if (rs.status === 0) {
                // if (!total.current) total.current = rs.data[0].count;
                // total.current = rs.data[0].count; //vi phai cap nhat total lai, khi add 1 word moi
                setWordList({
                    title: rs.data[0].title,
                    total: rs.data[0].count,
                    // pos: wordList.pos + SIZE,
                    data: [...wordList.data, ...rs.data[0].words]
                })
            }
        });
    }


    //---------------Modal -------------------
    /*
    kiem tra xem submit nay la addword hay editword
        1. edit word
            -xet img moi hay img cu~ 
                -img cu thi ko lam gi ca (neu la img cu~ thi image.uid === -1)
                -img moi thi lam 1 cai formdata send di va xoa img cu~ bang name
        2. add word
            - add word va them img neu co
    */
    function onSubmit(values, image) {

        if (values._id) {
            //edit word
            let form;
            let oldImgName;
            const { word, types, description, _id: worId } = values;
            if (image.uid !== -1) {
                //get old img name to delete
                const originImgName = values.img;
                oldImgName = originImgName.slice(originImgName.lastIndexOf('images/') + 7);

                //---make new file name for database and backend(for save img)
                const originFileName = image.name.split('.');
                let name = '';
                for (let i = 0; i < originFileName.length - 1; i++) name += originFileName[i];
                const newFileName = name + '-' + Date.now() + '.' + originFileName[originFileName.length - 1];

                //img stirng save to database
                values.img = BASE_IMG_URL + newFileName;

                form = new FormData();
                form.append('image', image, newFileName);
            }

            Promise.all([
                reqEditWord(studySetId, worId, word, description, values.img, types),
                image.uid !== -1 ? reqDeleteImg(oldImgName) : null, //co img moi thi phai xoa img cu~
                image.uid !== -1 ? reqUploadImg(form) : null //upload img moi 
            ]).then(response => {

                //refesh data
                const index = wordList.data.findIndex(word => word._id === values._id);
                const newWordList = [...wordList.data];
                newWordList[index] = response[0].data;

                setWordList({
                    ...wordList,
                    data: newWordList
                });

                setState({ visible: false });

            }).catch(err => {
                console.log(err.message);
            });


        } else {
            //add word
            //---make new file name for database and backend(for save img)
            const originFileName = image.name.split('.');
            let name = '';
            for (let i = 0; i < originFileName.length - 1; i++) name += originFileName[i];
            const newFileName = name + '-' + Date.now() + '.' + originFileName[originFileName.length - 1];

            //img stirng save to database
            values.img = BASE_IMG_URL + newFileName;

            const { word, types, description, img } = values;

            const form = new FormData();
            form.append('image', image, newFileName);

            Promise.all([
                reqAddWord(studySetId, word, description, types, img),
                reqUploadImg(form)
            ]).then(res => {
                if (res[0].status === 0 && res[1].status === 0) {
                    message.success('Add word successfully !');
                    //refresh wordList
                    if (wordList.data.length === wordList.total) {
                        setWordList({
                            ...wordList,
                            total: wordList.total + 1,
                            data: [...wordList.data, res[0].data],
                        });
                    } else {
                        setWordList({
                            ...wordList,
                            total: wordList.total + 1,
                        });
                    }

                    setState({ visible: false });
                }
            }).catch(err => {
                message.error(err.message);
            })
        }
    }

    function onCancel() {
        setState({ visible: false })
    }

    //-------------Item button process, use context to get item id --------------------
    const providerValue = {
        visibleModal: (updateItem) => {
            setState({ visible: true, updateItem })
        },
        deleteItem: (index) => {
            const word = wordList.data[index];
            const originImgName = word.img;
            const imgName = originImgName.slice(originImgName.lastIndexOf('images/') + 7);

            Promise.all([
                reqRemoveWord(studySetId, word._id),
                reqDeleteImg(imgName)
            ]).then(response => {
                //refresh wordList
                if (response[0].status === 0 && response[1].status === 0) {
                    message.success('Remove word successfully !');

                    const newWordList = [...wordList.data];
                    newWordList.splice(index, 1);
                    setWordList({
                        ...wordList,
                        data: newWordList,
                        pos: wordList.pos - 1,
                        total: wordList.total - 1,
                    })

                }
            }).catch(err => {
                console.log(err.message);
            });

        }
    }


    return (
        <div style={{ maxWidth: '1200px', margin: 'auto' }}>
            <StudySetHeader
                title={wordList.title}
                total={wordList.total}
                onAddWord={() => { setState({ visible: true }) }} //show add modal
            />
            <div>
                {/* context gui di cho worditem , moi lan click vao nut edit se~ hien thi modal va lay du lieu cua item do */}
                <Provider value={providerValue}
                >
                    <WordList
                        wordList={wordList.data}
                        total={wordList.total}
                        loadMoreRows={loadMoreRows}
                    />
                </Provider>
            </div>

            {/* ------------Modal Form for edit or insert word --------- */}
            <FormWrapper
                visible={state.visible}
                onSubmit={onSubmit}
                onCancel={onCancel}
                updateItem={state.updateItem}
            />
        </div>
    )
}

export default withRouter(StudySetDetail);

