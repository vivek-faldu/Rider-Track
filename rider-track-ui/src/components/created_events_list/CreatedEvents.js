/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/*
    Component that renders the list of registered events
    Author: Janani Thiagarajan
    Date: 10/06/2019
    US: 3, Task : 63
*/

import React, { useState, useEffect } from 'react';
import {
    Card,
    Divider,
} from '@material-ui/core';
import './CreatedEvents.css';
import CreatedEventsListItem from './CreatedEventsListItem';

const CreatedEvents = () => {
    const [hasError, setErrors] = useState(false);
    const [createdevents, setCreatedEvents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:4241/api/user/events?userid=5d96e4e1e78f0b615d85cf34');
            res.json()
                .then((res) => {
                    setCreatedEvents(res.created_events);
                })
                .catch((err) => setErrors(err));
        }

        fetchData();
    }, []);

    return (
        <Card className="rt-events-card">
            <div className="row">
                <div className="col-md-4">
                    <h1 className="rt-events-header">Created Events</h1>
                </div>
            </div>
            <Divider className="row" />
            <div>
                <ul>
                    {createdevents.map((el) => (
                        <div>
                            <li>
                                <CreatedEventsListItem
                                    eventName={el.event_name}
                                    eventDescription={el.event_description}
                                    eventDate={el.date_time}
                                    eventId={el._id}
                                    eventStatus={el.status}
                                />
                            </li>
                            <Divider variant="middle" />
                        </div>
                    ))}
                </ul>
            </div>
        </Card>
    );
};

export default CreatedEvents;
