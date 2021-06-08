import { useState, useCallback } from 'react'
import { reqFolder, reqAddFolder, reqDeleteFolder, reqUpdateFolder } from '../../api'
import { connect } from 'react-redux'
import FolderContent from '../../components/Folder/Content';
import FolderOption from '../../components/Folder/Option';
import { message } from 'antd';
import Loading from '../../components/UI/Loading';
import FolderModalForm from '../../components/Folder/Form';
import { sortList } from '../../utils/format';
import useData from '../../hooks/useData';
import useFilters from '../../hooks/useFilters';




function Folder(props) {

    // const [folders, setFolders] = useState(null);
    const [folders, setFolders] = useData(null, () => reqFolder(0, props.user._id));
    // const [filters, setFilters] = useState(null);
    const [filter, setFilter] = useState(null);
    const [sortOption, setSortOption] = useState({ sortName: '', sortType: 'asc' });
    const [filters] = useFilters(null, filter ? filter.text : null, folders, filter ? filter.field : null);
    // const [visible, setVisible] = useState(false);
    //o day hook co van de ve setState nhieu lan nen phai gop 2 setState lai thanh 1, ==> su dung object de gop
    const [state, setState] = useState({ visible: false, updateFolder: {} });




    //----------------------FolderModalForm -------------------------------------
    const onSubmit = (values) => {

        //xet xem co la insert hay la update (xem values co id khong la biet lien)
        if (values._id) {
            //update
            updateFolder(values, state.renderIndex);
        } else {
            //insert
            //lay func tu thang props , nen phai xet no
            if (!values.isPublic) values.isPublic = false;
            if (!values.isPublicEdit) values.isPublicEdit = false;
            //insert
            addFolder(values);
        }

        setState({ visible: false });
    }

    const onCancel = () => { setState({ visible: false }) }

    //nhan du lieu tu onSubmit , xu ly viec add Folder
    const addFolder = async (values) => {
        try {
            const userId = props.user._id;
            const parentId = 0;
            const folder = { ...values, userId, parentId };

            const rs = await reqAddFolder(folder);
            if (rs.status === 0) {
                message.success('Add folder successfully');
                //add index for new folder item
                rs.data.index = folders.length;
                //refresh folders  - -- add new folder to folders list
                setFolders([...folders, rs.data]);
            } else {
                message.error(rs.msg);
            }
        } catch (err) {
            message.error(err);
        }

    }

    //nhan du lieu tu child(render) component , xu ly viec update Folder
    const updateFolder = async (values, renderIndex) => {
        try {
            const rs = await reqUpdateFolder(values);
            if (rs.status === 0) {
                message.success('Update folder successfully');
                //update folders , get index then find and update
                const newFolders = [...folders];
                newFolders[values.index] = { ...values };
                setFolders(newFolders);
                onCancel();
            } else {
                message.error(rs.msg);
            }
        } catch (err) {
            message.error(err);
        }

    }

    //nhan du lieu tu child(render) component , xu ly viec delete Folder
    const deleteFolder = async (folderId, index) => {
        try {
            const rs = await reqDeleteFolder(folderId);

            if (rs.status === 0) {
                message.success('Delete folder successfully');
                //update folders
                // const index = folders.findIndex(folder => folder._id === folderId);
                const newFolders = [...folders];
                newFolders.splice(index, 1); //// Starting at index position, remove 1 elements 
                setFolders(newFolders);
            } else {
                message.error(rs.msg);
            }
        } catch (err) {
            message.error(err);
        }
    }


    //------------------------------filter --------------------------------
    /*
        -ở đây setFilterText này được truyền cho components con , và components con có sử dụng useEffect để truyền dữ liệu qua cho
            thằng này, sau đó setFilterText này có xử lý đến state, nên khi xử lý xong nó lại re-render, mà trong functional components
            thì re-render có nghĩa là những funciton cũ trong hàm sẽ bị loại bỏ , và nó khai báo function mới , nghĩa là re-render lại
            có setFilterText mới , thế lại nó lại truyền cho thằng con , thằng con lại phải re-render và dùng useEffect tiếp , nên nó cứ lặp lại suốt
        ==> phải dùng useCallback để xử lý vấn đề này , để thằng findByFilter không thay đổi
        - useCallback(function , dependencies)
    */

    //cai nay nhan text tu FolderOption xong , truyen vao filter, components se re-render , luc do , ta se setFilters list luon , nen gio bay len useEffect
    const setFilterText = useCallback(text => {
        setFilter(text);
    }, []);



    if (!folders) return <Loading />
    else {
        return (
            <div style={{ padding: '10px' }}>
                <FolderOption
                    setModalVisible={(isVisible) => { setState({ visible: isVisible }) }}
                    setSortOption={option => { setSortOption(option) }}
                    setFilterText={setFilterText}
                    sortOption={sortOption}
                />
                <FolderContent
                    user={props.user}
                    folders={sortOption.sortName ?
                        (filters ? sortList([...filters], sortOption.sortName, sortOption.sortType === 'asc' ? true : false)
                            : sortList([...folders], sortOption.sortName, sortOption.sortType === 'asc' ? true : false))
                        : (filters ? filters : folders)
                    }
                    //setVisible for update folder
                    setModalVisible={
                        (isVisible, folder, index) => {
                            setState({
                                visible: isVisible,
                                folder,
                                renderIndex: index
                            });
                        }
                    }
                    deleteFolder={deleteFolder}

                />

                <FolderModalForm visible={state.visible} onSubmit={onSubmit} onCancel={onCancel} updateFolder={state.folder} />
            </div>
        );
    }


}


export default connect(
    state => ({ user: state.user }),
    {}
)(Folder);



// useEffect(() => {
    //     const getFolderData = async () => {
    //         let rs;
    //         // let folders;
    //         try {
    //             //get folder 
    //             rs = await reqFolder(0, props.user._id);
    //             if (rs.status === 0) {
    //                 // folders = rs.data;
    //                 //them index vao moi items sau nay update item de~ xu ly hon (vi update vua co filter vua co folders)
    //                 const list = rs.data.map((folder, index) => ({ ...folder, index }));

    //                 setFolders(list);
    //             }
    //         } catch (err) {
    //             console.log(rs.msg);
    //         }
    //         // return folders;
    //     }

    //     if (!folders) getFolderData();
    // }, [folders, props.user._id]);

    // useEffect(() => {
    //     if (filter === null) return;
    //     const findByFilter = () => {
    //         try {
    //             //nếu không có chữ trong input search, thì sẽ kết thúc luôn , không filter gì hết
    //             if (filter.text === '') {
    //                 setFilters(null);
    //                 return;
    //             }
    //             //filter
    //             let filterList;
    //             if (filter.field === 'title') {
    //                 filterList = folders.filter(item => (item.title).toLowerCase().indexOf(filter.text.toLowerCase()) !== -1) || [];
    //             } else {
    //                 filterList = folders.filter(item => dateFormatter(item.createdAt).indexOf(filter.text) !== -1) || [];
    //             }

    //             setFilters(filterList);
    //             /*
    //             const rs = await reqfindFoldersbyTitle(values, props.user._id);
    //             if (rs.status === 0) {
    //                 setFilter([...rs.data]);
    //             } else {
    //                 message.error(rs.msg);
    //             }
    //             */
    //         } catch (err) {
    //             message.error(err);
    //         }
    //     }

    //     findByFilter();
    // }, [filter, folders]);