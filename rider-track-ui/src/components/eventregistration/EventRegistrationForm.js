/**
 * Author: Shilpa Bhat
 * Task: Form to register for event
 * Task no: 61
 * Date: 10/03/2019
 *
 *  Update to reset form and redirect to homepage
 *  Author: Janani Thiagarajan
 *  Date: 10/31/2019
 *  US : - , Task : 142
 */

import React, { Component } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  IconButton,
  FormHelperText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HOME_ROUTE } from '../../RouteConstants';

class EventRegistrationForm extends Component {
  eventid;

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: this.getName(),
      nick_name: '',
      email_id: this.getEmail(),
      device_id: '',
      country: '',
      timezone: '',
      provider: '',
    };
  }

  componentDidMount() {
    const { handle } = this.props.match.params;
    this.eventid = handle;
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.authentication.isAuthenticated) {
      this.setName(newProps.authentication.user.username);
      this.setEmail(newProps.authentication.user.email);
    }
  }

  // Call the register api and pass the pararmeters to register the participant for the event
  registerHandler = async (content) => {
    const res = await fetch(`http://localhost:4241/api/events/${this.props.match.params.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });

    const response = await res.json();
    this.handleOpen();
    if (response.status === 200) {
      this.handleOpen();
    }
  }

  //Prepare body for registering participant
  onSubmit = (event) => {
    event.preventDefault();
    const {
      name, nick_name, email_id, device_id, country, timezone, provider,
    } = this.state;

    const body = {
      userId: this.getUserId(),
      name: name,
      nick_name: nick_name,
      email_id: email_id,
      device_id: device_id,
      country: country,
      timezone: timezone,
      provider: "Mapprogress"
    };
    this.registerHandler(body);
  };

  resetForm = () => {
    this.setState({
      nick_name: '',
      device_id: '',
      country: '',
      timezone: '',
      provider: '',
    });
  };

  setName = (name) => {
    this.setState({ name });
  }

  getName = () => {
    return this.props.authentication.isAuthenticated ? this.props.authentication.user.username : '';
  };

  getUserId = () => {
    return this.props.authentication.isAuthenticated ? this.props.authentication.user.id : '';
  };

  setNickName = (nick_name) => {
    this.setState({ nick_name });
  }

  setEmail = (email_id) => {
    this.setState({ email_id });
  }

  getEmail = () => {
    return this.props.authentication.isAuthenticated ? this.props.authentication.user.email : '';
  };

  setDeviceId = (device_id) => {
    this.setState({ device_id });
  }

  setCountry = (country) => {
    this.setState({ country });
  }

  setTimezone = (timezone) => {
    this.setState({ timezone });
  }

  setProvider = (provider) => {
    this.setState({ provider });
  }

  handleOpen = () => {
    this.setState({ open: true });
    setTimeout(() => { window.location.href = HOME_ROUTE; }, 250);
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const {
      name,
      open,
    } = this.state;
    return (
      <Grid
        style={{
          border: 'solid',
          borderWidth: '3px',
          margin: '20px',
          height: '1000px',
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            style={{ padding: '20px' }}
            gutterBottom
          >
            Event Registration
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="flex-start" justify="center">
            <form onSubmit={(e) => { this.onSubmit(e); }} noValidate autoComplete="off">
              <Grid item xs={12}>
                <TextField
                  id="fullname"
                  label="Participant full name"
                  value={this.state.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => { this.setName(event.target.value); }}
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="nickname"
                  label="Participant Nick name"
                  value={this.state.nick_name}
                  // className={classes.textField}
                  // value={eventName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => { this.setNickName(event.target.value); }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="emailId"
                  label="Email id"
                  // className={classes.textField}
                  value={this.state.email_id}
                  onChange={(event) => { this.setEmail(event.target.value); }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="deviceId"
                  label="Device id"
                  // className={classes.textField}
                  // value={eventPlace}
                  value={this.state.device_id}
                  onChange={(event) => { this.setDeviceId(event.target.value); }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="country"
                  label="Country"
                  // className={classes.textField}
                  // value={eventPlace}
                  value={this.state.country}
                  onChange={(event) => { this.setCountry(event.target.value); }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="max-participant"
                  label="Time zone"
                  // className={classes.textField}
                  // value={eventMaxParticipant}
                  value={this.state.timezone}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => { this.setTimezone(event.target.value); }}

                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} style={{ marginTop: 50 }}>
                <Button type="button" variant="contained" onClick={() => { this.resetForm(); }}>
                  Reset
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">User is Registered Sucessfully</span>}
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
    );
  }
}

EventRegistrationForm.PropTypes = {
  authentication: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
});

export default connect(mapState)(EventRegistrationForm);
