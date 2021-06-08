import ajax from './ajax';
import axios from 'axios';

// const baseURL = 'http://localhost:3000'; //co the nhu vay
export const baseURL = ''; //cung co the nhu vay vi dang dung axios

//-------------login ------------------------------
export const reqLogin = (username, password) => ajax(baseURL + '/login', { username, password }, 'POST');


//-------------User ------------------------------
//Insert
export const reqAddUser = (user) => ajax(baseURL + '/user/add', user, 'POST');




//-------------Folder ------------------------------
//get Folder by parentId
export const reqFolder = (parentId = 0, userId = null) => ajax(baseURL + '/folder/list', { parentId, userId });

//add Folder 
export const reqAddFolder = (folder) => ajax(baseURL + '/folder/add', folder, 'POST');

//update Folder
export const reqUpdateFolder = (folder) => ajax(baseURL + '/folder/update?_method=PUT', folder, 'POST');

//delete Folder - :slug  (/folder/delete/:id)
export const reqDeleteFolder = (folderId) => ajax(baseURL + '/folder/delete/' + folderId + '?_method=DELETE', {}, 'POST');

//find title by text
export const reqfindFoldersbyTitle = (q, userId = null) => ajax(baseURL + '/folder/find', { q, userId })


//-------------Study Sets ------------------------------

export const reqStudySets = (pageNum, pageSize) => ajax(baseURL + '/studysets/list', { pageNum, pageSize });


//delete Study Set - :slug  (/studysets/delete/:id)
export const reqDeleteStudySet = (studySetId) => ajax(baseURL + '/studysets/delete/' + studySetId + '?_method=DELETE', {}, 'POST');

//get study set words ,  (/studysets/detail/6099061c292ddc2b6c195bf5?pageSize=10&pageNum=1)
export const reqStudySetDetail = (studySetId, pageSize, pos) => ajax(baseURL + '/studysets/detail/' + studySetId, { pageSize, pos });

//add word [PUT]
export const reqAddWord = (_id, word, description, types, img) => ajax(baseURL + '/studysets/add-word?_method=PUT', { _id, word, description, types, img }, 'POST');

//edit word [PUT]
export const reqEditWord = (_id, wordId, word, description, img, types) => ajax(baseURL + '/studysets/edit-word?_method=PUT', { _id, wordId, word, description, img, types }, 'POST');

//remove word [PUT]
export const reqRemoveWord = (_id, wordId) => ajax(baseURL + '/studysets/remove-word?_method=PUT', { _id, wordId }, 'POST');

//--------------------------------Upload - Delete File-----------------------------------------------

//delete img
export const reqDeleteImg = (name) => ajax(baseURL + '/upload/img/delete', { name }, 'POST');


//upload img
export const reqUploadImg = async (formData) => {
    try {
        const rs = await axios({
            method: "post",
            url: "/upload/img",
            data: formData,
            headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` },
        })
        return rs.data;
    } catch (err) {
        console.log(err.message);
    }
}