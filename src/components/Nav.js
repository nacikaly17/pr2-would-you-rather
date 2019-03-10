import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatUser } from '../utils/helpers'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'reactstrap';

class Nav extends Component {

    render() {

        const { user } = this.props

        if (user === null) {
            return <p>This User doesn't exist</p>
        }

        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                    <li>
                        <Row>
                            <Col xs="auto">
                                <p className="text-primary">Hello {user.name}</p>
                            </Col>
                            <Col xs="3">
                                <img
                                    src={user.avatar}
                                    alt={`Avatar of ${user.name}`}
                                    className='avatarLoggedInUser'
                                />
                            </Col>
                        </Row>
                    </li>
                    <li>
                        <NavLink to='/logout' activeClassName='active'>
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>

        )
    }
}

function mapStateToProps({ loggedInUser, users }) {
    const user = users[loggedInUser];
    return {
        user: user
            ? formatUser(users, loggedInUser)
            : null
    }
}

export default connect(mapStateToProps)(Nav)