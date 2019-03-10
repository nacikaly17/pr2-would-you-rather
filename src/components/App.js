import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import VotingResult from './VotingResult'
import LeaderBoard from './LeaderBoard'
import Logout from './Logout'
import NotFound from './NotFound';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Header />
          <div className='container'>
            {this.props.loading === true
              ? <div>
                <Switch>
                  <Route path='/' exact component={SignIn} />
                  <Route path='/signup' exact component={SignUp} />
                  <Route path='*' component={NotFound} />
                </Switch>
              </div>
              : <div>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/questions/:question_id' component={QuestionPage} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path='/votingResult/:id' component={VotingResult} />
                  <Route path='/leaderboard' component={LeaderBoard} />
                  <Route path='/logout' component={Logout} />
                  <Route path='*' component={NotFound} />
                </Switch>
              </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ loggedInUser }) {
  return {
    loading: loggedInUser === null
  }
}

export default connect(mapStateToProps)(App)