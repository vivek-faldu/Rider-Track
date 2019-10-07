/*
    Component that renders the list of registered events
    Author: Janani Thiagarajan
    Date: 10/06/2019
    US: 3, Task : 63
*/

import React from 'react';
import {
    Card,
    Divider,
} from '@material-ui/core';
import './ParticipantHistory.css';
import ParticipantHistoryItem from './ParticipantHistoryItem';

const ParticipantHistory = () => {
    const pHistory = [{
        event_name: 'Terra Australis Bike Epic',
        event_description: 'A 6,300k epic solo self supported ride from Cape York at the top of Australia to Wilsons Promontory the southern tip of mainland Australia.',
        date_time: 'Sep 27, 2019',
    },
    {
        event_name: 'Tour Aotearoa 2019',
        event_description: '3,000 km, 10-30 days from Cape Reinga to Bluff, limited to 1,300 Riders',
        date_time: 'Sep 01, 2019',
    },
    {
        event_name: 'Japanese Odyssey 2019',
        event_description: "The Japanese Odyssey is an endurance cycling event. It's not a race. It's about discovery, about exploration, about challenging yourself. Be prepared.",
        date_time: 'Aug 12, 2019',
    },
    ];

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
                    {pHistory.map((el) => (
                        <div>
                            <li>
                                <ParticipantHistoryItem
                                    eventName={el.event_name}
                                    eventDescription={el.event_description}
                                    eventDate={el.date_time} />
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
