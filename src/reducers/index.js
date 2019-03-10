import { combineReducers } from 'redux';
import loggedInUser from './loggedInUser';
import users from './users';
import questions from './questions';
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    loggedInUser,
    users,
    questions,
    loadingBar: loadingBarReducer,
})