import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSignIn } from '../actions/loggedInUser'
import { Redirect } from 'react-router-dom'
import { fakeAuth } from '../utils/helpers'

class Logout extends Component {

    handleSubmit = () => {
        const { dispatch } = this.props
        dispatch(handleSignIn(null))
        fakeAuth.signout(() => this.props.history.push('/'))
    }

    render() {
        this.handleSubmit();
        return <Redirect to='/' />
    }
}


export default connect()(Logout)