// USERS REDUCER
import auth from '../../helpers/auth.js'

// ACTIONS

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'

// ACTION CREATORS

const authUser = (uid) => ({
  type: AUTH_USER,
  uid
})

const unauthUser = () => ({
  type: UNAUTH_USER
})

const fetchingUser = () => ({
  type: FETCHING_USER
})

const fetchingUserFailure = (error) => {
  console.warn(error)
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.'
  }
}

const fetchingUserSuccess = (uid, user, timestamp) => ({
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp
})

export const fetchAndHandleAuthedUser = () => {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth()
      .then((user) => dispatch(fetchingUserSuccess(user.uid, user, Date.now())))
      .then((user) => dispatch(authUser(user.uid)))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

// REDUCERS

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

function user (state = initialUserState, action) {

  switch (action.type) {

    case FETCHING_USER_SUCCESS :
      return Object.assign({}, state, {
        info: action.user,
        lastUpdated: action.timestamp,
      })
    default :
      return state
  }
}


/////////


const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

export default function users (state = initialState, action) {

  switch (action.type) {

    case AUTH_USER :
      return Object.assign({}, state, {
        isAuthed: true,
        authedId: action.uid,
      })

    case UNAUTH_USER :
      return Object.assign({}, state, {
        isAuthed: false,
        authedId: '',
      })

    case FETCHING_USER:
      return Object.assign({}, state, {
        isFetching: true,
      })

    case FETCHING_USER_FAILURE:

      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })

    case FETCHING_USER_SUCCESS:
      return action.user === null
        ?
          Object.assign({}, state, {
            isFetching: false,
            error: '',
          })
        : Object.assign({}, state, {
            isFetching: false,
            error: '',
            [action.uid]: user(state[action.uid], action),
          // Here were calling the user action creator
          // Recieves a section of state, and an action
          // Creating reducer composition
        })
    default :
      return state
  }
}
