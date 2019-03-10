import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSignIn } from '../actions/loggedInUser'
import { Redirect } from 'react-router-dom'

class Logout extends Component {

    handleSubmit = () => {
        const { dispatch } = this.props
        dispatch(handleSignIn(null))
    }

    render() {
        this.handleSubmit();
        return <Redirect to='/' />
    }
}


export default connect()(Logout)