import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

class Question extends Component {

    render() {

        const { question, id } = this.props

        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const {
            name,
            avatar,
            optionOneText,
            answer
        } = question
        return (
            <div className='question-container'>
                <div>
                    <p className="center">"{name}" asks:</p>
                </div>
                <div className='question'>
                    <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <div>
                            <span>Would you rather...</span>
                            <Input className="textarea" type="textarea" placeholder={optionOneText} disabled />
                            <span>or .. </span>
                            <div>
                                <Link to={`/questions/${id}`}>
                                    {answer === null
                                        ? (
                                            <Button color="primary" size="sm" > Vote</Button>
                                        )
                                        : (
                                            <Button color="primary" size="sm" >View Poll</Button>
                                        )
                                    }
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ loggedInUser, users, questions }, { id }) {

    const question = questions[id]

    return {
        id,
        loggedInUser,
        question: question
            ? formatQuestion(question, users, loggedInUser)
            : null
    }
}

export default connect(mapStateToProps)(Question)