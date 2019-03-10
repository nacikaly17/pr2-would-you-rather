import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form, FormGroup } from 'reactstrap';
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {


    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false,
    }
    handleChange1 = (e) => {
        const optionOneText = e.target.value
        this.setState(() => ({
            optionOneText
        }))
    }
    handleChange2 = (e) => {
        const optionTwoText = e.target.value
        this.setState(() => ({
            optionTwoText
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOneText, optionTwoText))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true,
        }))
    }


    render() {

        const { optionOneText, optionTwoText, toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }
        return (
            <div className='question-container'>
                <div>
                    <h3 className="center">Create new Question</h3>
                </div>
                <div className='new-question'>
                    <div className='question-info'>
                        <span>Complete the question</span>
                        <p className="center">Would you rather...</p>
                        <Form>
                            <FormGroup>
                                <Input type="textarea"
                                    name="opt1"
                                    id="opt1"
                                    value={optionOneText}
                                    onChange={this.handleChange1}
                                    className='textarea'
                                    maxLength={80}
                                    placeholder="option one "
                                />
                                <p className="center">or...</p>
                                <Input type="textarea"
                                    name="opt2"
                                    id="opt2"
                                    value={optionTwoText}
                                    onChange={this.handleChange2}
                                    className='textarea'
                                    maxLength={80}
                                    placeholder="option two "
                                />
                            </FormGroup>
                            <Button
                                color="primary" size="sm"
                                type="submit"
                                onClick={this.handleSubmit}
                                disabled={optionOneText === '' || optionTwoText === ''}
                            >Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(NewQuestion)