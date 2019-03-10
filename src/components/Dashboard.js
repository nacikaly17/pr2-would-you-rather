import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class Dashboard extends Component {


    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    filterQuestionIds = (props, answered) => {
        const filteredQuestionIds = answered === true
            ? props.questionIds.filter((c) => (
                props.users[props.loggedInUser].answers[c]
            ))
            : props.questionIds.filter((c) => (
                !props.users[props.loggedInUser].answers[c]
            ));
        return filteredQuestionIds;
    }

    render() {

        let unansweredQuestionIds = this.filterQuestionIds(this.props, false);
        let answeredQuestionIds = this.filterQuestionIds(this.props, true);

        return (
            <div>
                <h3 className="center">Questions</h3>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Unanswered
                            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Answered
                            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <ul >
                                    {unansweredQuestionIds.map((id) => (
                                        <li key={id}>
                                            <Question id={id}></Question>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <ul >
                                    {answeredQuestionIds.map((id) => (
                                        <li key={id}>
                                            <Question id={id}></Question>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>

        )
    }

}

function mapStateToProps({ loggedInUser, users, questions }) {
    //console.log(questions);
    return {
        loggedInUser,
        users,
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}
export default connect(mapStateToProps)(Dashboard)
