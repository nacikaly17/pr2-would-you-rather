import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserScore from './UserScore';
import { formatUser } from '../utils/helpers'


class LeaderBoard extends Component {


    render() {

        const { userIds } = this.props
        return (
            <div>
                <h3 className="center">User-Scores</h3>
                <ul >
                    {userIds.map((uid) => (
                        <li key={uid}>
                            <UserScore uid={uid}></UserScore>
                        </li>
                    ))}
                </ul>
            </div>

        )
    }

}

function mapStateToProps({ users }) {

    return {

        userIds: Object.keys(users).map((uid) => (formatUser(users, uid)))
            .sort((a, b) => b.score - a.score).map((c) => (c.uid))

    }
}
export default connect(mapStateToProps)(LeaderBoard)
