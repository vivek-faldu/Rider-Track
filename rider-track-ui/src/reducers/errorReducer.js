/**
 * reducer for errors in authentication functionality.
 * Author: Sai Saran Kandimalla
 * Task: 58
 * Date: 10/10/2019
 * referred from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
 */

import { FETCH_ERRORS } from '../actions/actionTypes';

const defaultState = {};

const errorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
