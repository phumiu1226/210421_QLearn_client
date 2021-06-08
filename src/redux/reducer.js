import { combineReducers } from 'redux'
import { SAVE_USER_INFO, REMOVE_USER_INFO } from './action_types'
import localStorageUtils from '../utils/localStorageUtils'


/* 
    these function will start before src/index.js
    so we can check localStorageUtils first , and assign init value if it had 
*/

const initUserState = localStorageUtils.getUser();
//this user will send to combineReducers , and connect(state) will get it
function user(state = initUserState, action) {
    switch (action.type) {
        case SAVE_USER_INFO:
            return state = action.data;
        case REMOVE_USER_INFO:
            return state = action.data;
        default:
            return state;
    }

}



export default combineReducers({ user })