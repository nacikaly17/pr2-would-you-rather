export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}


export function formatQuestion(question, users, loggedInUser) {
    const { id, author, optionOne, optionTwo } = question
    const { name, avatarURL } = users[question.author]
    const answer = users[loggedInUser].answers[id];
    const votesForOptionOne = Object.keys(optionOne.votes).length
    const votesForOptionTwo = Object.keys(optionTwo.votes).length
    return {
        id,
        name,
        author,
        avatar: avatarURL,
        optionOneText: optionOne.text,
        optionTwoText: optionTwo.text,
        answer: answer
            ? answer
            : null,
        votesForOptionOne: votesForOptionOne,
        votesForOptionTwo: votesForOptionTwo,
        totalVotes: votesForOptionOne + votesForOptionTwo,
    }
}
export function formatUser(users, uid) {
    const user = users[uid];
    const numberOfCreatedQuestions = user.questions.length
    const numberOfAnswers = Object.keys(user.answers).length
    const score = numberOfAnswers + numberOfCreatedQuestions;

    return {
        uid,
        name: user.name,
        avatar: user.avatarURL,
        numberOfCreatedQuestions,
        numberOfAnswers,
        score
    }
}
