/**
 * Component that renders the login form on the frontend
 * Author: Sai Saran Kandimalla
 * Task No: 58
 * Referred from: https://material-ui.com/components/dialogs/
 *                https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, cancelLoginAttempt } from '../../actions/authenticationAction';
import Register from './Register';


class Login extends Component {
  constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            loginOpen: !!this.props.openDialog,
            firstTime: true,
        };
    }

    UNSAFE_componentWillReceiveProps = (newProps) => {
      if (newProps.authentication.isAuthenticated) {
        this.setState({
          loginOpen: false,
        });
      }
      if (newProps.errors) {
        this.setState({
          errors: newProps.errors,
        });
      }
    };

    handleLoginOpen = () => {
        this.setState({
          firstTime: true,
          loginOpen: true,
        });
    };

    handleLoginClose = () => {
        this.setState({ loginOpen: false, firstTime: true });
        this.props.cancelLoginAttempt(true);
    };

    onLoginSubmit = (event) => {
        event.preventDefault();
        this.setState({
          firstTime: false,
        });
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(user);
    }

    onTextChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    render() {
        const { errors } = this.state;
        return (
          <span>
            {this.props.openDialog !== true
              ? (<Button className="menu_button" color="inherit" onClick={this.handleLoginOpen}>Login</Button>) : null}
            <Dialog
              open={this.state.loginOpen}
              onClose={this.handleLoginClose}
              aria-labelledby="rt-form-dialog-title"
              className="rt-login-form"
            >
              <DialogTitle>Login</DialogTitle>
              <DialogContent>
                <DialogContentText>
                    Please enter your email ID and password
                </DialogContentText>

                {!this.state.firstTime && errors.email ? (
                  <p className="rt-auth-error-text">{errors.email}</p>
                ):null}
                {!this.state.firstTime && errors.emailNotFound ? (
                  <p className="rt-auth-error-text">{errors.emailNotFound}</p>
                ):null}
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

                {!this.state.firstTime && errors.password ? (
                  <p className="rt-auth-error-text">{errors.password}</p>
                ):null}
                {!this.state.firstTime && errors.paswordInCorrect ? (
                  <p className="rt-auth-error-text">{errors.paswordInCorrect}</p>
                ):null}
                <div className="row">
                  <div className="col-md-12">
                    <TextField
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
                    <span>
                      Not registered yet?&nbsp;
                      <a href="#" className="rt-signup-link"><Register /></a>
                    </span>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="primary" onClick={this.onLoginSubmit}>
                  Login
                </Button>
                <Button variant="contained" color="secondary" onClick={this.handleLoginClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </span>
        );
    }
}

Login.PropTypes = {
  cancelLoginAttempt: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  authentication: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
  errors: state.errors,
});

export default connect(
  mapState,
  { loginUser, cancelLoginAttempt },
)(withRouter(Login));
