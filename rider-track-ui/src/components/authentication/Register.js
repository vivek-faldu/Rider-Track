/* eslint-disable react/destructuring-assignment */
/**
 * Component that renders registration form on the frontend.
 * Author: Sai Saran Kandimalla
 * Task No: 58
 * Date: 10/10/2019
 * Referred from: https://material-ui.com/components/dialogs/
 *                https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, FormControlLabel, Checkbox
    } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            registrationOpen: false,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            is_admin: false
        };
    }

    handleRegistrationOpen = () => {
        this.setState({ registrationOpen: true });
    };

    handleRegistrationClose = () => {
        this.setState({ registrationOpen: false });
    };

    handleCheckBox = (event) => {
        this.setState({
            is_admin: event.target.checked
        });
    }

    onRegisterSubmit = () => {
        const addUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            is_admin: this.state.is_admin
        };

        console.log(addUser);
    }

    onTextChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        const { errors } = this.state;

        return (
          <span>
            <Button className="menu_button" color="inherit" onClick={this.handleRegistrationOpen}>Sign Up</Button>
            <div>
              <Dialog
                open={this.state.registrationOpen}
                onClose={this.handleRegistrationClose}
                aria-labelledby="rt-form-dialog-title"
                className="rt-registration-form"
              >
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please sign up using the below form. Note that password should be 8-30 characters long.
                  </DialogContentText>
                  <div className="row">
                    <div className="col-md-12">
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={this.state.name}
                        fullWidth
                        required
                        onChange={this.onTextChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        value={this.state.email}
                        fullWidth
                        required
                        onChange={this.onTextChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        fullWidth
                        required
                        onChange={this.onTextChange}
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-12">
                      <TextField
                        autoFocus
                        margin="dense"
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={this.state.confirmPassword}
                        fullWidth
                        required
                        onChange={this.onTextChange}
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-12">
                      <FormControlLabel
                        control={<Checkbox checked={this.state.is_admin} onChange={this.handleCheckBox} value={this.state.is_admin} />}
                        label="Are You Administrator?"
                      />
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color="primary" onClick={this.onRegisterSubmit}>
                    Register
                  </Button>
                  <Button variant="contained" color="secondary" onClick={this.handleRegistrationClose}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </span>
        );
    }
}

export default Register;
