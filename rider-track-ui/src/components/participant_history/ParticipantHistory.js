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
import './ParticipantHistory.css';
import ParticipantHistoryItem from './ParticipantHistoryItem';

const ParticipantHistory = () => {
  const [hasError, setErrors] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:4241/api/user/events?userid=5d96e4e1e78f0b615d85cf34');
      res.json()
        .then((res) => {
          setEvents(res.participated_events);
        })
        .catch((err) => setErrors(err));
    }

    fetchData();
  }, []);

  return (
    <Card className="rt-history-card">
      <div className="row">
        <div className="col-md-4">
          <h1 className="rt-history-header">Registered Events</h1>
        </div>
      </div>
      <Divider className="row" />
      <div>
        <ul>
          {events.map((el) => (
            <div>
              <li>
                <ParticipantHistoryItem
                  eventName={el.event_name}
                  eventDescription={el.event_description}
                  eventDate={el.date_time}
                  eventId={el._id}
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

export default ParticipantHistory;
