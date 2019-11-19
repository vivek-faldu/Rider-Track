/**
 * Author: Vivek Faldu
 * Task: Create event map
 * Task no: 43
 * Date: 09/25/2019
 */


import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Typography,
  TextField,
  Grid,
  Button,
  Snackbar,
  IconButton,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateEventMap from './CreateEventMap';
import Autocomplete from '@material-ui/lab/Autocomplete';

class EventCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedDate: new Date(),
      eventName: null,
      eventPlace: null,
      eventMaxParticipant: null,
      eventDuration: null,
      eventDescription: null,
      validateMessage: null,
      eventNameError: false,
      eventDescriptionError: false,
      eventPlaceError: false,
      eventMaxParticipantError: false,
      eventDurationError: false,
      viewport: {
        latitude: 33.4224,
        longitude: -111.9495,
        zoom: 15,
        bearing: 0,
        pitch: 0,
      },
      marker: [{
        latitude: 33.4224,
        longitude: -111.9495,
      },
      {
        latitude: 33.4223,
        longitude: -111.9496,
      }],
    };
  }

  topLocations = [{ title: 'The Shawshank Redemption', year: 1994 },
    // { title: 'The Godfather', year: 1972 },
    // { title: 'The Godfather: Part II', year: 1974 },
    // { title: 'The Dark Knight', year: 2008 },
    // { title: '12 Angry Men', year: 1957 },
    // { title: "Schindler's List", year: 1993 },
    // { title: 'Pulp Fiction', year: 1994 }
  ];

  setSelectedDate = (selectedDate) => {
    this.setState({ selectedDate });
  }

  setEventName = (eventName) => {
    this.setState({ eventName });
  }

  setEventPlace = (eventPlace) => {
    if (eventPlace.length > 3) {

    }
    this.setState({ eventPlace });
  }

  setEventMaxParticipant = (eventMaxParticipant) => {
    this.setState({ eventMaxParticipant });
  }

  setEventDuration = (eventDuration) => {
    this.setState({ eventDuration });
  }

  setEventDescription = (eventDescription) => {
    this.setState({ eventDescription });
  }


  setViewPort = (viewport) => {
    this.setState({ viewport });
  }

  setEventMarker = (marker) => {
    this.setState({ marker });
  };

  send = async (content) => {
    const res = await fetch('http://localhost:4241/api/events/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });

    const response = await res.json();
    if (response.status === 200) {
      this.handleOpen();
      setTimeout(() => {
        this.props.history.push('/');
      }, 3000);
    }
  }

  reset = () => {
    const selectedDate = new Date();
    const eventName = '';
    const eventPlace = '';
    const eventMaxParticipant = '';
    const eventDuration = '';
    const eventDescription = '';
    const viewport = {
      latitude: 33.4224,
      longitude: -111.9495,
      zoom: 15,
      bearing: 0,
      pitch: 0,
    };
    const marker = [{
      latitude: 33.4224,
      longitude: -111.9495,
    },
    {
      latitude: 33.4223,
      longitude: -111.9496,
    }];

    this.setState({
      selectedDate, eventName, eventPlace, eventMaxParticipant, eventDescription, eventDuration, viewport, marker,
    });
  }

  getUserId = () => (this.props.authentication.isAuthenticated ? this.props.authentication.user.id : '');


  onSubmit = (event) => {
    event.preventDefault();
    const {
      eventName, eventDescription, selectedDate, eventDuration, eventPlace, eventMaxParticipant, marker,
    } = this.state;

    if (!this.validate(eventName, eventDescription, eventDuration, eventPlace, eventMaxParticipant)) {
      return;
    }

    const body = {
      creator_id: this.getUserId(),
      event_name: eventName,
      event_description: eventDescription,
      date_time: selectedDate,
      duration: eventDuration,
      max_participant: eventMaxParticipant,
      checkpoints: marker,
      place: eventPlace,

    };

    this.send(body);
  };

  validate = (eventName, eventDescription, eventDuration, eventPlace, eventMaxParticipant) => {
    if (eventName == null || eventName.length <= 0) {
      this.setState({
        eventNameError: true,
        eventMaxParticipantError: false,
        eventPlaceError: false,
        eventDurationError: false,
        eventDescriptionError: false,
        validateMessage: 'Please enter event name',
      });
      return false;
    }

    if (eventDescription == null || eventDescription.length <= 0) {
      this.setState({
        eventDescriptionError: true,
        eventMaxParticipantError: false,
        eventPlaceError: false,
        eventDurationError: false,
        eventNameError: false,
        validateMessage: 'Please enter event description',
      });
      return false;
    }

    if (eventPlace == null || eventPlace.length <= 0) {
      this.setState({
        eventPlaceError: true,
        eventMaxParticipantError: false,
        eventDurationError: false,
        eventDescriptionError: false,
        eventNameError: false,
        validateMessage: 'Please enter event place',
      });
      return false;
    }

    if (eventMaxParticipant == null || eventMaxParticipant.length <= 0) {
      this.setState({
        eventMaxParticipantError: true,
        eventPlaceError: false,
        eventDurationError: false,
        eventDescriptionError: false,
        eventNameError: false,
        validateMessage: 'Please enter max participant',
      });
      return false;
    }

    if (eventDuration == null || eventDuration.length <= 0) {
      this.setState({
        eventDurationError: true,
        eventMaxParticipantError: false,
        eventPlaceError: false,
        eventDescriptionError: false,
        eventNameError: false,
        validateMessage: 'Please enter event duration',
      });
      return false;
    }

    this.setState({
      eventMaxParticipantError: false,
      eventPlaceError: false,
      eventDurationError: false,
      eventDescriptionError: false,
      eventNameError: false,
      validateMessage: '',

    });
    return true;
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  render() {
    const {
      eventName, eventDescription, selectedDate, eventDuration, eventPlace,
      eventMaxParticipant, marker, viewport, open, validateMessage, eventDescriptionError,
      eventNameError, eventMaxParticipantError, eventDurationError, eventPlaceError,
    } = this.state;

    return (
      <Grid style={{
        border: 'solid', borderWidth: '3px', height: '1100px', margin: 20,
      }}
      >

        <Grid item xs={12}>
          <Typography variant="h5" align="center" style={{ padding: '20px' }} gutterBottom>
            Rider Track | Event | Create
          </Typography>
        </Grid>

        <Grid container alignItems="flex-start" justify="center">
          <form onSubmit={(e) => { this.onSubmit(e); }} noValidate autoComplete="off">
            <Grid item xs={12}>
              <TextField
                error={eventNameError}
                helperText={eventNameError ? validateMessage : null}
                id="eventname"
                label="Event Name"
                style={{ width: '40%' }}
                value={eventName}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  this.setEventName(event.target.value);
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={eventDescriptionError}
                helperText={eventDescriptionError ? validateMessage : null}
                id="eventdescription"
                label="Event Description"
                style={{ width: '40%' }}
                value={eventDescription}
                multiline
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => { this.setEventDescription(event.target.value); }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="place"
                error={eventPlaceError}
                helperText={eventPlaceError ? validateMessage : null}
                label="Place"
                style={{ width: '40%' }}
                value={eventPlace}
                onChange={(event) => { this.setEventPlace(event.target.value); }}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={(date) => { this.setSelectedDate(date); }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Event Time"
                  value={selectedDate}
                  onChange={(date) => { this.setSelectedDate(date); }}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="max-participant"
                label="Max Participants"
                error={eventMaxParticipantError}
                helperText={eventMaxParticipantError ? validateMessage : null}
                style={{ width: '40%' }}
                value={eventMaxParticipant}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  this.setEventMaxParticipant(event.target.value);
                }}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="duration"
                label="Duration"
                error={eventDurationError}
                helperText={eventDurationError ? validateMessage : null}
                style={{ width: '40%' }}
                value={eventDuration}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  this.setEventDuration(event.target.value);
                }}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} style={{ width: '1150px' }}>
              Add Check Points
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={this.topLocations.map(option => option.title)}
                onInputChange={(event, val) => {
                  this.setEventPlace(val);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Search input"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
              <CreateEventMap setEventMarker={this.setEventMarker} marker={marker} viewport={viewport} setViewPort={this.setViewPort} />
            </Grid>

            <Grid item xs={12} style={{ marginTop: 50 }}>

              <Button
                type="button"
                variant="contained"
                onClick={() => { this.reset(); }}

              >
                Reset

              </Button>


              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </form>
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
          message={<span id="message-id">Event Created Sucessfully</span>}
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

EventCreationForm.PropTypes = {
  authentication: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
});

export default connect(mapState)(EventCreationForm);
