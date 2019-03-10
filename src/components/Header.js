import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap';
import logo from '../images/logo-thumb.png';
import Nav from './Nav';

class Header extends Component {


    render() {

        const { loggedInUser } = this.props

        return (
            <div className="header">
                <Row>
                    <Col xs="3">
                        <img src={logo} alt="Logo" />
                    </Col>
                    <Col xs="auto">
                        <h1>Would You Rather?</h1>
                    </Col>
                </Row>
                {loggedInUser === null
                    ? null
                    : <Nav />}

            </div>
        )
    }
}

function mapStateToProps({ loggedInUser }) {

    return {
        loggedInUser
    }
}

export default connect(mapStateToProps)(Header)