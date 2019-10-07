/**
 * Unit tests for authentication related methods and validations
 * Author: Sai Saran Kandimalla
 * Task: #59
 * Date: 10/07/2019
 */

let mongoose = require("mongoose");
let user = require('../models/users');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

// Modules to be tested
let loginValidator = require('../authentication/validators/login');
let registrationValidator = require('../authentication/validators/register');

// constants to be used 
const testEmail = 'test@test.com';
const testPassword = '12345678';
const testConfirmPassword = '12345678';
const testUserName = "user name";

// tests for validator functions.
describe('test login validator with valid input', () => {
    it('it should return is Valid paramter as true', () => {
        const userData = {
            'email': testEmail,
            'password': testPassword
        }
        
        const validatorOutput = loginValidator(userData)
        validatorOutput.isValid.should.be.true;
    })
});

describe('test login validator with invalid input', () => {
    it('it should return is Valid paramter as false', () => {
        const userData = {
            'email': '',
            'password': testPassword
        }
        
        const validatorOutput = loginValidator(userData)
        validatorOutput.isValid.should.be.false;
    })
});

describe('test registration validator with valid input', () => {
    it('it should return is Valid paramter as true', () => {
        const userData = {
            'email': testEmail,
            'password': testPassword,
            'confirmPassword': testConfirmPassword,
            'username': testUserName
        }
        
        const validatorOutput = registrationValidator(userData)
        validatorOutput.isValid.should.be.true;
    })
});

describe('test registration validator when no username field is sent', () => {
    it('it should return an error message saying username is required', () => {
        const userData = {
            'email': testEmail,
            'password': testPassword,
            'confirmPassword': testConfirmPassword,
        }
        
        const validatorOutput = registrationValidator(userData)
        validatorOutput.isValid.should.be.false;
        validatorOutput.errors.name.should.equal("name is required");
    })
});

/**
 * epoch times have been used to add unique username and password for registration
 * everytime we run tests
 */
const now = new Date()  
const secondsSinceEpoch = Math.round(now.getTime() / 1000) 

const testEmail2 = 'test' + secondsSinceEpoch + '@test.com';
const testPassword2 = secondsSinceEpoch.toString();
const testConfirmPassword2 = secondsSinceEpoch.toString();
const testUserName2 = 'user' + secondsSinceEpoch; 

// Tests for login and register api calls
describe("testing registration post API Call", () => {
    it("should return the success json response with user details as body", () => {
        let userData = {
            'email': testEmail2,
            'password': testPassword2,
            'confirmPassword': testConfirmPassword2,
            'username': testUserName2,
            'is_admin' : false 
        }

        chai.request(server)
            .post("/api/authentication/register")
            .send(userData)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.email.should.equal(testEmail2);
            });
    });
});

describe("testing registration with already existing email", () => {
    it("should return the error response ", () => {
        let userData = {
            'email': testEmail,
            'password': testPassword2,
            'confirmPassword': testConfirmPassword2,
            'username': testUserName2,
            'is_admin' : false 
        }

        chai.request(server)
            .post("/api/authentication/register")
            .send(userData)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.email.should.equal("email already exists")
            });
    });
});

describe("testing login API call with non-existant email ID", () => {
    it("should return error response saying email not found", () => {
        let userData = {
            'email': 'notexist@email.com',
            'password': '12312434r3'
        }

        chai.request(server)
            .post("/api/authentication/login")
            .send(userData)
            .end((error, response) => {
                response.should.have.status(404);
                response.body.emailNotFound.should.equal("Email not found");
            });
    });
});

describe("testing login API call with valid email ID and password", () => {
    it("should return a 200 status code", () => {
        let userData = {
            'email': testEmail,
            'password': testPassword
        }

        chai.request(server)
            .post("/api/authentication/login")
            .send(userData)
            .end((error, response) => {
                response.should.have.status(200);
            });
    });
});