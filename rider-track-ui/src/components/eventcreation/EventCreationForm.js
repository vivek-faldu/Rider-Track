import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import CreateEventMap from './CreateEventMap';


export default function EventCreationForm() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [eventName, setEventName] = React.useState('');
  const [eventPlace, setEventPlace] = React.useState('');
  const [eventMaxParticipant, setEventMaxParticipant] = React.useState();
  const [eventDuration, setEventDuration] = React.useState();

  return (

    <Grid style={{
      border: 'solid', borderWidth: '3px', margin: '20px', height: '1000px',
    }}
    >

      <Grid item xs={12}>
        <Typography variant="h5" align="center" style={{ padding: '20px' }} gutterBottom>
         Rider Track | Event | Create
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container alignItems="flex-start" justify="center">
          <form noValidate autoComplete="off">
            <Grid item xs={12}>
              <TextField
                id="eventname"
                label="Event Name"
                className={classes.textField}
                value={eventName}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => { setEventName(event.value); }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="place"
                label="Place"
                className={classes.textField}
                value={eventPlace}
                onChange={(event) => { setEventPlace(event.value); }}
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
                  onChange={(date) => { setSelectedDate(date); }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Event Time"
                  value={selectedDate}
                  onChange={(date) => { setSelectedDate(date); }}
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
                className={classes.textField}
                value={eventMaxParticipant}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setEventMaxParticipant(event.value);
                }}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="duration"
                label="Duration"
                className={classes.textField}
                value={eventDuration}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setEventDuration(event.value);
                }}
                margin="normal"
              />
            </Grid>


            <Grid item xs={12} style={{ width: '1200px' }}>
              Add Check Points
              <CreateEventMap />
            </Grid>

            <Grid item xs={12} style={{ marginTop: 50 }}>
              <Button
                type="button"
                variant="contained"
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
      </Grid>
    </Grid>
  );
}


const useStyles = makeStyles((theme) => ({
  container: {
    margin: '100px',
    backgroundColor: '',
    height: '600px',

  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 450,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
