import React from 'react';
import { Card, Divider, FormControl, NativeSelect, FormHelperText } from '@material-ui/core';
import './events.css';
import { LIVE_EVENTS, UPCOMING_EVENTS, COMPLETED_EVENTS } from './EventsConstants';
import EventListItem from './EventListItem';

/*
    Component that renders the list of events in the web browser
    Author: Sai Saran Kandimalla
    Date: 09/23/2019
    US: 30
    The state management has been referred from : https://material-ui.com/components/selects/
*/
const EventsList = () => {

    // remove after AJAX call to backend is made.
    const liveEvents = [{
        "event_name": "Terra Australis Bike Epic",
        "event_description": "A 6,300k epic solo self supported ride from Cape York at the top of Australia to Wilsons Promontory the southern tip of mainland Australia.",
        "date_time": "Sep 27, 2019"
    },
    {
        "event_name": "Tour Aotearoa 2020",
        "event_description": "3,000 km, 10-30 days from Cape Reinga to Bluff, limited to 1,300 Riders",
        "date_time": "Sep 26, 2019"
    },
    {
        "event_name": "Japanese Odyssey 2019",
        "event_description": "The Japanese Odyssey is an endurance cycling event. It's not a race. It's about discovery, about exploration, about challenging yourself. Be prepared.",
        "date_time": "Sep 24, 2019"
    },
    {
        "event_name": "Hawke's Bay Anniversary Tour 2019",
        "event_description": "550 km from the south to north of Hawke's Bay.",
        "date_time": "Sep 27, 2019"
    }]

    const upcomingEvents = [{
        "event_name": "Geyserland Gravel Grind Mega Grind - 2019",
        "event_description": "800 km bikepacking event around the central North Island of New Zealand",
        "date_time": "Jan 15, 2020"
    },
    {
        "event_name": "10k For NAMI",
        "event_description": "Guinness Record attempt for the fastest crossing of the United States North to South",
        "date_time": "Dec 26, 2019"
    },
    {
        "event_name": "Kiwi Brevet 2019",
        "event_description": "MTB bikepacking loop in New Zealand's upper South Island. Two courses, either the shorter Brevette or longer Brevet",
        "date_time": "Nov 24, 2019"
    }]

    const completedEvents = [{
        "event_name": "PEdALED Silk Road Mountain Race 2019",
        "event_description": "The Silk Road Mountain Race is a fixed route, unsupported, single-stage cycling race through the mountains of Kyrgyzstan.",
        "date_time": "Aug 15, 2019"
    },
    {
        "event_name": "North Star Bicycle Race 2019",
        "event_description": "Solo - Unsupported - Paved - One Stage 630 mile out and back race on USBR #41 aka North Star Bicycle Route.",
        "date_time": "Feb 24, 2019"
    }]


    const [state, setState] = React.useState({
        header: LIVE_EVENTS,
        events: liveEvents
    });

    const handleEventTypeChange = (name) => (event) => {
        let eventsTemp = liveEvents;
        if (event.target.value === UPCOMING_EVENTS) {
            eventsTemp = upcomingEvents;
        } else if (event.target.value === COMPLETED_EVENTS) {
            eventsTemp = completedEvents;
        }
        setState({
            header: event.target.value,
            events: eventsTemp
        });
    }

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
                                    name: "event-type-selector"
                                }}
                                onChange={handleEventTypeChange("event-type-selector")}
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
                    {state.events.map((el) =>
                        <div>
                            <li>
                                <EventListItem
                                    eventType={state.header}
                                    eventName={el.event_name}
                                    eventDescription={el.event_description}
                                    eventDate={el.date_time} />
                            </li>
                            <Divider variant="middle" />
                        </div>)}
                </ul>
            </div>
        </Card>
    );
}

export default EventsList;
