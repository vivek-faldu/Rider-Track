/**
 * passport to configure the JWT authentication strategy
 * Author: Sai Saran Kandimalla.
 * Date: 10/03/2019.
 * Task No: 59.
 * referred from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */
const mongoose = require('mangoose');
const userModel = mongoose.model('users');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

