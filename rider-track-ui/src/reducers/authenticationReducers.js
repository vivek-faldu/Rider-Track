/**
 * reducer that manages the state of authentication
 * Author: Sai Saran Kandimalla
 * Task: #58
 * Date: 10/10/2019
 * Referred from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
 */
import { LOAD_USER, UPDATE_CURRENT_USER, REGISTER_USER, CANCEL_LOGIN_ATTEMPT } from '../actions/actionTypes';

const isEmpty = require('is-empty');

const defaultState = {
    isAuthenticated: false,
    registrationComplete: false,
    user: {},
    loading: false,
    loginAttemptCancelled: false
};

const authenticationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case REGISTER_USER:
            return {
                ...state,
                registrationComplete: action.payload
            };
        case CANCEL_LOGIN_ATTEMPT:
            return {
                ...state,
                loginAttemptCancelled: action.payload,
            };
        default:
            return state;
     }
};

export default authenticationReducer;
