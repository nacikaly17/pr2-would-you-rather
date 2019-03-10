import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { setLoggedInUser } from '../actions/loggedInUser';
import { showLoading, hideLoading } from 'react-redux-loading'

//const LOGGEDINUSER_ID = 'sarahedo';
const LOGGEDINUSER_ID = null;

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(setLoggedInUser(LOGGEDINUSER_ID));
                dispatch(hideLoading())
            })
    }
}

