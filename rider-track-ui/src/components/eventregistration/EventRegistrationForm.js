/**
 * Author: Shilpa Bhat
 * Task: Form to register for event
 * Task no: 61
 * Date: 10/03/2019
 */

import React, { Component } from 'react';

import { makeStyles } from "@material-ui/core/styles";
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
  FormHelperText
} from "@material-ui/core";
import EventRegistration from "./EventRegistration";
export default class EventRegistrationForm extends Component {
  eventid;
  componentDidMount() {
    const { handle } = this.props.match.params
    this.eventid = handle;
    console.log(this.eventid);
  }
  registerHandler = async (content) => {
    console.log(this.props.match.params);

    const res = await fetch('http://localhost:4241/api/events/' + this.props.match.params.id, {
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

  onSubmit = (event) => {
    event.preventDefault();
    const {
      name, nick_name, email_id, device_id, country, timezone, provider
    } = this.state;

    const body = {
      userId: "5d96e4e1e78f0b615d85cf34",
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

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      nick_name: '',
      email_id: '',
      device_id: '',
      country: '',
      timezone: '',
      provider: ''
    };
  }
  setName = (name) => {
    this.setState({ name });
  }
  setNickName = (nick_name) => {
    this.setState({ nick_name });
  }
  setEmail = (email_id) => {
    this.setState({ email_id });
  }
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
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  render() {
    const {
      name,
      open
    } = this.state;
    return (
      <Grid
        style={{
          border: "solid",
          borderWidth: "3px",
          margin: "20px",
          height: "1000px"
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            style={{ padding: "20px" }}
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
                  value={name}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => { this.setName(event.target.value); }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="nickname"
                  label="Participant Nick name"
                  // className={classes.textField}
                  // value={eventName}
                  InputLabelProps={{
                    shrink: true
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
                  // value={eventPlace}
                  onChange={(event) => { this.setEmail(event.target.value); }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="deviceId"
                  label="Device id"
                  // className={classes.textField}
                  // value={eventPlace}
                  onChange={(event) => { this.setDeviceId(event.target.value); }}
                  InputLabelProps={{
                    shrink: true
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
                  onChange={(event) => { this.setCountry(event.target.value); }}
                  InputLabelProps={{
                    shrink: true
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
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => { this.setTimezone(event.target.value); }}

                  margin="normal"
                />
              </Grid>
              {/* <Grid item xs={12}> */}
              {/* <br></br> */}
              {/* <Select
                  value={values.age}
                  onChange={handleChange}
                  style={{ width: 200, float: "left" }}
                // inputProps={{
                //   name: "trackerWebsite",
                //   id: "trackerWebsite"
                // }}
                >
                  <MenuItem value={0}>Map Progress</MenuItem>
                  <MenuItem value={1}>Trackleader</MenuItem>
                  <MenuItem value={2}>TrackMeSpot</MenuItem>
                </Select> */}
              {/* <br></br>
                <br></br> */}

              {/* <FormHelperText style={{ float: "left" }}>
                  Select Tracker Website
                </FormHelperText> */}
              {/* </Grid> */}
              {/* <br></br> */}
              <Grid item xs={12} style={{ marginTop: 50 }}>
                <Button type="button" variant="contained">
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
      </Grid >
    );
  }
}
