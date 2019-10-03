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

const validateLoginInput = require("../authentication/validators/login");
const validateRegisterInput = require("../authentication/validators/register");

