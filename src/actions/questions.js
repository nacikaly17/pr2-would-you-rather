import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const QUESTION_ANSWER = 'QUESTION_ANSWER'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}


function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { loggedInUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: loggedInUser,
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

function questionAnswer({ qid, answer, authedUser }) {
    return {
        type: QUESTION_ANSWER,
        qid,
        answer,
        authedUser
    }
}

export function handleQuestionAnswer(info) {
    return (dispatch) => {

        dispatch(questionAnswer(info))

        return saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in handleQuestionAnswer: ', e)
                dispatch(questionAnswer(info))
                alert('There was an error answering the question. Try again.')
            })
    }
}


