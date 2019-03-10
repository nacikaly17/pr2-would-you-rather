import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../images/logo-thumb.png';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';
import ImageInput from '../utils/ImageInput'
import { handleSignUp } from '../actions/users'
import { Redirect } from 'react-router-dom'
import serializeForm from 'form-serialize'

class SignUp extends Component {

    state = {
        name: '',
        uid: '',
        toHome: false,
        userexists: false
    }
    handleNameChange = (e) => {
        const name = e.target.value
        this.setState(() => ({
            name
        }))
    }
    handleUidChange = (e) => {
        const uid = e.target.value
        this.setState(() => ({
            uid
        }))
        const fuids = this.props.userIds.filter((c) => c === this.state.uid)
        if (fuids.length > 0) {
            this.setState(() => ({
                userexists: true
            }))
        } else {
            this.setState(() => ({
                userexists: false
            }))
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { name, uid } = this.state
        const { dispatch } = this.props

        const values = serializeForm(e.target, { hash: true })
        dispatch(handleSignUp(uid, name, values.avatarURL))

        this.setState(() => ({
            name: '',
            uid: '',
            toHome: true,
        }))

    }

    render() {

        const { name, uid, toHome, userexists } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div className='question-container center'>
                <p>Please sign up to continue</p>
                <div className='new-question'>
                    <div>
                        <img src={logo} alt="Logo" />
                        <h3>Sign Up</h3>
                    </div>
                    <div >
                        <form onSubmit={this.handleSubmit} className='create-user-form'>
                            <ImageInput
                                className='create-user-avatar-input'
                                name='avatarURL'
                                maxHeight={64}
                            />
                            <div className='create-user-details'>
                                <input
                                    type='text'
                                    name='uid'
                                    value={uid}
                                    placeholder='User ID'
                                    onChange={this.handleUidChange}
                                    maxLength={80}
                                />
                                <input
                                    type='text'
                                    name='name'
                                    value={name}
                                    placeholder='Name'
                                    onChange={this.handleNameChange}
                                    maxLength={80}
                                />
                                <Button
                                    color="primary" size="sm"
                                    type="submit"
                                    disabled={userexists && name !== "" && uid !== ""}
                                >Sign Up User</Button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <Link to={`/`}>
                            <p>You have an account? Sign in here →</p>
                        </Link>
                        <div>
                            {userexists === true && (
                                <div className='user-exists'>
                                    <p>User exists</p>
                                </div>
                            )}
                        </div>
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
export default connect(mapStateToProps)(SignUp)