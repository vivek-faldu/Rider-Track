/**
 *  User profile page to show user details
 *  Author: Janani Thiagarajan
 *  Date: 11/06/2019
 *  US : 124 , Task : 151
 */

import React, { Component } from 'react';
import {
    Typography,
    TextField,
    Grid,
    Button,
    IconButton,
    Snackbar,
    Link,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    PARTICIPANT_HISTORY, CREATED_EVENTS,
} from '../../RouteConstants';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.getName(),
            emailId: this.getEmail(),
            isAdmin: this.getIsAdmin(),
            disabled: true,
            editFlag: true,
            submitFlag: false,
            open: false,
            messageSet: null,
        };
    }

    UNSAFE_componentWillReceiveProps = (Props) => {
        if (Props.authentication.isAuthenticated) {
            this.setName(Props.authentication.user.username);
            this.setEmail(Props.authentication.user.email);
            this.setIsAdmin(Props.authentication.user.is_admin);
        }
    }

    registerHandler = async (content) => {
        const url = `/api/user/profile/${this.props.authentication.user.id}`;

        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        const response = await res.json();

        if (response.status === 200) {
            this.handleOpen();
        }
    }


    onSubmit = (event) => {
        event.preventDefault();
        const {
            name, emailId,
        } = this.state;
        const body = {
            username: name,
            email: emailId,
        };
        this.registerHandler(body);
    };


    editForm = () => {
        this.setState({
            disabled: false,
            editFlag: false,
            submitFlag: true,
        });
    };

    cancelForm = () => {
        this.setState({
            name: this.getName(),
            emailId: this.getEmail(),
            isAdmin: this.getIsAdmin(),
            disabled: true,
            editFlag: true,
        });
    };

    setName = (name) => {
        this.setState({ name });
    }

    getName = () => this.props.authentication.isAuthenticated ? this.props.authentication.user.username : '';

    setEmail = (emailId) => {
        this.setState({ emailId });
    }

    getEmail = () => this.props.authentication.isAuthenticated ? this.props.authentication.user.email : '';

    setIsAdmin = (isAdmin) => {
        this.setState({ isAdmin });
    }

    getIsAdmin = () => this.props.authentication.isAuthenticated ? this.props.authentication.user.is_admin : ''

    handleOpen = () => {
        this.setState({
            open: true,
            submitFlag: false,
            editFlag: true,
            disabled: true,
            messageSet: 'Profile updated successfully',
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        return (
            <Grid
                style={{
                    border: 'solid',
                    borderWidth: '3px',
                    margin: '20px',
                    height: '1000px',
                }}>
                <Grid item xs={12}>
                    <Typography
                        variant="h5"
                        align="center"
                        style={{ padding: '20px' }}
                        gutterBottom>
                        User Profile
                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems="flex-start" justify="center">
                        <form onSubmit={(ev) => { this.onSubmit(ev); }} noValidate autoComplete="off">
                            <Grid item xs={12}>
                                <TextField
                                    id="fullname"
                                    label="Full name"
                                    value={this.state.name}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => { this.setName(event.target.value); }}
                                    margin="normal"
                                    disabled={this.state.disabled}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="emailId"
                                    label="Email id"
                                    value={this.state.emailId}
                                    onChange={(event) => { this.setEmail(event.target.value); }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    disabled={this.state.disabled}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="isAdmin"
                                    label="Is Admin?"
                                    value={this.state.isAdmin}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => { this.setIsAdmin(event.target.value); }}
                                    margin="normal"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: 50 }}>
                                {this.state.editFlag ? (
                                    <Button type="button" variant="contained" onClick={() => { this.editForm(); }}>
                                        Edit
                              </Button>
                                ) : null}
                                {this.state.submitFlag ? (
                                    <Button variant="contained" color="primary" type="submit">
                                        Submit
                              </Button>
                                ) : null}
                                <Button type="button" variant="contained" onClick={() => { this.cancelForm(); }}>
                                    Cancel
                            </Button>
                            </Grid>
                            <Grid>
                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    open={this.state.open}
                                    autoHideDuration={3000}
                                    onClose={this.handleClose}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">{this.state.messageSet}</span>}
                                    action={[
                                        <IconButton
                                            key="close"
                                            aria-label="close"
                                            color="inherit"
                                            style={{ padding: 0.5 }}
                                        />,
                                    ]}
                                />
                            </Grid>
                            <Grid>
                                {this.props.authentication.user.is_admin === true ? (
                                    <Link href={CREATED_EVENTS}>
                                        <Button color="inherit">Click here to View Events you have Organized</Button>
                                    </Link>)
                                    : (<Link href={PARTICIPANT_HISTORY}>
                                        <Button className="menu_button" color="inherit">Click here to View Events you have Registered</Button>
                                    </Link>
                                    )}
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

UserProfile.PropTypes = {
    authentication: PropTypes.func.isRequired,
};

const mapState = (state) => ({
    authentication: state.authentication,
});

export default connect(mapState)(UserProfile);
