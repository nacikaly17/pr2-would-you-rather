import { saveUser } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_USER = 'ADD_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';


export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

function addUser(user) {
    return {
        type: ADD_USER,
        user,
    }
}

export function handleSignUp(uid, name, avatarURL) {
    return (dispatch) => {

        dispatch(showLoading())

        return saveUser({
            uid,
            name,
            avatarURL,
        })
            .then((user) => { dispatch(addUser(user)) })
            .then(() => dispatch(hideLoading()))
    }
}