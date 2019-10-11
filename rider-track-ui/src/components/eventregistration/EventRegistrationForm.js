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
  registerHandler = async (content) => {
    const res = await fetch('http://localhost:4241/api/events/5da0111bf05a835eba01381d', {
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
      name
    } = this.state;

    const body = {
      userId: "5d9c0e1320132148b87762fd",
      name: name
    };

    this.registerHandler(body);
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: ''
    };
  }
  setName = (name) => {
    this.setState({ name });
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
            Arizona Runs Event Registration
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="flex-start" justify="center">
            <form onSubmit={(e) => { this.onSubmit(e); }} noValidate autoComplete="off">
              <Grid item xs={12}>
                <TextField
                  id="eventname"
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
                  id="eventname"
                  label="Participant Nick name"
                  // className={classes.textField}
                  // value={eventName}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={event => {
                    // setEventName(event.value);
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="place"
                  label="email id"
                  // className={classes.textField}
                  // value={eventPlace}
                  onChange={event => {
                    // setEventPlace(event.value);
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="place"
                  label="Device id"
                  // className={classes.textField}
                  // value={eventPlace}
                  onChange={event => {
                    // setEventPlace(event.value);
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="place"
                  label="Country"
                  // className={classes.textField}
                  // value={eventPlace}
                  onChange={event => {
                    // setEventPlace(event.value);
                  }}
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
                  onChange={event => {
                    // setEventMaxParticipant(event.value);
                  }}
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
