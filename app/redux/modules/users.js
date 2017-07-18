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

// updates state to isFetching: true
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
    dispatch(fetchingUser()) // updates state to isFetching: true
    return auth() // calls the AUTH function, which returns a user... (whoamI)
      .then((user) => dispatch(fetchingUserSuccess(user.uid, user, Date.now())))
      // changes isFetching back to false
        // if null, resets error to "" empty string, and returns current state.
        // If not null eror is reset,  add user as key on state object as  username(uid), with an object as its value
      /*
        username: {
          lastUpdated: Date.NOW()
          info: action.user {}
        }
      */
      .then((user) => dispatch(authUser(user.uid))) // changes isAuthed to true, and userID goes on state as authedID.
      .catch((error) => dispatch(fetchingUserFailure(error))) // is an error, calls fetching user failure, throws an error and put error on state
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

          // We call FETCHING USER SUCCESS from inside fetchAndHandleAuthUser
          // we calling the user()
          // Recieves a section of state, and an action
          // We are creating reducer composition
          // WHAT IS GOING ON HERE w last part.... need to know what this function is doing more clearly...
        })
    default :
      return state
  }
}

// const initialUserState = {
//   info: {
//     name: '',
//     uid: '',
//     avatar: '',
//   },
// }

// function user (state = initialUserState, action) {

//   switch (action.type) {

//     case FETCHING_USER_SUCCESS :
//       return Object.assign({}, state, {
//         info: action.user // passing the user object
//       })
//     default :
//       return state
//   }
// }

