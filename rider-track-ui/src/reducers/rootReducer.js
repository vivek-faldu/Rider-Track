/**
 * The root reducer that combines all the reducers for application
 * Author: Sai Saran Kandimalla
 * Task: 58
 * Date: 10/10/2019
 */

import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducers';
import errorReducer from './errorReducer';

export default combineReducers({
    authentication: authenticationReducer,
    error: errorReducer,
});
