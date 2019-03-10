import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatUser } from '../utils/helpers'
import { Row, Col, Table } from 'reactstrap';

class UserScore extends Component {


    render() {

        const {
            user,
        } = this.props

        if (user === null) {
            return <p>This User doesn't exist</p>
        }

        const {
            name,
            avatar,
            numberOfCreatedQuestions,
            numberOfAnswers,
            score
        } = user

        return (
            <div className='question-container'>
                <div className='question'>
                    <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <h4 className="center">{name}</h4>
                        <Row>
                            <Col xs="9">
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>Question</th>
                                            <th>Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Answered</td>
                                            <td>{numberOfAnswers}</td>
                                        </tr>
                                        <tr>
                                            <td>Created</td>
                                            <td>{numberOfCreatedQuestions}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs="3">
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="score">
                                                    {score}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }, { uid }) {

    return {
        user: formatUser(users, uid)
    }
}

export default connect(mapStateToProps)(UserScore)