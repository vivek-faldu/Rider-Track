/*
    Added call to the backend api for list of events and filter to display them.
    Author: Sai Saran Kandimalla
    Author: Shaunak Shah
    Date: 10/10/2019
    US: 8 Task: 82
    The state management has been referred from : https://material-ui.com/components/selects/

    Update to have icons for event type selection (removed dropdown)
    Author: Janani Thiagarajan
    Date: 11/20/2019
    US : None , Task : 186
*/

import React, { useEffect } from 'react';
import {
  Card, CardMedia, Divider, Button, Grid, Avatar,
} from '@material-ui/core';
import './events.css';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { LIVE_EVENTS, UPCOMING_EVENTS, COMPLETED_EVENTS } from './EventsConstants';
import EventListItem from './EventListItem';
import Live from '../../assets/Live.png';
import Upcoming from '../../assets/Upcoming-events.jpg';
import Completed from '../../assets/Completed.jpg';

const useStyles = makeStyles({
  card: {
    margin: 20,
    width: 75,
    height: 75,
  },
  media: {
    height: 75,
  },
  avatar: {
    width: 74,
    height: 75,
  },
  avatar1: {
    width: 84,
    height: 75,
  },
  avatar2: {
    width: 74,
    height: 75,
  },
});


const EventsList = () => {
  const [events, setEvents] = React.useState({
    live: [],
    upcoming: [],
    completed: [],
  });

  const [state, setState] = React.useState({
    header: LIVE_EVENTS,
    events: [],
  });

  //const [selectedDropDown, setSelectedDropDown] = React.useState(LIVE_EVENTS);
  const currentDate = new Date();
  const startdate = currentDate.setMonth(currentDate.getMonth() - 12);
  const [from, setFrom] = React.useState(startdate);
  const [to, setTo] = React.useState(Date());

  const classes = useStyles();

  async function fetchData() {
    const url = `http://localhost:4241/api/events?startDate=${from}&endDate=${to}`;
    const res = await fetch(url);
    res.json()
      .then((result) => {
        const liveEvents = [];
        const upcomingEvents = [];
        const completedEvents = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].status === 'Live') {
            liveEvents.push(result[i]);
          } else if (result[i].status === 'Upcoming') {
            upcomingEvents.push(result[i]);
          } else {
            completedEvents.push(result[i]);
          }
        }
        //setSelectedDropDown(LIVE_EVENTS);
        setEvents({
          live: liveEvents,
          upcoming: upcomingEvents,
          completed: completedEvents,
        });
        setState({
          header: 'Live Events',
          events: liveEvents,
        });
      });
  }

  async function setEventList(name) {
    let eventsTemp = events.live;
    if (name === UPCOMING_EVENTS) {
      eventsTemp = events.upcoming;
    } else if (name === COMPLETED_EVENTS) {
      eventsTemp = events.completed;
    }
    setState({
      header: name,
      events: eventsTemp,
    });
  }

  /* const handleEventTypeChange = (name) => (event) => {
    console.log(event.target.value);
    setSelectedDropDown(event.target.value);
    let eventsTemp = events.live;
    if (event.target.value === UPCOMING_EVENTS) {
      eventsTemp = events.upcoming;
    } else if (event.target.value === COMPLETED_EVENTS) {
      eventsTemp = events.completed;
    }
    setState({
      header: event.target.value,
      events: eventsTemp,
    });
  };
 */
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Card className="rt-events-card">
      <div className="row">
        <div className="col-md-7">
          <h1 className="rt-events-header">{state.header}</h1>
        </div>
        <div className="col-md-2">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="none"
              id="date-picker-inline"
              label="From"
              value={from}
              onChange={(date) => setFrom(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col-md-2">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="none"
              id="date-picker-inline"
              label="To"
              value={to}
              onChange={(date) => setTo(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

          </MuiPickersUtilsProvider>

        </div>
        <div className="col-md-1">
          <Button color="primary" variant="outlined" onClick={() => fetchData()}>Go</Button>
        </div>
        {/* <div className="col-md-5">
            <div className="rt-event-type-dropdown">
              <FormControl>
                <NativeSelect

                  inputProps={{
                                    name: 'event-type-selector',
                                }}
                  value={selectedDropDown}
                  onChange={handleEventTypeChange('event-type-selector')}
                >
                  <option value={LIVE_EVENTS}>Live</option>
                  <option value={UPCOMING_EVENTS}>Upcoming</option>
                  <option value={COMPLETED_EVENTS}>Completed</option>
                </NativeSelect>
                <FormHelperText>select events type</FormHelperText>
              </FormControl>
            </div>
          </div> */}
        <Divider className="row" />
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Card className={classes.card}>

            <div className="rt-event-type-container">
              <CardMedia className="media">
                <Avatar style={{ borderRadius: 0 }} alt="Live" src={Live} className={classes.avatar} />
              </CardMedia>
              <div className="rt-event-type-overlay" onClick={() => setEventList(LIVE_EVENTS)}>
                <div className="rt-event-type-overlay-text" onClick={() => setEventList(LIVE_EVENTS)}>View Live Events</div>
              </div>
            </div>
          </Card>
          <Card className={classes.card}>
            <div className="rt-event-type-container">
              <CardMedia className="media">
                <Avatar style={{ borderRadius: 0 }} alt="Upcoming" src={Upcoming} className={classes.avatar1} />
              </CardMedia>
              <div className="rt-event-type-overlay" onClick={() => setEventList(UPCOMING_EVENTS)}>
                <div className="rt-event-type-overlay-text" onClick={() => setEventList(UPCOMING_EVENTS)}>View Upcoming Events</div>
              </div>
            </div>
          </Card>
          <Card className={classes.card}>
            <div className="rt-event-type-container">
              <CardMedia className="media">
                <Avatar style={{ borderRadius: 0 }} alt="Completed" src={Completed} className={classes.avatar2} />
              </CardMedia>
              <div className="rt-event-type-overlay" onClick={() => setEventList(COMPLETED_EVENTS)}>
                <div className="rt-event-type-overlay-text" onClick={() => setEventList(COMPLETED_EVENTS)}>View Completed Events</div>
              </div>
            </div>
          </Card>

        </Grid>
      </div>
      <Divider className="row" />
      <div>
        <ul>
          {state.events.length > 0 ? state.events.map((el) => (
            <div>
              <li>
                <EventListItem
                  eventType={state.header}
                  eventName={el.event_name}
                  eventid={el._id}
                  eventDescription={el.event_description}
                  eventDate={() => {
                    const vara = el.date_time;
                    return vara;
                  }}
                />
              </li>
              <Divider variant="middle" />
            </div>
          )) : `No ${state.header} exists`}
        </ul>
      </div>
    </Card>
  );
};

export default EventsList;
