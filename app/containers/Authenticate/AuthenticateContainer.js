import React from 'react'
import Authenticate from '../../components/Authenticate/Authenticate'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from '../../redux/modules/users'


class AuthenticateContainer extends React.Component {

  constructor(props){
    super(props)

    this.handleAuth = this.handleAuth.bind(this)
    console.log(props)
  }

  handleAuth() {
    this.props.fetchAndHandleAuthedUser()
  }

  render(){

    { /* Is receiving the STATE as props isFetching + error and passing down to child component.

    Is receiving fetchAndHandleAuthuser function as props from
    redux (we connect to Redux Store below) */
    }

    { /* Passing isFetching, error, and onAuth as props to
    ../../components/Authenticate/Authenticate */
    }

    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}
      />
    )
  }
}

AuthenticateContainer.propTypes = {
    fetchAndHandleAuthedUser: PropTypes.func.isRequired, // redux thunk
    isFetching: PropTypes.bool.isRequired, // state
    error: PropTypes.string.isRequired, // state
}

const mapStateToProps = (state) => {
  console.log('STATE', state)
  return {
    isFetching: state.isFetching,
    error: state.error
  }
}

// Here we call map state to props to make sure that when we require state in from the reducer that it is 'mapped to state as props!'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators, dispatch)
}

// Here we bind the fecthAndHandle Auth user function

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AuthenticateContainer)
