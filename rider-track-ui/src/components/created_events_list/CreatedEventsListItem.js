/* eslint-disable react/prefer-stateless-function */
/*
    Component to render the created events list item
    Author: Janani Thiagarajan
    Date: 10/21/2019
    US: 101, Task : 104
 */

import React, { Component } from 'react';
import {
    Box, Typography, Link, Button,
} from '@material-ui/core';
import { EVENT_DETAIL_PATH } from '../../RouteConstants';

export default class CreatedEventsListItem extends Component {
    start = async (eventId) => {
        const url = `http://localhost:4241/api/events/start/${eventId}`;

        const res = await fetch(url, {
            method: 'PUT', // Update to PUT
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(content),
        });

        const response = await res.json();
        if (response.status === 200) {
            this.handleOpen();
        }
    }

    stop = async (eventId) => {
        const url = `http://localhost:4241/api/events/stop/${eventId}`;

        const res = await fetch(url, {
            method: 'PUT', // Update to PUT
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(content),
        });
        const response = await res.json();
        if (response.status === 200) {
            this.handleOpen();
        }
    }

    render() {
        let isLive = null;

        if (this.props.eventStatus === 'Upcoming') {
            isLive = (
                <div>
                    <Button type="button" variant="contained" onClick={() => { this.start(this.props.eventId); }}>Start</Button>

                    <Button type="button" variant="contained" onClick={() => { this.stop(this.props.eventId); }}>Stop</Button>
                </div>
            );
        }
        return (
            <Box className="row">
                <div className="col-md-2 rt-events-list-item-text">
                    <p>
                        {this.props.eventDate}
                    </p>
                </div>
                <div className="col-md-3 rt-events-list-item-text">
                    <Typography>
                        <Link href={EVENT_DETAIL_PATH.replace(':id', this.props.eventId)}>
                            {this.props.eventName}
                        </Link>
                    </Typography>
                </div>
                <div className="col-md-3 rt-events-list-item-text">
                    <p>
                        {this.props.eventDescription}
                    </p>
                </div>
                <div className="col-md-2 rt-events-list-item-text">
                    <p>
                        {this.props.eventStatus}
                    </p>
                </div>
                {isLive}
            </Box>
        );
    }
}
