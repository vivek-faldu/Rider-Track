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

  FormHelperText
} from "@material-ui/core";
import EventRegistration from "./EventRegistration";
export default class EventRegistrationForm extends Component {
  registerHandler = () => {
    const {
      name
    } = this.state;
    debugger;
    fetch('http://localhost:4241/api/events/5d81d95a0b52a97535d59b58', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: "5d9c0e1320132148b87762fd",
        name: name
      }),
    }).then(res => {
      debugger;
      console.log(res);
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  setName = (name) => {
    this.setState({ name });
  }
  render() {
    const {
      name
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
            <form noValidate autoComplete="off">
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
              <Grid item xs={12}>
                <InputLabel htmlFor="trackerWebsite" style={{ float: "left" }}>
                  Select tracker website
                </InputLabel>
                <br></br>
                <Select
                  style={{ width: 200, float: "left" }}
                  inputProps={{
                    name: "trackerWebsite",
                    id: "trackerWebsite"
                  }}
                >
                  <MenuItem value={0}>Map Progress</MenuItem>
                  <MenuItem value={1}>Trackleader</MenuItem>
                  <MenuItem value={2}>TrackMeSpot</MenuItem>
                </Select>
                <br></br>
                <br></br>

                <FormHelperText style={{ float: "left" }}>
                  Select Tracker Website
                </FormHelperText>
              </Grid>
              <br></br>
              <Grid item xs={12} style={{ marginTop: 50 }}>
                <Button type="button" variant="contained">
                  Reset
                </Button>
                <Button onClick={this.registerHandler} variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid >
    );
  }
}
