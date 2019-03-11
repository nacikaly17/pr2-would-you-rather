import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';
import logo from '../images/logo-thumb.png';
import { handleSignIn } from '../actions/loggedInUser'
import { Link, Redirect } from 'react-router-dom'
import { fakeAuth } from '../utils/helpers'

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);

        this.state = {
            dropdownOpen: false,
            value: "Select User",
            redirectToReferrer: false
        };

    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    select(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            value: event.target.innerText
        });
    }

    handleSubmit = (e) => {

        e.preventDefault()
        const { dispatch } = this.props

        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })

        dispatch(handleSignIn(this.state.value))

    }

    render() {

        const { dropdownOpen, value, redirectToReferrer } = this.state
        const { userIds } = this.props

        const { from } = this.props.location.state || { from: { pathname: '/home' } }

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return (
            <div className='question-container center'>
                <h3>Welcome to the Would You Rather Game!</h3>
                <p>Please sign in to continue</p>
                <div className='new-question'>
                    <div>
                        <img src={logo} alt="Logo" />
                        <h3>Sign In</h3>
                    </div>
                    <div className="signin-form ">
                        <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {this.state.value}
                            </DropdownToggle>
                            <DropdownMenu>
                                <ul >
                                    {userIds.map((uid) => (
                                        <li key={uid}>
                                            <DropdownItem onClick={this.select}>{uid}</DropdownItem>
                                        </li>
                                    ))}
                                </ul>
                            </DropdownMenu>
                        </Dropdown>
                        <p></p>
                        <Button
                            color="primary" size="sm"
                            type="submit"
                            onClick={this.handleSubmit}
                            disabled={value === "Select User"}
                        >Sign In</Button>
                    </div>
                    <div>
                        <Link to={`/signup/`}>
                            <p>Don't have an account yet? Sign up here →</p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}



function mapStateToProps({ loggedInUser, users }) {
    return {
        loggedInUser,
        users,
        userIds: Object.keys(users)
    }
}
export default connect(mapStateToProps)(SignIn)