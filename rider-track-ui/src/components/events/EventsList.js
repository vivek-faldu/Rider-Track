import React, { useEffect } from 'react';
import {
 Card, Divider, FormControl, NativeSelect, FormHelperText,
} from '@material-ui/core';
import './events.css';
import { LIVE_EVENTS, UPCOMING_EVENTS, COMPLETED_EVENTS } from './EventsConstants';
import EventListItem from './EventListItem';

/*
    Added call to the backend api for list of events and filter to display them.
    Author: Sai Saran Kandimalla
    Author: Shaunak Shah
    Date: 10/10/2019
    US: 8 Task: 82
    The state management has been referred from : https://material-ui.com/components/selects/
*/
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

    async function fetchData() {
        const url = 'http://localhost:4241/api/events/';
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

    const handleEventTypeChange = (name) => (event) => {
        // fetchData();
        console.log(events.live);
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <Card className="rt-events-card">
        <div className="row">
          <div className="col-md-4">
            <h1 className="rt-events-header">{state.header}</h1>
          </div>
          <div className="col-md-8">
            <div className="rt-event-type-dropdown">
              <FormControl>
                <NativeSelect
                  inputProps={{
                                    name: 'event-type-selector',
                                }}
                  onChange={handleEventTypeChange('event-type-selector')}
                >
                  <option value={LIVE_EVENTS}>Live</option>
                  <option value={UPCOMING_EVENTS}>Upcoming</option>
                  <option value={COMPLETED_EVENTS}>Completed</option>
                </NativeSelect>
                <FormHelperText>select events type</FormHelperText>
              </FormControl>
            </div>
          </div>
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
