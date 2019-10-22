/**
 * Actions for authentication
 * Author: Sai Saran Kandimalla
 * Task: 58
 * Date: 10/10/2019
 * Referred from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
 */
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { FETCH_ERRORS, UPDATE_CURRENT_USER, LOAD_USER, REGISTER_USER, CANCEL_LOGIN_ATTEMPT } from './actionTypes';
import { HOME_ROUTE } from '../RouteConstants';

export const registerUser = (userData) => (dispatch) => {

    axios.post('/api/authentication/register', userData).then((response) => {
        dispatch({
            type: REGISTER_USER,
            payload: true,
        });
    }).catch((error) => {
        dispatch({
            type: FETCH_ERRORS,
            payload: error.response.data,
        });
    });
};

export const updateCurrentUser = (decode) => {
    return {
        type: UPDATE_CURRENT_USER,
        payload: decode,
    };
};

export const LoadUser = () => {
    return {
      type: LOAD_USER,
    };
};

export const loginUser = (userData) => (dispatch) => {
    axios.post('/api/authentication/login', userData).then((response) => {
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        const decode = jwt_decode(token);
        dispatch(updateCurrentUser(decode));
    }).catch((error) => {
        dispatch({
            type: FETCH_ERRORS,
            payload: error.response.data,
        });
    });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    dispatch(updateCurrentUser({}));
    setTimeout(() => {}, 1000);
    window.location.href = HOME_ROUTE;
};

export const cancelLoginAttempt = (data) => (dispatch) => {
    dispatch({
        type: CANCEL_LOGIN_ATTEMPT,
        payload: data,
    });
};
