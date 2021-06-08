import { SAVE_USER_INFO, REMOVE_USER_INFO } from './action_types'
import localStorageUtils from '../utils/localStorageUtils'


export const saveUser = (user) => {
    localStorageUtils.saveUser(user); //save to local
    const action = { type: SAVE_USER_INFO, data: user } //user click login and send dispatch action to reducer
    return action;
}


export const removeUser = () => {
    localStorageUtils.deleteUser(); //delete from local
    const action = { type: REMOVE_USER_INFO, data: null } //user click login and send dispatch action to reducer
    return action;
}