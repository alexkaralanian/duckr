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
  }

  handleAuth() {
    this.props.fetchAndHandleAuthedUser()
  }

  render(){

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
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  console.log('STATE', state)
  return {
    isFetching: state.isFetching,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AuthenticateContainer)
