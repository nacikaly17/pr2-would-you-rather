import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleQuestionAnswer } from '../actions/questions'
import { Button } from 'reactstrap';
import { Form, FormGroup, CustomInput, } from 'reactstrap';
import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeRadio: '',
            toVotingResult: false,
        };
    }

    toggle(radio) {
        this.setState({
            activeRadio: radio
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch, loggedInUser, id } = this.props
        dispatch(handleQuestionAnswer({
            qid: id,
            answer: this.state.activeRadio,
            authedUser: loggedInUser
        }))
    }

    handleVotingResult = (e) => {
        e.preventDefault()

        this.setState(() => ({
            toVotingResult: true,
        }))
    }

    render() {

        const { questions, users, loggedInUser, id } = this.props

        if (this.props.loggedInUser === null) {
            console.log("first login")
            this.props.history.push('/')
            return <Redirect to={`/`} />
        }

        const qIds = Object.keys(this.props.questions)
        const fqids = qIds.filter((c) => c === id)
        if (fqids.length === 0) {
            console.log("Page Not NotFound")
            return <Redirect to={`/*`} />
        }

        const question = formatQuestion(questions[id], users, loggedInUser)

        const { toVotingResult } = this.state

        const {
            name,
            avatar,
            optionOneText,
            optionTwoText,
            answer
        } = question

        if (toVotingResult === true) {
            return <Redirect to={`/votingResult/${id}`} />
        }

        return (
            <div className='container'>
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
                                <div>
                                    {answer === null ? (<Form>
                                        <FormGroup>
                                            <CustomInput type="radio" id="opt1" name="customRadio" label={optionOneText} onClick={() => { this.toggle('optionOne'); }} />
                                            <CustomInput type="radio" id="opt2" name="customRadio" label={optionTwoText} onClick={() => { this.toggle('optionTwo'); }} />
                                            <Button color="primary" size="sm" onClick={this.handleSubmit} disabled={this.state.activeRadio === ''} >Submit</Button>
                                        </FormGroup>
                                    </Form>)
                                        : (<Form>
                                            <FormGroup>
                                                <CustomInput type="radio" id="opt1" name="customRadio" label={optionOneText} checked={answer === "optionOne"} disabled />
                                                <CustomInput type="radio" id="opt2" name="customRadio" label={optionTwoText} checked={answer === "optionTwo"} disabled />
                                                <Button color="primary" size="sm" onClick={this.handleVotingResult} >View Voting-Result</Button>
                                            </FormGroup>
                                        </Form>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ loggedInUser, users, questions }, props) {
    const { question_id } = props.match.params
    return {
        id: question_id,
        loggedInUser,
        users,
        questions,
    }
}

export default connect(mapStateToProps)(QuestionPage)