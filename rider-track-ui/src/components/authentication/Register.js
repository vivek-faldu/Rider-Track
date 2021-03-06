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
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { registerUser, resetRegister } from '../../actions/authenticationAction';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      registrationOpen: false,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      is_admin: false,
      registrationDone: false
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.authentication.registrationComplete) {
      this.setState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        registrationDone: newProps.authentication.registrationComplete,
      });
    }
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors,
      });
    }
  };

  handleRegistrationOpen = () => {
    this.setState({ registrationOpen: true });
  };

  handleRegistrationClose = () => {
    this.setState({ 
      registrationOpen: false,
      registrationDone: false, 
    });
    this.props.resetRegister();
  };

  handleCheckBox = (event) => {
    this.setState({
      is_admin: event.target.checked,
    });
  }

  onRegisterSubmit = (event) => {
    event.preventDefault();
    const addUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      is_admin: this.state.is_admin,
    };

    this.props.registerUser(addUser);
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
        {/* <div> */}
        <Dialog
          open={this.state.registrationOpen}
          onClose={this.handleRegistrationClose}
          aria-labelledby="rt-form-dialog-title"
          className="rt-registration-form"
        >
          <DialogTitle>Register</DialogTitle>
          {!this.state.registrationDone ? (
            <div>
              <DialogContent>
                <DialogContentText>
                  Please sign up using the below form.
                  Note that password should be 8-30 characters long.
                    </DialogContentText>

                {errors && errors.name ? (
                  <p className="rt-auth-error-text">{errors.name}</p>
                ) : null}
                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="username"
                      label="Name"
                      type="text"
                      value={this.state.username}
                      fullWidth
                      required
                      onChange={this.onTextChange}
                    />
                  </div>
                </div>

                {errors && errors.email ? (
                  <p className="rt-auth-error-text">{errors.email}</p>
                ) : null}
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

                {errors && errors.password ? (
                  <p className="rt-auth-error-text">{errors.password}</p>
                ) : null}
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

                {errors && errors.confirmPassword ? (
                  <p className="rt-auth-error-text">{errors.confirmPassword}</p>
                ) : null}
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
                      label="Are you interested in administrating events?"
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
            </div>
          ) : (
              <DialogContent>
                <DialogContentText>
                  Successfully Registered to the application. please click ok to close and login
                  using your new credentials.
                      </DialogContentText>
                <DialogActions>
                  <Button variant="contained" color="primary" onClick={this.handleRegistrationClose}>
                    Ok
                        </Button>
                </DialogActions>
              </DialogContent>
            )}
        </Dialog>
        {/* </div> */}
      </span>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  resetRegister: PropTypes.func.isRequired,
  authentication: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
  errors: state.errors,
});

export default connect(
  mapState,
  { registerUser, resetRegister },
)(Register);
