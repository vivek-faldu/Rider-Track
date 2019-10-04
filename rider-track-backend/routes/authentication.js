/**
 * routes for user authentication.
 * Author: Sai Saran Kandimalla
 * Date: 10/03/2019
 * Task: #59
 * referred from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

// validators
const validateLoginInput = require("../authentication/validators/login");
const validateRegistrationInput = require("../authentication/validators/register");

const userModel = require("../models/users");

/**
 * post request for registration
 * @route /api/authentication/register
 * referred from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */
router.post("/register", (request, response) => {
    const {errors, isValid} = validateRegistrationInput(request.body);
    console.log(request.body);
    
    // send 400 error when input given is not valid.
    if(!isValid) {
        return response.status(400).json(errors);
    }

    userModel.findOne({email: request.body.email}).then(user => {
        if(user) {
            return response.status(400).json({email: "email already exists"});
        } else {
            const addUser = new userModel({
                username: request.body.username,
                email: request.body.email,
                password:request.body.password,
                is_admin:request.body.is_admin
            });
            
            // hash password
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(addUser.password, salt, (error, hash) => {
                    if (error) {
                        throw error;
                    }
                    addUser.password = hash;
                    addUser
                        .save()
                        .then(user => response.json(user))
                        .catch(error => console.log(error));
                });
            });
        }
    });
});

/**
 * post request for Login functionality
 * @route /api/authentication/login
 * referred from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */
router.post("/login", (request, response) => {
    const {errors, isValid} = validateLoginInput(request.body);

    // send 400 error when input given is not valid.
    if(!isValid) {
        return response.status(400).json(errors);
    }

    // get user by email
    userModel.findOne({email: request.body.email}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailNotFound: "Email not found" });
        }
        bcrypt.compare(request.body.password, user.password).then(isValidPassword => {
            if(isValidPassword) {
                const payload  = {
                    id: user.id,
                    username: user.username,
                    is_admin: user.is_admin
                };

                jwt.sign(
                    payload,
                    "secret",
                    {
                        expiresIn: 86400
                    },
                    (error, token) => {
                        response.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    }
                );
            } else {
                response.status(400).json({paswordInCorrect: "Password incorrect"});
            }
        });
    });
});

module.exports = router;