import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Input, Progress, Tooltip, Row, Col } from 'reactstrap';
import TiTick from 'react-icons/lib/ti/tick'

class VotingResult extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {

        const { question } = this.props

        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const {
            name,
            avatar,
            optionOneText,
            optionTwoText,
            answer,
            votesForOptionOne,
            votesForOptionTwo,
            totalVotes
        } = question

        const opt1 = "Would you rather " + optionOneText;
        const opt2 = "Would you rather " + optionTwoText;
        const vot1 = votesForOptionOne + " out of " + totalVotes + " votes ";
        const vot2 = votesForOptionTwo + " out of  " + totalVotes + " votes ";
        return (
            <div className='question-container'>
                <div>
                    <h5 className="center">Asked by "{name}"</h5>
                </div>
                <div className='question'>
                    <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <div className='voting-result'>
                            <p className="center">Voting Result: </p>
                            <div className='voting-result1'>
                                <Row>
                                    <Col xs="11">
                                        <Input className="textarea" type="textarea" placeholder={opt1} disabled />
                                    </Col>
                                    <Col xs="1">
                                        {answer === 'optionOne'
                                            ? (
                                                <div>
                                                    <TiTick className='yourvote-icon' id="Tooltip1" />
                                                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="Tooltip1" toggle={this.toggle}>
                                                        Your Vote
                                            </Tooltip>
                                                </div>
                                            )
                                            : <span></span>}
                                    </Col>
                                </Row>
                                <div className='progress-result'>
                                    <Progress value={votesForOptionOne * 100 / totalVotes} />
                                    <div className="text-center">{vot1}</div>
                                </div>
                            </div>
                            <div className='voting-result2'>
                                <Row>
                                    <Col xs="11">
                                        <Input className="textarea" type="textarea" placeholder={opt2} disabled />
                                    </Col>
                                    <Col xs="1">
                                        {answer === 'optionTwo'
                                            ? (
                                                <div>
                                                    <TiTick className='yourvote-icon' id="Tooltip2" />
                                                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="Tooltip2" toggle={this.toggle}>
                                                        Your Vote
                                            </Tooltip>
                                                </div>
                                            )
                                            : <span></span>}
                                    </Col>
                                </Row>
                                <div className='progress-result'>
                                    <Progress value={votesForOptionTwo * 100 / totalVotes} />
                                    <div className="text-center">{vot2}</div>
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
    const { id } = props.match.params
    const question = questions[id];

    return {
        id,
        loggedInUser,
        question: question
            ? formatQuestion(question, users, loggedInUser)
            : null
    }
}

export default connect(mapStateToProps)(VotingResult)