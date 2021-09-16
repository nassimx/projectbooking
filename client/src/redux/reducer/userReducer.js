// import {
//   LOGIN,
//   LOGIN_FAIL,
//   LOGIN_SUCCES,
//   REGISTER,
//   REGISTER_FAIL,
//   REGISTER_SUCCES,

// } from '../actionTypes/';

let userState;

if (window.localStorage.getItem('auth')) {
  userState = JSON.parse(window.localStorage.getItem('auth'));
} else {
  userState = null; // {}
}

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return action.payload;
    default:
      return state;
  }
};

// const initialState = {
//   loading: false,
//   token: null,
//   users: null,
//   errors: null,
// };

// const userReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case REGISTER:
//       return { ...state, loading: true };
//     case REGISTER_SUCCES:
//       return { ...state, loading: false, users: payload };
//     case REGISTER_FAIL:
//       return { ...state, loading: false, errors: payload };
//     case LOGIN:
//       return { ...state, loading: true };
//     case LOGIN_SUCCES:
//       return { ...state, loading: false, token: payload };
//     case LOGIN_FAIL:
//       return { ...state, loading: false, errors: payload };

//     default:
//       return state;
//   }
// };
