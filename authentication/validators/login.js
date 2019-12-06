/**
 * The backend logic for user login
 * Author: Sai Saran Kandimalla
 * Date: 10/03/2019
 * Task : #59
 * referred from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */
const isEmpty = require('is-empty');
const validator = require('validator');
const emptyString = "";

const validateLoginInput = (userData) => {
    let errors = {};
    
    // convert empty value to empty string to use validator functions
    userData.email = isEmpty(userData.email)?emptyString:userData.email;
    userData.password = isEmpty(userData.email)?emptyString:userData.password;
    
    if(validator.isEmpty(userData.email) || !validator.isEmail(userData.email)) {
        errors.email = "email field is mandatory and email should be in valid format";
    }
    if(validator.isEmpty(userData.password)) {
        errors.password = "password should not be empty";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateLoginInput;