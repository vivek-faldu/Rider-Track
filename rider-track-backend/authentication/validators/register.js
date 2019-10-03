/**
 * The backend logic for user registration
 * Author: Sai Saran Kandimalla
 * Date: 10/03/2019
 * Task : #59
 * referred from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */
const isEmpty = require('is-empty');
const validator = require('validator');
const emptyString = "";

const validateRegistrationInput = (userData) => {
    let errors = {};
    // convert empty value to empty string to use validator functions
    userData.name = isEmpty(userData.name)?emptyString:userData.name;
    userData.email = isEmpty(userData.email)?emptyString:userData.email;
    userData.password = isEmpty(userData.email)?emptyString:userData.password;
    userData.confirmPassword = isEmpty(userData.confirmPassword)? emptyString: userData.confirmPassword;

    if(validator.isEmpty(userData.name)) {
        errors.name = "name is required";
    }
    if(validator.isEmpty(userData.email) || !validator.isEmail(userData.email)) {
        errors.email = "email field is mandatory and email should be in valid format";
    }
    if(validator.isEmpty(userData.password)) {
        errors.password = "password should not be empty";
    }
    if(validator.isEmpty(userData.confirmPassword)) {
        errors.confirmPassword = "please confirm password";
    }
    if(!validator.equals(userData.password, userData.confirmPassword)) {
        errors.password = "passwords must match";
    }
    if(!validator.isLength(userData.password, {min: 8, max: 30})){
        errors.password = "length of password should be in between 8-30";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRegistrationInput;